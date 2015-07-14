/*!
 * svg.cytoscape.js
 * ================
 *
 * A library to create nice drag-and-drop, pan, zoom and connectable environments.
 * Created with <3 and JavaScript by the jillix developers.
 *
 * svg.cytoscape.js 1.0.0
 * Licensed under the MIT license.
 * */
(function (root) {

    /*!
     * hexToRgb
     * Converts a hex color code to rgb
     *
     * @name hexToRgb
     * @function
     * @param {String} hex The hex color value.
     * @return {Array|null} An array containing `r`, `g`, `b` values. If the input is invalid, `null` will be returned.
     */
    function hexToRgb (hex) {
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
        ] : null;
    }

    function colorLuminance(hex, lum) {
        // validate hex string
        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        if (hex.length < 6) {
            hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
        }
        lum = lum || 0;

        // convert to decimal and change luminosity
        var rgb = "#", c, i;
        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i*2,2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
            rgb += ("00"+c).substr(c.length);
        }

        return rgb;
    }

    function alpha(color, a) {
        if (/^\#/.test(color)) {
            var rgbVals = hexToRgb(color);
            color = "rgba(" + rgbVals.join(",") + ",0)";
        }
        return color.replace(/[^,]+(?=\))/, a.toString());
    }

    function updateConLinkColor (elm, color) {
        color =  color || $(elm.children()[0].node).css("fill");
        if (!elm.cons) {
            return;
        }
        for (var i = 0; i < elm.cons.length; ++i) {
            elm.cons[i].setLineColor(color);
        }
    }

    /**
     * SVGGraph
     * Creates a new instance of elements.
     *
     * @name SVGGraph
     * @function
     * @param {Object} opt_options An object containing the following fields:
     *
     *  - `container` (SVG Element): The container where the element will be appended.
     *
     * @return {Object} An object containing the following fields:
     *
     *  - `add` (Function): Adds the element.
     *
     */
    function SVGGraph(opt_options) {
        this.options = opt_options;
    }

    /**
     * add
     * Adds a new element: Instance, Model or View.
     * TODO **Needs refactoring :: `prototype`**
     *
     * @name add
     * @function
     * @param {Object} options An object containing the following fields:
     *
     *  - `type` (String): The element type: `V|I|M`.
     *  - `label` (String): The element label.
     *  - `color` (String): The color that should be used.
     *  - `domains` (Array): An array with the domains.
     *
     * @return {Object} An object containing the following fields:
     *
     *  - `elm` (Object): The big circle element.
     *  - `smallCircle` (Object): The small circle element.
     *  - `subelements` (Array): The subelement array.
     *  - `addSubElm` (Function): Adds a new subelement.
     *
     */
    SVGGraph.prototype.add = function (options) {

        var newElm = {
            // Draggable radius
            dRadius: 200
        };
        var self = this;

        // Create the draggable element
        var drGroup = newElm.dElm = self.options.dNodes.group();
        var dCircle = drGroup.circle(newElm.dRadius);
        var baseColors = ["#FACC39", "#FACC39", "#B5E763", "#F6A038", "#D34445"]
        var plsColor = options.color || Please.make_color({
            base_color: baseColors[Math.floor(Math.random() * (baseColors.length - 1))]
            //golden: true
        })[0];
        var subElmColors = null;

        drGroup.addClass("d-element-" + options.type);
        drGroup.text(options.label).addClass("elm-name").dx(100).dy(50);
        if (Array.isArray(options.domains)) {
            var dGroup = drGroup.group().addClass("elm-domains");
            for (var i = 0; i < options.domains.length; ++i) {
                dGroup.text(options.domains[i]).dx(100).dy(10 * i + 120);
            }
        }

        /**
         * setColor
         * Sets the color of the element.
         *
         * @name setColor
         * @function
         * @param {String} col The color to set.
         */
        newElm.setColor = function (col) {
            plsColor = NameToHex(col);
            dCircle.fill(alpha(plsColor, 0.7));
            cCircle.fill(alpha(colorLuminance(plsColor, 0.05), 0.9));
            subElmColors = {
                action: colorLuminance(Please.make_color({ base_color: plsColor })[0], -0.35),
                event:  colorLuminance(Please.make_color({ base_color: plsColor })[0], -0.3),
                method: colorLuminance(Please.make_color({ base_color: plsColor })[0], -0.25)
            };
            subElms.forEach(function (c) {
                c.circle.fill(subElmColors[c.type]);
                c.text.fill(subElmColors[c.type]);
            });
        };

        drGroup.draggable();
        newElm.position = drGroup.transform();
        drGroup.on("dragmove", function () {
            newElm.position = drGroup.transform();
            conGroup.translate(newElm.position.x + 75, newElm.position.y + 75);
            updateSubElmsPos();
            conGroup.node.dispatchEvent(new CustomEvent('dragmove'));
        });

        // Create the connectable element
        var conGroup = newElm.cElm = self.options.cNodes.group();
        var cCircle = conGroup.circle(50).addClass("elm-icon");
        conGroup.addClass("c-element-" + options.type);
        var icon = conGroup.text("").addClass("elm-icon-text");
        icon.node.innerHTML = ElmInfo[options.type].icon;
        icon.dy(34).dx(25);

        // data-mouseenter attribute
        conGroup.attr({
            "data-mouseenter": "false",
            "data-element-type": options.type
        });

        conGroup.on("mouseenter", function () {
            updateConLinkColor(conGroup, "#009EDF");
            conGroup.attr("data-mouseenter", "true");
        }).on("mouseleave", function () {
            conGroup.attr("data-mouseenter", "false");
            updateConLinkColor(conGroup, $(cCircle.node).css("fill"));
        });

        setTimeout(function() {
            drGroup.node.dispatchEvent(new CustomEvent('dragmove'));
        }, 0);

        var subElms = newElm.subelms = [];

        /*!
         * updateSubElmsPos
         * Updates the subelement positions.
         *
         * @name updateSubElmsPos
         * @function
         */
        function updateSubElmsPos() {

            // 6 ..... 200
            // x ..... r
            // r = x * 200 / 6

            if (subElms.length <= 6) {
                newElm.dRadius = 200;
            } else {
                newElm.dRadius = subElms.length * 200 / 7;
            }

            dCircle.radius(newElm.dRadius / 2);

            function computeSubElmsPos() {
                var positions = [];
                for (var k = 0; k < subElms.length; ++k) {
                    positions.push({
                        x: Math.cos(2 * k * Math.PI / subElms.length - Math.PI / 2) * newElm.dRadius / 2 + 85,
                        y: Math.sin(2 * k * Math.PI / subElms.length - Math.PI / 2) * newElm.dRadius / 2 + 85
                    });
                }
                return positions;
            }

            var positions = computeSubElmsPos();
            for (var i = 0; i  < subElms.length; ++i ) {
                var cElm = subElms[i].cElm;
                cElm.translate(newElm.position.x + positions[i].x, newElm.position.y + positions[i].y);
                cElm.node.dispatchEvent(new CustomEvent('dragmove'));
            }
        }


        /**
         * addSubElm
         * Adds a subelement to the element.
         *
         * @name addSubElm
         * @function
         * @param {Object} data The subelement data object:
         *
         *  - `label` (String): The subelement label.
         *  - `type` (String): The subelement type: `action|event|method`.
         *
         * @return {Object} The subelement that was added.
         */
        newElm.addSubElm = function (data) {

            var subElmGroup = data.cElm = self.options.cNodes.group().addClass("subelement subelm-" + data.type + " parent-" + options.type);
            subElmGroup.circle(30);

            var icon = subElmGroup.text("").addClass("subelm-icon-text");
            icon.node.innerHTML = ElmInfo[data.type].icon;
            icon.dy(22).dx(15);

            var circle = data.cElm.children()[0];
            circle.fill(subElmColors[data.type]);
            data.text = subElmGroup.text(data.label).addClass("subelm-text").dx(15).dy(20).fill(subElmColors[data.type]);

            // Hover
            subElmGroup.attr({
                "data-mouseenter": "false",
                "data-element-type": data.type
            });

            subElmGroup.on("mouseenter", function () {
                subElmGroup.attr("data-mouseenter", "true");
                updateConLinkColor(data.cElm, "#009EDF");
            }).on("mouseleave", function () {
                subElmGroup.attr("data-mouseenter", "false");
                updateConLinkColor(data.cElm);
            });

            data.circle = circle;
            subElms.push(data);
            updateSubElmsPos();

            /**
             * connect
             * Connects the **subelement** to another element.
             *
             * @name connect
             * @function
             * @param {Object} options An object passed to the connectable plugin.
             * @param {Element} elm2 The target element.
             */
            data.connect = function (options, elm2) {
                if (!elm2) {
                    elm2 = options;
                }
                elm2 = elm2.cElm || elm2;
                options.padEllipse = true;
                var elm1 = data.cElm;
                var con = data.cElm.connectable(options, elm2);
                var color = $(circle.node).css("fill");

                elm1.on("dragmove", function () {
                    con.update();
                });

                elm2.on("dragmove", function () {
                    con.update();
                });


                con.update();
                con.setLineColor(color);
            };

            return data;
        };

        /**
         * connect
         * Connects an **element** to another element.
         *
         * @name connect
         * @function
         * @param {Object} options An object passed to the connectable plugin.
         * @param {Element} elm2 The target element.
         */
        newElm.connect = function (options, elm2) {

            if (!elm2) {
                elm2 = options;
            }

            elm2 = elm2.cElm || elm2;

            options.padEllipse = true;
            var con = conGroup.connectable(options, elm2);
            var color = $(cCircle.node).css("fill");
            drGroup.on("dragmove", function () {
                con.update();
            });

            elm2.on("dragmove", function () {
                con.update();
            });

            con.update();
            con.setLineColor(color);
        };

        newElm.setColor(plsColor);
        return newElm;
    };


