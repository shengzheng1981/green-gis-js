import {
    Map,
    Point,
    Polyline,
    SimpleFillSymbol,
    FeatureClass,
    FeatureLayer,
    SimpleRenderer,
    CategoryRenderer,
    CategoryRendererItem,
    Field,
    FieldType, GeometryType,
    Graphic, SimpleMarkerSymbol, Feature, LatLngType, GCJ02
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
    map.setProjection(new GCJ02(LatLngType.GCJ02));
    map.setView([116.397411,39.909186], 7);

    var req = new XMLHttpRequest();
    req.onload = (event) => {
        const featureClass = new FeatureClass(GeometryType.Polygon);
        featureClass.loadGeoJSON(JSON.parse(req.responseText));
        const featureLayer = new FeatureLayer();
        featureLayer.featureClass = featureClass;
        const field = new Field();
        field.name = "name";
        field.type = FieldType.String;
        const renderer = new CategoryRenderer();
        renderer.generate(featureClass, field);

        /*renderer.field = field;
        let item = new CategoryRendererItem();
        item.value = "WEAR";
        const symbol1 = new SimpleFillSymbol();
        symbol1.fillStyle = "#0868ac";
        symbol1.strokeStyle = "#084081";
        item.symbol = symbol1;
        renderer.items.push(item);
        item = new CategoryRendererItem();
        item.value = "GAAR";
        const symbol2 = new SimpleFillSymbol();
        symbol2.fillStyle = "#1a9850";
        symbol2.strokeStyle = "#006837";
        item.symbol = symbol2;
        renderer.items.push(item);*/
        /*const renderer = new SimpleRenderer();
        renderer.symbol = new SimpleFillSymbol();*/

        featureLayer.renderer = renderer;
        featureLayer.zoom = [5, 20];
        featureLayer.on("click", (event) => {
            console.log(event.feature.properties["name"], "click");
        });
        featureLayer.on("mouseover", (event) => {
            console.log(event.feature.properties["name"], "mouse over");
        });
        featureLayer.on("mouseout", (event) => {
            console.log(event.feature.properties["name"], "mouse out");
        });
        map.insertLayer(featureLayer, 0);
        map.redraw();
    };
    req.open("GET", "assets/geojson/beijing.json", true);
    req.send(null);

    //beijing gugong
    const point = new Point(116.397411,39.909186);
    const feature = new Feature(point, {});
    const featureClass = new FeatureClass(GeometryType.Point);
    featureClass.addFeature(feature);
    const marker = new SimpleMarkerSymbol();
    marker.width = 32;
    marker.height = 32;
    marker.offsetX = -16;
    marker.offsetY = -32;
    marker.url = "assets/img/marker.svg";
    const featureLayer = new FeatureLayer();
    featureLayer.featureClass = featureClass;
    const renderer = new SimpleRenderer();
    renderer.symbol = marker;
    featureLayer.renderer = renderer;
    map.addLayer(featureLayer);

}
