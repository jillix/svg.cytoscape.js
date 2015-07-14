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

    function Cytoscape (selector, options, data) {
        options = Object(options);
        if (typeof selector === "string") {
            options.selector = selector;
        } else {
            options = Object(selector);
            data = options;
        }
        this.dom = document.querySelector(options.selector);
        if (!this.dom) {
            return console.warn("Cannot find such an element: " + options.selector);
        }
        this.data = null;
    }

    Cytoscape.prototype.render = function (data) {
        var self = this
          , cNode = null
          , cLine = null
          ;

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
