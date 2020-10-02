
import {Map, Graphic, SimpleMarkerSymbol, Point, Polyline, Polygon, SimpleLineSymbol, BD09, GCJ02, LatLngType} from "../dist";

window.load = async () => {
    const amap = new AMap.Map("amap", {
        animateEnable: true,
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
    map.setView([116.397411,39.909186], 12.5);
    //map.setProjection(new GCJ02(LatLngType.GPS));
    const point = new Point(116.397411,39.909186);
    map.addSelection(point);

    const polyline = new Polyline([[115.397411,39.909186],[116.397411, 39.909186]]);
    map.addSelection(polyline);

    const polygon = new Polygon([[[115.397411, 39.909186],[115.397411, 40.5],[116.397411, 40.5],[116.397411,  39.909186]]]);
    map.addSelection(polygon);
}

//cause typescript tsc forget js suffix for geometry.js