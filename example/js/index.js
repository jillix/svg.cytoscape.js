window.addEventListener("load", function () {
    var cyto = new Cytoscape(".graph", {
        nodes: {
            "node_a": {
                name: "A"
              , id: "node_a"
            }
          , "node_b": {
                name: "B"
              , id: "node_b"
              , subelms: {
                    "sub_elm_1": {
                        id: "sub_elm_1"
                      , parent: "node_b"
                      , label: "Subelement 1"
                    }
                }
            }
        }
    });
});
