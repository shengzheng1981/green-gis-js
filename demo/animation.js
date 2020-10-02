
import {Map, Graphic, SimpleMarkerSymbol, Point, Polyline, PointAnimation, ParticleAnimation, LineAnimation} from "../dist";

window.load = async () => {
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
    map.setView([116.397411,39.909186], 12);
    const marker = new SimpleMarkerSymbol();
    marker.width = 32;
    marker.height = 32;
    marker.offsetX = -16;
    marker.offsetY = -32;
    marker.url = "assets/img/marker.svg";
    await marker.load();
    const point = new Point(116.397411,39.909186);
    const graphic = new Graphic(point, marker);
    map.addGraphic(graphic);

    /*const animation = new PointAnimation(point);
    animation.limit = 21;
    animation.velocity = 7;*/
    const animation = new PointAnimation(point);
    animation.radius = 40;
    animation.speed = 4;
    animation.alpha = 0.8;
    map.addAnimation(animation);

    const polyline1 = new Polyline([[116.397411,39.909186],[109.519, 18.271]]);
    const polyline2 = new Polyline([[116.397411,39.909186],[119.519, 18.271]]);
    const polyline3 = new Polyline([[116.397411,39.909186],[119.519, 48.271]]);
    const polyline4 = new Polyline([[116.397411,39.909186],[109.519, 48.271]]);
    const animation1 = new LineAnimation(polyline1);
    const animation2 = new LineAnimation(polyline2);
    const animation3 = new LineAnimation(polyline3);
    const animation4 = new LineAnimation(polyline4);
    map.addAnimation(animation1);
    map.addAnimation(animation2);
    map.addAnimation(animation3);
    map.addAnimation(animation4);
}

//cause typescript tsc forget js suffix for geometry.js