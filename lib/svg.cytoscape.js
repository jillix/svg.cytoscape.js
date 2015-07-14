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

    function Cytoscape (selector, options) {
        options = Object(options);
        if (typeof selector === "string") {
            options.selector = selector;
        } else {
            options = Object(selector);
        }
        this.dom = document.querySelector(options.selector);
        if (!this.dom) {
            return console.warn("Cannot find such an element: " + options.selector);
        }
    }

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
