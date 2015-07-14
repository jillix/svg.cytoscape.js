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

    }

    if (typeof module !== "undefined") {
        module.exports = Cytoscape;
    } else {
        root.Cytoscape = Cytoscape;
    }
})(this);
