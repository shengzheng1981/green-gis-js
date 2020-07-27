import {Map, Point, Polyline, Graphic, Feature, SimpleLineSymbol, SimplePointSymbol, SimpleMarkerSymbol, GraphicLayer, FeatureLayer, GeometryType, FeatureClass, SimpleRenderer} from "../dist";

var AMap = window.AMap;

window.load = () => {

    const amap = new AMap.Map("amap", {
        navigationMode: 'classic',
        zooms: [1, 20],
        mapStyle: 'amap://styles/normal',
        features: ['road', 'point', 'bg'],
        viewMode: '2D'
    });

    const map = new Map("foo");
    map.on("extent", (event) => {
        amap.setZoomAndCenter(event.zoom, event.center, true);
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

    //画经纬线交点
    const featureLayer = new FeatureLayer();
    featureLayer.featureClass = new FeatureClass(GeometryType.Point);
    map.addLayer(featureLayer);
    const pointSymbol = new SimplePointSymbol();
    pointSymbol.radius = 5;
    pointSymbol.fillStyle = "#de77ae";
    pointSymbol.strokeStyle = "#c51b7d";
    const renderer = new SimpleRenderer();
    renderer.symbol = pointSymbol;
    featureLayer.renderer = renderer;

    const pointSymbol2 = new SimplePointSymbol();
    pointSymbol2.radius = 5;
    pointSymbol2.fillStyle = "#00ffff88";
    pointSymbol2.strokeStyle = "#00ffff";
    for (let i = -180; i <= 180; i = i + 10){
        for (let j = -90; j <= 90; j = j + 10){
            const point = new Point(i, j);
            const graphic = new Graphic(point, pointSymbol2);
            const feature = new Feature(point, {});
            map.addGraphic(graphic);
            featureLayer.featureClass.addFeature(feature);
        }
    }

    map.setView([116.397411,39.909186], 12);

}