//    =========================================================================
    function Cytoscape (selector, options, data) {
        options = Object(options);
        if (typeof selector === "string") {
            options.selector = selector;
            if (typeof options === "object" && !data && options.nodes) {
                data = options;
            }
        } else {
            options = Object(selector);
            data = options;
        }
        this.dom = $(options.selector);
        if (!this.dom.length) {
            return console.warn("Cannot find such an element: " + options.selector);
        }
        options.ui = Object(options.ui);
        this.data = null;
        this.ui = {
            toolbox: $(options.toolbox)
          , base: {
                root: options.ui.base || $("<div>", { "class": "svg-elm" })
            }
        };
        this.events = {};
        this.size = options.size || ["100%", "100%"];
        this.position = options.position || {};
        this.panZoomPosition = options.panZoomPosition || [0, 0, 1];

        if (data) {
            this.render(data);
        } else {
            this.reset();
        }
    }

    Cytoscape.prototype.on = function (ev, fn) {
        this.events[ev] = this.events[ev] || [];
        this.events[ev].push(fn);
    };

    Cytoscape.prototype.trigger = function (ev) {
        var args = null
          , i = 0
          , evs = this.events[ev]
          ;

        if (!evs) { return; }
        args = Array.prototype.slice(arguments).slice(1);

        for (; i < evs.length; ++i) {
            evs[i].apply(this, args);
        }
    };

    Cytoscape.prototype.initToolbox = function () {
        var self = this
          , sourceElm = null
          ;

        if (!self.ui.toolbox.length) { return; }
        self.ui.toolbox.children().draggable({
            helper: "clone"
          , stop: function(ev, ui) {
                sourceElm = self.cytoscape.getById(
                    document.elementFromPoint(ui.offset.left, ui.offset.top).parentElement.id
                  , true
                );
                if (!sourceElm) { return; }
                self.trigger("addElement", {
                    source: sourceElm._,
                    type: $(this).attr("data-type"),
                });
            }
        });
    };

    Cytoscape.prototype.reset = function () {

        var self = this;

        // Prepare the UI
        self.dom.empty();
        self.initToolbox();
        self.ui.root = self.ui.base.root.clone(true);
        self.ui.svg = new SVG(self.dom.get(0));
        self.ui.svg.size.apply(self.ui.svg, self.size)
        if (self.position) {
            self.dom.css(self.position);
        }

        // Create the root container
        var SVGContainer = self.ui.svgContainer = self.ui.svg.group().addClass("svg-container");

        // Lines container
        var SVGLines = self.ui.svgLines = SVGContainer.group().addClass("lines");

        // Draggable circles
        var SVGDraggableNodes = self.svgDraggableNodes = SVGContainer.group().addClass("bigelms");

        // Conectable circles
        var SVGNodes = self.svgConnectableNodes = SVGContainer.group().addClass("nodes");

        // Tmp lines container
        var SVGTmpLines = self.svgTmpLines = SVGContainer.group().addClass("tmp-lines");

        // Markers
        var SVGMarkers = self.svgMarkers = SVGContainer.group().addClass("markers");

        // Create element environement
        var graph = new SVGGraph({

            // Draggable nodes
            dNodes: SVGDraggableNodes,

            // Connectable nodes
            cNodes: SVGNodes,

            // Lines
            lines: SVGLines
        });

        // Init pan zoom interface
        self.panZoom = SVGContainer.panZoom({
            zoom: [0.05, 3]
        });

        if (self.panZoomPosition) {
            self.panZoom.setPosition.apply(self, self.panZoomPosition);
        }
    };


    Cytoscape.prototype.render = function (data) {
        var self = this
          , cNode = null
          , cLine = null
          ;

        self.reset();
        self.data = data;

        // Add elements
        Object.keys(self.data.nodes).forEach(function (cNodeId) {
            cNode = self.data.nodes[cNodeId];
            self.addElement(cNode);
        });

        // Add subelements
        Object.keys(self.data.nodes).forEach(function (cNodeId) {
            cNode = self.data.nodes[cNodeId];

            Object.keys(cNode.subelms).forEach(function (cSubElmId) {
                self.addSubElement(cNode, cNode.subelms[cSubElmId]);
            });

            Object.keys(cNode.subelms).forEach(function (cSubElmId) {
                Object.keys(cNode.subelms[cSubElmId].lines).forEach(function (cSubElmLineId) {
                    self.connect(cNode.subelms[cSubElmId].lines[cSubElmLineId]);
                });
            });

            cNode.setPosition();
        });

        // Add lines
        Object.keys(self.data.lines).forEach(function (cLineId) {
            cLine = self.data.lines[cLineId];
            self.connect(cLine);
        });
    };

    /**
     * connect
     * Connects two elements.
     *
     * @name connect
     * @function
     * @param {Object} source The source element.
     * @param {Object} target The target element.
     * @param {Object} line The line element.
     */
    Cytoscape.prototype.connect = function (source, target, line) {

        var self = this;

        line = line || {};

        if (source.source && source.target) {
            line = source;
        }

        if (line) {
            source = line.source;
            target = line.target;
        }

        line._source = typeof source === "string" ? self.getById(source) : source;
        line._target = typeof target === "string" ? self.getById(target) : target;
        line.cyto = line._source.cyto.connect({
            container: self.linec,
            markers: self.markerc
        }, line._target.cyto);
    };

    /**
     * addSubElement
     * Adds a subelement.
     *
     * @name addSubElement
     * @function
     * @param {Object} elm The parent element.
     * @param {Object} subelm The subelement to be added.
     */
    Cytoscape.prototype.addSubElement = function (elm, subelm) {

        subelm.cyto = elm.cyto.addSubElm({
            label: subelm.label,
            type: subelm.type
        });

        subelm.cyto.cElm.id(subelm.id).attr("data-parent-id", subelm.parent);
    };

    /**
     * addElement
     * Adds an element.
     *
     * @name addElement
     * @function
     * @param {Object} el The element to be added.
     */
    Cytoscape.prototype.addElement = function (el) {

        var self = this;
        elm = Cytoscape.Element(el);

        var domains = [];
        if (el.entrypoint) {
            domains.push(el.entrypoint);
        }

        elm.cyto = el.cyto = self.graph.add({
            type: "I",
            label: elm.name,
            domains: domains,
            color: elm.color
        });

        elm.size = elm.cyto.dElm.bbox();

        if (!elm.pos.x && !elm.pos.y) {

            elm.pos.x = self.cPos.x;
            elm.pos.y = self.cPos.y;

            self.cPos.x += elm.size.width + 30;
            if (self.cPos.x + elm.size.width > self.size.width) {
                self.cPos.x = 0;
                self.cPos.y += elm.size.height + 30;
            }
        }

        elm.cyto.dElm.id(elm.id);
        elm.cyto.cElm.attr("data-elm-id", elm.id);

        for (var j = 0; j < self.dHandlers.length; ++j) {
            self.addDHandler(self.dHandlers[j], elm);
        }
    };

    /**
     * addDHandler
     * Adds event listeners on elements.
     *
     * @name addDHandler
     * @function
     * @param {String} handler The handler name.
     * @param {Object} elm The element object.
     */
    Cytoscape.prototype.addDHandler = function (handler, elm) {
        var self = this;
        elm.cyto.dElm.on(handler, function () {
            self[handler].apply(this, arguments);
        });
    };


    /**
     * getById
     * Returns the element that has the provided id.
     *
     * @name getById
     * @function
     * @param {String} id The element id you want to get.
     * @return {CElement|Line|SubElement|null} The element that has the provided id.
     */
    Cytoscape.prototype.getById = function (id) {
        var result = null
          , data = this.data
          , nodeIds = null
          , cNode = null
          , subElmids = null
          , cSubElm = null
          , i = 0
          , ii = 0
          ;

        // Nodes
        result = data.nodes[id];
        if (result) { return result; }

        // Lines
        result = data.lines[id];
        if (result) { return result; }

        // Subelements and subelement lines
        nodeIds = Object.keys(data.nodes);
        for (; i < nodeIds.length; ++i) {
            cNode = data.nodes[nodeIds[i]];
            result = cNode.subelms[id];
            if (result) { return result; }
            subElmIds = Object.keys(cNode.subelms);
            for (ii = 0; ii < subElmIds.length; ++ii) {
                cSubElm = cNode.subelms[subElmIds[ii]];
                result = cSubElm.lines[id];
                if (result) { return result; }
            }
        }

        return null;
    };

    if (typeof module !== "undefined") {
        module.exports = Cytoscape;
    } else {
        root.Cytoscape = Cytoscape;
    }
})(this);
