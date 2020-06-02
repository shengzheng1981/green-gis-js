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
    FieldType,
    Graphic, SimpleMarkerSymbol, Feature
} from "../dist";

window.load = () => {
    const gmap = new google.maps.Map(document.getElementById('gmap'), {
        disableDefaultUI: true,
        gestureHandling: "none",
        scrollwheel: false
    });

    const map = new Map("foo");
    map.on("extent", (event) => {
        gmap.setZoom(event.zoom);
        gmap.setCenter({lat: event.center[1], lng: event.center[0]});
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
    map.setView([116.327158, 39.990912], 16);

    //五道口 华清嘉园
    const point = new Point(116.327158, 39.990912);
    const feature = new Feature(point, {});
    const featureClass = new FeatureClass();
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
