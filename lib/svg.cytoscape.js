/*!
 * svg.cytoscape.js
 * ================
 *
 * A library to create nice drag-and-drop, pan, zoom and connectable environments.
 * Created with <3 and JavaScript by the jillix developers.
 *
 * svg.cytoscape.js 1.0.0
 * */
(function (root) {

    /*!
     * nameToHex
     * Converts a color name into its hexcode.
     *
     * @name nameToHex
     * @function
     * @param {String} colour The color to search.
     * @return {String} The hex color.
     */
    // http://stackoverflow.com/a/1573141/1420197
    function nameToHex (colour) { var colours = { "aliceblue": "#f0f8ff", "antiquewhite": "#faebd7", "aqua": "#00ffff", "aquamarine": "#7fffd4", "azure": "#f0ffff", "beige": "#f5f5dc", "bisque": "#ffe4c4", "black": "#000000", "blanchedalmond": "#ffebcd", "blue": "#0000ff", "blueviolet": "#8a2be2", "brown": "#a52a2a", "burlywood": "#deb887", "cadetblue": "#5f9ea0", "chartreuse": "#7fff00", "chocolate": "#d2691e", "coral": "#ff7f50", "cornflowerblue": "#6495ed", "cornsilk": "#fff8dc", "crimson": "#dc143c", "cyan": "#00ffff", "darkblue": "#00008b", "darkcyan": "#008b8b", "darkgoldenrod": "#b8860b", "darkgray": "#a9a9a9", "darkgreen": "#006400", "darkkhaki": "#bdb76b", "darkmagenta": "#8b008b", "darkolivegreen": "#556b2f", "darkorange": "#ff8c00", "darkorchid": "#9932cc", "darkred": "#8b0000", "darksalmon": "#e9967a", "darkseagreen": "#8fbc8f", "darkslateblue": "#483d8b", "darkslategray": "#2f4f4f", "darkturquoise": "#00ced1", "darkviolet": "#9400d3", "deeppink": "#ff1493", "deepskyblue": "#00bfff", "dimgray": "#696969", "dodgerblue": "#1e90ff", "firebrick": "#b22222", "floralwhite": "#fffaf0", "forestgreen": "#228b22", "fuchsia": "#ff00ff", "gainsboro": "#dcdcdc", "ghostwhite": "#f8f8ff", "gold": "#ffd700", "goldenrod": "#daa520", "gray": "#808080", "green": "#008000", "greenyellow": "#adff2f", "honeydew": "#f0fff0", "hotpink": "#ff69b4", "indianred ": "#cd5c5c", "indigo": "#4b0082", "ivory": "#fffff0", "khaki": "#f0e68c", "lavender": "#e6e6fa", "lavenderblush": "#fff0f5", "lawngreen": "#7cfc00", "lemonchiffon": "#fffacd", "lightblue": "#add8e6", "lightcoral": "#f08080", "lightcyan": "#e0ffff", "lightgoldenrodyellow": "#fafad2", "lightgrey": "#d3d3d3", "lightgreen": "#90ee90", "lightpink": "#ffb6c1", "lightsalmon": "#ffa07a", "lightseagreen": "#20b2aa", "lightskyblue": "#87cefa", "lightslategray": "#778899", "lightsteelblue": "#b0c4de", "lightyellow": "#ffffe0", "lime": "#00ff00", "limegreen": "#32cd32", "linen": "#faf0e6", "magenta": "#ff00ff", "maroon": "#800000", "mediumaquamarine": "#66cdaa", "mediumblue": "#0000cd", "mediumorchid": "#ba55d3", "mediumpurple": "#9370d8", "mediumseagreen": "#3cb371", "mediumslateblue": "#7b68ee", "mediumspringgreen": "#00fa9a", "mediumturquoise": "#48d1cc", "mediumvioletred": "#c71585", "midnightblue": "#191970", "mintcream": "#f5fffa", "mistyrose": "#ffe4e1", "moccasin": "#ffe4b5", "navajowhite": "#ffdead", "navy": "#000080", "oldlace": "#fdf5e6", "olive": "#808000", "olivedrab": "#6b8e23", "orange": "#ffa500", "orangered": "#ff4500", "orchid": "#da70d6", "palegoldenrod": "#eee8aa", "palegreen": "#98fb98", "paleturquoise": "#afeeee", "palevioletred": "#d87093", "papayawhip": "#ffefd5", "peachpuff": "#ffdab9", "peru": "#cd853f", "pink": "#ffc0cb", "plum": "#dda0dd", "powderblue": "#b0e0e6", "purple": "#800080", "red": "#ff0000", "rosybrown": "#bc8f8f", "royalblue": "#4169e1", "saddlebrown": "#8b4513", "salmon": "#fa8072", "sandybrown": "#f4a460", "seagreen": "#2e8b57", "seashell": "#fff5ee", "sienna": "#a0522d", "silver": "#c0c0c0", "skyblue": "#87ceeb", "slateblue": "#6a5acd", "slategray": "#708090", "snow": "#fffafa", "springgreen": "#00ff7f", "steelblue": "#4682b4", "tan": "#d2b48c", "teal": "#008080", "thistle": "#d8bfd8", "tomato": "#ff6347", "turquoise": "#40e0d0", "violet": "#ee82ee", "wheat": "#f5deb3", "white": "#ffffff", "whitesmoke": "#f5f5f5", "yellow": "#ffff00", "yellowgreen": "#9acd32" }; return colours[colour] || colour; };

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

    /**
     * colorLuminance
     * Modifies the color luminance.
     *
     * @name colorLuminance
     * @function
     * @param {String} hex The color in hex format.
     * @param {Number} lum The luminance value (0 is neutral, greater (less) than 0 is more (less) luminance).
     * @return {String} The new color.
     */
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

    /**
     * alpha
     * Modifies a color alpha value.
     *
     * @name alpha
     * @function
     * @param {String} color The input color.
     * @param {Number} a The alpha value.
     * @return {String} The modified color.
     */
    function alpha(color, a) {
        if (/^\#/.test(color)) {
            var rgbVals = hexToRgb(color);
            color = "rgba(" + rgbVals.join(",") + ",0)";
        }
        return color.replace(/[^,]+(?=\))/, a.toString());
    }

    /**
     * updateConLinkColor
     * Updates the connection lines of an element.
     *
     * @name updateConLinkColor
     * @function
     * @param {Element} elm The element to update connection lines for.
     * @param {String} color The new color for connection lines.
     */
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
     * Creates a new instance of elements graph.
     *
     * @name SVGGraph
     * @function
     * @param {Object} opt_options An object containing the following fields:
     *
     *  - `dNodes` (SVG Element): The container where the draggable nodes will be appended.
     *  - `cNodes` (SVG Element): The container where the connectable nodes will be appended.
     *  - `lines` (SVG Element): The container where the lines will be appended.
     *
     * @return {SVGGraph} The `SVGGraph` instance.
     */
    function SVGGraph(opt_options) {
        this.options = opt_options;
    }

    /**
     * add
     * Adds a new element: Instance, Model or View.
     *
     * @name add
     * @function
     * @param {Object} options An object containing the following fields:
     *
     *  - `label` (String): The element label.
     *  - `color` (String): The color that should be used.
     *  - `domains` (Array): An array with the domains.
     *  - `icon` (String): The element icon.
     *
     * @return {Object} An object containing the following fields:
     *
     *  - `dRadius` (Number): The circle radius.
     *  - `setColor` (Function): A function to set the color.
     *  - `position` (Object): The position object.
     *  - `cElm` (SVGElement): The connectable SVG element.
     *  - `subelms` (Array): An array with the subelements.
     *  - `addSubElm` (Function): A function to add new subelements.
     *  - `connect` (Function): A function to connect the element with other (sub)element.
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
            plsColor = nameToHex(col);
            dCircle.fill(alpha(plsColor, 0.7));
            cCircle.fill(alpha(colorLuminance(plsColor, 0.05), 0.9));
            subElmColors = {
                l: colorLuminance(Please.make_color({ base_color: plsColor })[0], -0.35),
                m:  colorLuminance(Please.make_color({ base_color: plsColor })[0], -0.3),
                s: colorLuminance(Please.make_color({ base_color: plsColor })[0], -0.25)
            };
            subElms.forEach(function (c) {
                c.circle.fill(subElmColors[c.type] || subElmColors.l);
                c.text.fill(subElmColors[c.type] || subElmColors.l);
            });
        };

        drGroup.draggy();
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
        conGroup.addClass("c-element");
        if (options.type) {
            conGroup.addClass("c-element-" + options.type);
        }
        var icon = conGroup.text("").addClass("elm-icon-text");
        icon.node.innerHTML = options.icon || "";
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
         *  - `type` (String): An optional subelement type (`l|m|s`).
         *  - `icon` (String): An optional icon.
         *  - `classes` (Array): An array with custom classes added to the circle element.
         *
         * @return {Object} The subelement that was added:
         *
         *  - `text` (SVGElement): The text SVG element.
         *  - `cElm` (SVGElement): The connectable SVG element.
         *  - `circle` (SVGElement): The circle element.
         *  - `connect` (Function): A function to connect the element with other (sub)element.
         */
        newElm.addSubElm = function (data) {

            var subElmGroup = data.cElm = self.options.cNodes.group().addClass("subelement subelm-" + data.type + " parent-" + options.type);
            subElmGroup.circle(30);

            var icon = subElmGroup.text("").addClass("subelm-icon-text");
            icon.node.innerHTML = data.icon || "";
            icon.dy(22).dx(15);

            var circle = data.cElm.children()[0];
            circle.fill(subElmColors[data.type] || subElmColors.l);

            if (Array.isArray(data.classes)) {
                circle.addClass(data.classes.join(" "));
            }

            data.text = subElmGroup.text(data.label).addClass("subelm-text").dx(15).dy(20).fill(subElmColors[data.type] || subElmColors.l);

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

                return con;
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

            return con;
        };

        newElm.setColor(plsColor);
        return newElm;
    };

    /**
     * Cytoscape
     * Creates a new cytoscape in SVG.
     *
     * @name Cytoscape
     * @function
     * @param {String|Object} selector The selector or the options object.
     * @param {Object} options An object containing the following fields:
     *
     *  - `selector` (String): The container selector.
     *  - `ui` (Object): An object containing:
     *    - `base` (Object): An object containing:
     *      - `root` (jQuery): The root element template.
     *  - `toolbox` (String|jQuery): The toolbox element.
     *  - `size` (Array): The size value in the `[width, height]` format (default: `["100%", "100%"]`).
     *  - `position` (Object): A jQuery css object (default `{}`).
     *  - `panZoomPosition` (Array): The pan-zoom position in the `[x, y, zoom]` format (default: `[0, 0, 1]`).
     *
     * @param {Object} data An optional object containing:
     * @return {Cytoscape} The `Cytoscape` instance.
     */
    function Cytoscape (selector, options, data) {
        options = Object(options);
        if (typeof selector === "string") {
            options.selector = selector;
            if (typeof options === "object" && !data && options.nodes) {
                data = options;
            }
        } else {
            data = options;
            options = Object(selector);
        }
        this.dom = $(options.selector);
        this.dom.css({
            height: "100%"
          , width: "100%"
        });
        if (!this.dom.length) {
            return console.warn("Cannot find such an element: " + options.selector);
        }
        options.ui = Object(options.ui);
        options.ui.base = Object(options.ui.base);
        this.data = null;
        this.ui = {
            toolbox: $(options.toolbox)
          , base: {
                root: options.ui.base.root || $("<div>", { "class": "svg-elm" })
            }
        };
        this.events = {};
        this.size = options.size || ["100%", "100%"];
        this._size = {
            height: $(window).height()
          , width: $(window).width()
        };
        this.position = options.position || {};
        this.panZoomPosition = options.panZoomPosition || [0, 0, 1];
        this.cPos = { x: 0, y: 0 };
        this.ids = {};

        if (data) {
            this.render(data);
        } else {
            this.reset();
        }
    }

    /**
     * on
     * Adds a new listener for some event.
     *
     * @name on
     * @function
     * @param {String} ev The event name.
     * @param {Function} fn The listener function.
     * @return {Cytoscape} The `Cytoscape` instance.
     */
    Cytoscape.prototype.on = function (ev, fn) {
        this.events[ev] = this.events[ev] || [];
        this.events[ev].push(fn);
        return this;
    };

    /**
     * trigger
     * Triggers an event with data.
     *
     * Usage: `cyto.trigger("some-event", and, some, args)`
     *
     * @name trigger
     * @function
     * @param {String} ev The event name.
     * @return {Cytoscape} The `Cytoscape` instance.
     */
    Cytoscape.prototype.trigger = function (ev) {
        var args = null
          , i = 0
          , evs = this.events[ev]
          ;

        if (!evs) { return; }
        args = Array.prototype.slice.call(arguments, 1);

        for (; i < evs.length; ++i) {
            evs[i].apply(this, args);
        }

        return this;
    };

    /**
     * initToolbox
     * This function initializes the toolbox.
     *
     * @name initToolbox
     * @function
     */
    Cytoscape.prototype.initToolbox = function () {
        var self = this
          , sourceElm = null
          ;

        if (!self.ui.toolbox.length) { return; }
        self.ui.toolbox.children().draggable({
            helper: "clone"
          , stop: function(ev, ui) {
                sourceElm = self.getById(
                    document.elementFromPoint(ui.offset.left, ui.offset.top).parentElement.id
                  , true
                );
                if (!sourceElm) { return; }
                self.trigger("addElement", {
                    source: sourceElm,
                    type: $(this).attr("data-type"),
                });
            }
        });
    };

    /**
     * reset
     * Resets the graph.
     *
     * @name reset
     * @function
     */
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
        var SVGDraggableNodes = self.ui.svgDraggableNodes = SVGContainer.group().addClass("bigelms");

        // Conectable circles
        var SVGNodes = self.ui.svgConnectableNodes = SVGContainer.group().addClass("nodes");

        // Tmp lines container
        var SVGTmpLines = self.ui.svgTmpLines = SVGContainer.group().addClass("tmp-lines");

        // Markers
        var SVGMarkers = self.ui.svgMarkers = SVGContainer.group().addClass("markers");

        // Create element environement
        var graph = self.graph = new SVGGraph({

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

        /////////////////////////////////////////////////////////////////////////////
        // Svg.line.js // Can we move it in a library?                             //
        // TODO
        /////////////////////////////////////////////////////////////////////////////
        var svgLineJs = self._svgLineJS = {
            reset: function () {
                if (svgLineJs.line) {
                    svgLineJs.line.remove();
                }
                svgLineJs.mouseDown = false;
                svgLineJs.line = null;

                svgLineJs.target = null;
                svgLineJs.source = null;

                if (svgLineJs.marker) {
                    svgLineJs.marker.remove();
                }
                svgLineJs.marker = null;
            }
        };

        self.dom.on("mousedown", "g.c-element > circle, g.subelement > circle", function () {
            svgLineJs.source = this;
            svgLineJs.mouseDown = true;
        });

        self.zoomHandler = function (ev) {
            if (!svgLineJs.mouseDown) { return; }
            svgLineJs.x1 = svgLineJs.x2;
            svgLineJs.y1 = svgLineJs.y2;
            svgLineJs.mouse.x1 = svgLineJs.mPosition.x;
            svgLineJs.mouse.y1 = svgLineJs.mPosition.y;
        };

        self.dom.on("mousemove", function (ev) {

            if (!svgLineJs.mouseDown) {
                svgLineJs.source = null;
                svgLineJs.target = null;
                return;
            }

            svgLineJs.mPosition = {
                x: ev.clientX,
                y: ev.clientY
            };

            if (svgLineJs.line) {
                svgLineJs.x2 = svgLineJs.x1 + (ev.clientX - svgLineJs.mouse.x1) / self.panZoom.transform.scaleX;
                svgLineJs.y2 = svgLineJs.y1 + (ev.clientY - svgLineJs.mouse.y1) / self.panZoom.transform.scaleX;
                svgLineJs.line.attr({
                    x2: svgLineJs.x2,
                    y2: svgLineJs.y2
                });
            } else {
                var marker = self.ui.svgMarkers.marker(10, 10);
                var markerId = "triangle-" + Math.random().toString(16);
                var sPos = svgLineJs.source.getBBox()
                marker.attr({
                    id: markerId,
                    viewBox: "0 0 10 10",
                    refX: "0",
                    refY: "5",
                    markerUnits: "strokeWidth",
                    markerWidth: "4",
                    markerHeight: "5"
                });

                var translate = svgLineJs.source.parentNode.getAttribute("transform").split(/\,|\)/);
                svgLineJs.x1 = parseFloat(translate[4]) + sPos.width / 2;
                svgLineJs.y1 = parseFloat(translate[5]) + sPos.height / 2;
                svgLineJs.mouse = {
                    x1: ev.clientX,
                    y1: ev.clientY
                };

                marker.path().attr({
                    d: "M 0 0 L 10 5 L 0 10 z"
                });
                marker.id(markerId);
                svgLineJs.line = self.ui.svgTmpLines.line().attr("marker-end", "url(#" + markerId + ")");
                svgLineJs.marker = marker;
                svgLineJs.line.stroke("black");
                svgLineJs.line.attr({
                    x1: svgLineJs.x1,
                    y1: svgLineJs.y1,
                    x2: svgLineJs.x1,
                    y2: svgLineJs.y1
                });
            }
        });

        function getElmData(elm) {

            if (typeof elm === "string") {
                return self.getById(elm);
            }

            var $parent = $(elm.parentNode);

            // Big elements
            if ($parent.hasClass("c-element")) {
                return getElmData($parent.attr("data-elm-id"));
            }

            // Small elements
            if ($parent.attr("data-parent-id")) {
                return getElmData($parent.attr("id"));
            }

            if ($parent.attr("data-elm-id")) {
                return getElmData($parent.attr("data-elm-id"));
            }
        }

        self.dom.on("mouseup", function (ev) {
            if (!svgLineJs.source || !svgLineJs.marker || !svgLineJs.line) { return; }
            setTimeout(function() {
                svgLineJs.target = ev.target;

                var source = getElmData(svgLineJs.source);
                var target = getElmData(svgLineJs.target);

                if (svgLineJs.source === svgLineJs.target) {
                    self.trigger("elementClicked",  svgLineJs.source, source);
                } else if (source && target) {
                    self.trigger("connectElements", source, target);
                }

                svgLineJs.reset();
            }, 0);
        });
    };

    /**
     * render
     * Renders data in the graph.
     *
     * @name render
     * @function
     * @param {Object} data The data object.
     */
    Cytoscape.prototype.render = function (data) {
        var self = this
          , cNode = null
          , cLine = null
          ;

        if (typeof data.nodes !== "object") {
            return;
        }

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
            if (cNode.subelms) {
                Object.keys(cNode.subelms).forEach(function (cSubElmId) {
                    self.addSubElement(cNode, cNode.subelms[cSubElmId]);
                });
            }

            cNode.setPosition();
        });

        // Add lines
        if (!self.data.lines) { return; }
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
        var id = null;
        var classes = null;

        if (source.source && source.target) {
            target = source.target;
            id = source.id;
            classes = source.classes;
            source = source.source;
        }

        if (typeof source === "string") {
            source = self.getById(source);
        }

        if (typeof target === "string") {
            target = self.getById(target);
        }

        if (!source || !target) {
            return console.warn("Cannot connect empty elements.");
        }

        line = line || {};

        line.id = id;
        line.source = source;
        line.target = target;
        line.classes = line.classes || classes || [];


        if (!target.cyto) {
            console.warn("Invalid target", target);
            return line;
        }

        self.ids[line.id] = line;

        line.cyto = line.source.cyto.connect({
            container: self.ui.svgLines,
            markers: self.ui.svgMarkers
        }, line.target.cyto);
        line.cyto.line.id(line.id);

        if (Array.isArray(line.classes)) {
            line.cyto.line.addClass(line.classes.join(" "));
        }

        return line;
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

        var self = this;

        if (typeof elm === "string") {
            elm = self.getById(elm);
            if (!elm) {
                return console.warn("There is no element with this id.");
            }
        }

        if (!subelm.id) {
            subelm.id = Math.random().toString(16).substring(5);
        }

        elm.subelms = Object(elm.subelms);
        elm.subelms[subelm.id] = subelm;
        self.ids[subelm.id] = subelm;

        subelm.cyto = elm.cyto.addSubElm({
            label: subelm.label,
            type: subelm.type,
            icon: subelm.icon
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
     * @return {Element} The added element.
     */
    Cytoscape.prototype.addElement = function (el) {

        var self = this;
        elm = Cytoscape.Element(el);

        var domains = [];
        if (el.entrypoint) {
            domains.push(el.entrypoint);
        }

        elm.cyto = el.cyto = self.graph.add({
            label: elm.name,
            domains: domains,
            color: elm.color,
            icon: elm.icon
        });

        elm.size = {
            width: elm.cyto.dRadius * 1.1
        };
        elm.size.height = elm.size.width;

        if (!elm.pos.x && !elm.pos.y) {

            elm.pos.x = self.cPos.x;
            elm.pos.y = self.cPos.y;

            self.cPos.x += elm.size.width + 30;
            if (self.cPos.x + elm.size.width > self._size.width) {
                self.cPos.x = 0;
                self.cPos.y += elm.size.height + 30;
            }
        }

        self.data.nodes[elm.id] = elm;
        self.ids[elm.id] = elm;

        elm.cyto.dElm.id(elm.id);
        elm.cyto.cElm.attr("data-elm-id", elm.id);

        return elm;
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
        var self = this
          , result = null
          , data = this.data
          , nodeIds = null
          , cNode = null
          , subElmids = null
          , cSubElm = null
          , i = 0
          , ii = 0
          , ids = Object.keys(self.ids)
          , c = null
          ;

        if (id.constructor === RegExp) {
            for (; i < ids.length; ++i) {
                if (id.test(c = ids[i])) {
                    return self.getById(c);
                }
            }
            return null;
        }

        // TODO Maybe use the self.ids object

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
            if (!cNode.subelms) { continue; }
            result = cNode.subelms[id];
            if (result) { return result; }
            subElmIds = Object.keys(cNode.subelms);
            for (ii = 0; ii < subElmIds.length; ++ii) {
                cSubElm = cNode.subelms[subElmIds[ii]];
                if (!cSubElm.lines) { continue; }
                result = cSubElm.lines[id];
                if (result) { return result; }
            }
        }

        return null;
    };

    Cytoscape.prototype.searchElement = function (name, re) {
        var self = this
          , elm = null
          ;

        if (re) {
            // TODO Prepare regex???
            //      Search in names
            // elm = self.getById(new RegExp("^" + name));
            if (!elm) {
                elm = self.getById(new RegExp(name));
            }
        } else {
            elm = this.getById(name);
        }
        if (!elm) {
            return;
        }

        elm = elm.cyto.dElm || elm.cyto.cElm;

        var bbox = elm.bbox()
          , trans = elm.transform()
          ;

        //self.panZoom.zoom(2, trans.x + trans.x / 2, trans.y + trans.y / 2);
        self.panZoom.zoom(1);
        self.panZoom.setPosition(-trans.x + self.dom.width() / 2 - bbox.x / 4, -trans.y + self.dom.height() / 2 - bbox.y / 2);
    };

    /**
     * CElement
     * Creates a new cytoscape element.
     *
     * @name CElement
     * @function
     * @param {Object} elm An object containing the following fields:
     *
     *  - pos (Object): The position object.
     *  - id (String): An optional id.
     *  - icon (HTML): The icon.
     *  - color (String): An optional color.
     *  - subelms (Object): An object with subelements.
     *
     * @return {CElement} The cytoscape element instance.
     */
    Cytoscape.Element = function (elm) {

        if (this.constructor !== Cytoscape.Element) {
            return new Cytoscape.Element(elm);
        }

        var self = this;
        elm.pos = Object(elm.pos);
        elm.type = "instance";
        if (!elm.id) {
            elm.id = Math.random().toString(16).substring(5);
        }

        // Clone object
        Object.keys(elm).forEach(function (c) {
            self[c] = elm[c];
        });

        Object.keys(this.__proto__).forEach(function (c) {
            elm[c] = self[c].bind(self);
        });
    }

    /**
     * setPosition
     * Updates the element position.
     *
     * @name setPosition
     * @function
     * @param {Number} x The x coordinate.
     * @param {Number} y The y coordinate.
     */
    Cytoscape.Element.prototype.setPosition = function setPosition(x, y) {
        x = x || this.pos.x;
        y = y || this.pos.y;
        this.cyto.dElm.translate(x, y);
        this.cyto.dElm.node.dispatchEvent(new CustomEvent("dragmove"));
    };

    if (typeof module !== "undefined") {
        module.exports = Cytoscape;
    } else {
        root.Cytoscape = Cytoscape;
    }
})(this);
