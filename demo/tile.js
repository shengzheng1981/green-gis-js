
import {Map, Graphic, SimpleMarkerSymbol, Point, Polyline, SimpleLineSymbol, BD09, GCJ02, LatLngType, Tile} from "../dist";

window.load = async () => {
    /*const amap = new AMap.Map("amap", {
        navigationMode: 'classic',
        zooms: [1, 20],
        mapStyle: 'amap://styles/normal',
        features: ['road', 'point', 'bg'],
        viewMode: '2D'
    });*/

    const map = new Map("foo");
    map.on("extent", (event) => {
        //amap.setZoomAndCenter(event.zoom, event.center, true);
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
    //map.setTileUrl("https://a.tile.openstreetmap.org/{z}/{x}/{y}.png");
    //map.setTileUrl("http://wprd01.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7");
    map.setTileUrl("http://localhost:4014/tiles/{z}/{x}/{y}.png");
    map.setView([108.8297880158,34.1988763951], 12);
    const marker = new SimpleMarkerSymbol();
    marker.width = 32;
    marker.height = 32;
    marker.offsetX = -16;
    marker.offsetY = -32;
    marker.url = "assets/img/marker.svg";
    await marker.load();
    const point = new Point(108.8297880158,34.1988763951);
    const graphic = new Graphic(point, marker);
    map.addGraphic(graphic);
}

//cause typescript tsc forget js suffix for geometry.js