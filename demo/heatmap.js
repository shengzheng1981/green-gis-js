import {
    Map,
    GCJ02, LatLngType,
    Point,
    Polyline,
    SimpleFillSymbol,
    FeatureClass,
    FeatureLayer,
    RasterLayer, Raster, Heat,
    SimpleRenderer,
    CategoryRenderer,
    CategoryRendererItem,
    Field, Label, Tooltip,
    FieldType,
    Graphic, SimpleMarkerSymbol, Feature, SimpleTextSymbol, ArrowSymbol
} from "../dist";

window.load = () => {
    const amap = new AMap.Map("amap", {
        fadeOnZoom: false,
        navigationMode: 'classic',
        optimizePanAnimation: false,
        animateEnable: false,
        dragEnable: false,
        zoomEnable: false,
        resizeEnable: true,
        doubleClickZoom: false,
        keyboardEnable: false,
        scrollWheel: false,
        expandZoomRange: true,
        zooms: [1, 20],
        mapStyle: 'normal',
        features: ['road', 'point', 'bg'],
        viewMode: '2D'
    });

    const map = new Map("foo");
    map.on("extent", (event) => {
        amap.setZoomAndCenter(event.zoom, event.center);
        document.getElementById("x").value = Math.round(event.center[0] * 1000)/1000;
        document.getElementById("y").value = Math.round(event.center[1] * 1000)/1000;
        document.getElementById("zoom").value = event.zoom;
        document.getElementById("x1").value = Math.round(event.extent.xmin * 1000)/1000;
        document.getElementById("y1").value = Math.round(event.extent.ymin * 1000)/1000;
        document.getElementById("x2").value = Math.round(event.extent.xmax * 1000)/1000;
        document.getElementById("y2").value = Math.round(event.extent.ymax * 1000)/1000;
        document.getElementById("a").value = Math.round(event.matrix.a * 1000)/1000;
        document.getElementById("d").value = Math.round(event.matrix.d * 1000)/1000;
        document.getElementById("e").value = Math.round(event.matrix.e * 1000)/1000;
        document.getElementById("f").value = Math.round(event.matrix.f * 1000)/1000;
    });

    var req = new XMLHttpRequest();
    req.onload = (event) => {
        const featureClass = new FeatureClass();
        featureClass.loadGeoJSON(JSON.parse(req.responseText));
        const featureLayer = new FeatureLayer();
        featureLayer.featureClass = featureClass;
        const renderer = new SimpleRenderer();
        featureLayer.renderer = renderer;
        featureLayer.zoom = [10, 20];

        const field = new Field();
        field.name = "DEPTH";
        const heat = new Heat();
        heat.honey = true;
        heat.honeySide = 6;
        heat.generate(featureClass, field);
        const rasterLayer = new RasterLayer();
        rasterLayer.raster = heat;
        map.addLayer(rasterLayer);

        //map.addLayer(featureLayer);

        map.setView([109.519, 18.271], 13);
    };
    req.open("GET", "assets/geojson/junction.json", true);
    req.send(null);

    //map.setProjection(new GCJ02(LatLngType.GCJ02));

}
