window.addEventListener("load", function () {
    var cyto = new Cytoscape(".graph", {
        nodes: {
            "node_a": {
                name: "A",
                id: "node_a"
            }
        }
    });
});
