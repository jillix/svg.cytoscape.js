window.addEventListener("load", function () {

    var flatColors = [
        "#1abc9c"
      , "#2ecc71"
      , "#3498db"
      , "#9b59b6"
      , "#34495e"
      , "#16a085"
      , "#27ae60"
      , "#2980b9"
      , "#8e44ad"
      , "#2c3e50"
      , "#f1c40f"
      , "#e67e22"
      , "#e74c3c"
      , "#ecf0f1"
      , "#95a5a6"
      , "#f39c12"
      , "#d35400"
      , "#c0392b"
      , "#bdc3c7"
      , "#7f8c8d"
    ];

    var cyto = new Cytoscape(".graph", {
        toolbox: ".toolbox"
      , size: ["100%", "99%"]
    }, {
        nodes: {
            "node_a": {
                name: "We are jillix"
              , id: "node_a"
              , icon: "&#10084;"
              , color: "#009EDF"
            }
          , "node_b": {
                name: "And we love open-source"
              , id: "node_b"
              , icon: "&#9762;"
              , color: "#2ecc71"
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

    var subElms = ["and we prepared", "this library", "just for you!"];
    subElms.forEach(function (c, i) {
        setTimeout(function () {
            cyto.addSubElement("node_b", {
                label: c
              , icon: "&#10052;"
            });
        }, i * 1000 + 1000);
    });

    setTimeout(function () {
        cyto.addElement({
            name: "And now you can play with this!"
          , color: flatColors[Math.floor(Math.random() * flatColors.length)]
        }).setPosition(120, 200);
    }, 4000)



    cyto.on("addElement", function (data) {
        var newElm = cyto.addElement({
            name: Math.random().toString()
          , color: flatColors[Math.floor(Math.random() * flatColors.length)]
        });
        cyto.connect(data.source, newElm);
        var bbox = data.source.cyto.dElm.bbox()
          , tr = data.source.cyto.dElm.transform()
          ;

        newElm.setPosition(tr.x + bbox.width, tr.y + bbox.height);
    });

    cyto.on("connectElements", function (s, t) {
        cyto.connect(s, t);
    });

    cyto.panZoom.setPosition(10, 30);
});
