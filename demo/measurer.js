import {
    Map, Editor,
    GCJ02, LatLngType,
    Point,
    Polyline,
    SimpleFillSymbol,
    FeatureClass,
    FeatureLayer,
    SimpleRenderer,
    CategoryRenderer,
    CategoryRendererItem,
    Field, Label, Tooltip,
    FieldType,
    Graphic, SimpleMarkerSymbol, Feature, SimpleTextSymbol, ArrowSymbol, SimplePointSymbol,
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

    const measurer = map.measurer;

    window.measurePolygon = () => {
        measurer.measurePolygon();
    };

    window.measurePolyLine = () => {
        measurer.measurePolyLine();
    };

    window.clearMeasure = () => {
        measurer.clear();
    };

    map.setView([109.519, 18.271], 13);


}
