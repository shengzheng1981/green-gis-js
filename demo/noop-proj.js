import {
    Map,
    GCJ02, NoopProjection,
    LatLngType,
    Point, GeometryType,
    Polyline,
    SimpleFillSymbol,
    FeatureClass,
    FeatureLayer,
    SimpleRenderer,
    CategoryRenderer,
    CategoryRendererItem,
    Field,
    Label,
    Tooltip,
    FieldType,
    Graphic,
    SimpleMarkerSymbol,
    Feature,
    SimpleTextSymbol,
    ArrowSymbol,
    SimplePointSymbol,
    GraphicLayer,
    SimpleLineSymbol, PointAnimation
} from "../dist";

window.load = () => {


    const map = new Map("foo", {disableInteractive: true, minZoom: 3});
    map.on("extent", (event) => {
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
    map.setProjection(new NoopProjection());
    //画经线
    const lngLayer = new GraphicLayer();
    map.addLayer(lngLayer);
    const lngSymbol = new SimpleLineSymbol();
    lngSymbol.strokeStyle = "#0000ff";
    for (let i = -900; i <= 900; i = i + 100){
        const line = new Polyline([[i, -500], [i, 500]]);
        const graphic = new Graphic(line, lngSymbol);
        lngLayer.add(graphic);
    }
    //画纬线
    const latLayer = new GraphicLayer();
    map.addLayer(latLayer);
    const latSymbol = new SimpleLineSymbol();
    latSymbol.strokeStyle = "#4d9221";
    for (let j = -500; j <= 500; j = j + 100){
        const line = new Polyline([[-900, j], [900, j]]);
        const graphic = new Graphic(line, latSymbol);
        latLayer.add(graphic);
    }
    //画经纬线交点
    const pointLayer = new GraphicLayer();
    map.addLayer(pointLayer);
    const pointSymbol = new SimplePointSymbol();
    pointSymbol.radius = 5;
    pointSymbol.fillStyle = "#de77ae";
    pointSymbol.strokeStyle = "#c51b7d";
    for (let i = -900; i <= 900; i = i + 100){
        for (let j = -500; j <= 500; j = j + 100){
            const point = new Point(i, j);
            const graphic = new Graphic(point, pointSymbol);
            pointLayer.add(graphic);
        }
    }

    const point = new Point(300, -100);
    const point2 = new Point(0, 200);
    const transparentSymbol = new SimplePointSymbol();
    transparentSymbol.radius = 20;
    transparentSymbol.fillStyle = "#00000000";
    transparentSymbol.strokeStyle = "#00000000";
    const feature = new Feature(point, {data: "你好\n第一次见到你\n你的面容\n一种久违的感觉\n原来是\n镜子\n你好！"}, transparentSymbol);
    const feature2 = new Feature(point2, {data: "等你\n一起\n建设社团\n建设自己\n莫愁前路无知己\n因为知己在这里\n你好！"}, transparentSymbol);
    const featureLayer = new FeatureLayer();
    featureLayer.featureClass = new FeatureClass(GeometryType.Point);
    featureLayer.featureClass.addFeature(feature);
    featureLayer.featureClass.addFeature(feature2);
    let timer;
    featureLayer.on("click", (event) => {
        const popup = document.getElementById("popup");
        popup.innerHTML = "";
        map.tooltip.show(popup, event.screenX, event.screenY, 320);
        const data = event.feature.properties["data"].split('');
        timer && clearTimeout(timer);
        const writing = (index) => {
            if (index < data.length) {
                if (data[index] == "\n") {
                    popup.innerHTML += "<br/>";
                } else {
                    popup.innerHTML += data[index];
                }
                timer = setTimeout(writing, 200, ++index);
            }
        }
        timer = writing(0);
    });

    map.addLayer(featureLayer);
    const animation = new PointAnimation(point);
    animation.radius = 40;
    animation.speed = 4;
    animation.color = "#ccc";
    animation.lineWidth = 3;
    animation.alpha = 0.8;
    map.addAnimation(animation);
    const animation2 = new PointAnimation(point2);
    animation2.radius = 40;
    animation2.speed = 4;
    animation2.color = "#ccc";
    animation2.lineWidth = 3;
    animation2.alpha = 0.8;
    map.addAnimation(animation2);

    map.setView([0, 0], 3);

}
