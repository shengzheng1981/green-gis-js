import {Map, Point, Polyline, Graphic, Feature, SimpleLineSymbol, SimplePointSymbol, GradientPointSymbol, SimpleMarkerSymbol, GraphicLayer, FeatureLayer, GeometryType, FeatureClass, SimpleRenderer, NoopProjection, Bound} from "../dist";
import {ImageLayer} from './image-layer-class';
window.load = async () => {

 
    const map = new Map("foo");
    const projection = new NoopProjection();
    projection.bound = new Bound(0, 0, 512, 512);
    map.setProjection(projection);
    map.minZoom = 1;
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

    new ImageLayer(map, 'assets/img/bg.jpg', 1920, 1080);
    
    const marker = new SimpleMarkerSymbol();
    marker.width = 32;
    marker.height = 32;
    marker.offsetX = -16;
    marker.offsetY = -32;
    marker.url = "assets/img/marker.svg";
    await marker.load();
    const point = new Point(100,50);
    const graphic = new Graphic(point, marker);
    map.addGraphic(graphic);

    
    map.setView([0,0], 1);
}
