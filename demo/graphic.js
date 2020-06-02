import {Map, Point, Polyline, Graphic, SimpleLineSymbol, SimplePointSymbol, SimpleMarkerSymbol, GraphicLayer} from "../dist";

var AMap = window.AMap;

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
    map.setView([116.397411,39.909186], 12);

    //画经线
    const lngSymbol = new SimpleLineSymbol();
    lngSymbol.strokeStyle = "#0000ff";
    for (let i = -180; i <= 180; i = i + 10){
        const line = new Polyline([[i, -80], [i, 80]]);
        const graphic = new Graphic(line, lngSymbol);
        map.addGraphic(graphic);
    }
    //画纬线
    const latSymbol = new SimpleLineSymbol();
    lngSymbol.strokeStyle = "#4d9221";
    for (let j = -80; j <= 80; j = j + 10){
        const line = new Polyline([[-180, j], [180, j]]);
        const graphic = new Graphic(line, latSymbol);
        map.addGraphic(graphic);
    }
    //画经纬线交点
    const pointSymbol = new SimplePointSymbol();
    pointSymbol.radius = 5;
    pointSymbol.fillStyle = "#de77ae";
    pointSymbol.strokeStyle = "#c51b7d";
    for (let i = -180; i <= 180; i = i + 10){
        for (let j = -90; j <= 90; j = j + 10){
            const point = new Point(i, j);
            const graphic = new Graphic(point, pointSymbol);
            map.addGraphic(graphic);
        }
    }
    //beijing gugong
    const marker = new SimpleMarkerSymbol();
    marker.width = 32;
    marker.height = 32;
    marker.offsetX = -16;
    marker.offsetY = -32;
    marker.url = "assets/img/marker.svg";
    const point = new Point(116.397411,39.909186);
    const graphic = new Graphic(point, marker);
    map.addGraphic(graphic);

}
