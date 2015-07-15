window.addEventListener("load", function () {
    var cyto = new Cytoscape(".graph", {
        toolbox: ".toolbox"
    }, {
        nodes: {
            "node_a": {
                name: "A"
              , id: "node_a"
              , icon: "&#10084;"
            }
          , "node_b": {
                name: "B"
              , id: "node_b"
              , icon: "&#9762;"
              , subelms: {
                    "sub_elm_1": {
                        id: "sub_elm_1"
                      , parent: "node_b"
                      , label: "Subelement 1"
                      , icon: "&#10052;"
                    }
                }
            }
        }
      , lines: {
            "node_a__node_b": {
                source: "node_a"
              , target: "node_b"
              , id: "node_a__node_b"
             }
        }
    });

    cyto.on("addElement", function (data) {
        cyto.connect(data.source, cyto.addElement({
            name: Math.random().toString()
        }));
    });
});
