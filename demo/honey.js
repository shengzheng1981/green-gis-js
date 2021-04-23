import {
    Map,
    GCJ02, LatLngType,
    Point,
    Polyline,
    SimpleFillSymbol,
    FeatureClass,
    FeatureLayer,
    RasterLayer, Raster, InverseDistanceWeight,
    SimpleRenderer,
    CategoryRenderer,
    CategoryRendererItem,
    Field, Label, Tooltip,
    FieldType,
    Graphic, SimpleMarkerSymbol, Feature, SimpleTextSymbol, ArrowSymbol
} from "../dist";

window.load = async () => {
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
        //mapStyle: 'normal',
        mapStyle: 'amap://styles/1e65d329854a3cf61b568b7a4e2267fd',
        features: ['road', 'point', 'bg'],
        viewMode: '2D'
    });
    //const satellite = new AMap.TileLayer.Satellite();
    //satellite.setMap(amap);

    const map = new Map("foo");
    map.on("extent", (event) => {
        amap.setZoomAndCenter(event.zoom, event.center);
    });

/*    var req = new XMLHttpRequest();
    req.onload = (event) => {
        const featureClass = new FeatureClass();
        featureClass.loadGeoJSON(JSON.parse(req.responseText));
        const featureLayer = new FeatureLayer();
        featureLayer.featureClass = featureClass;
        const renderer = new SimpleRenderer();
        featureLayer.renderer = renderer;
        featureLayer.zoom = [10, 20];

        const field = new Field();
        field.name = "DEPTH";
        const idw = new InverseDistanceWeight();
        idw.honey = true;
        idw.honeySide = 40;
        idw.honeyColor = "#00ffff";
        idw.generate(featureClass, field);
        const rasterLayer = new RasterLayer();
        rasterLayer.raster = idw;
        //map.addLayer(rasterLayer);

        map.addLayer(featureLayer);

        map.setView([109.519, 18.271], 13);
    };
    req.open("GET", "assets/geojson/sensor.json", true);
    req.send(null);*/

    try {
        let response = await fetch("assets/geojson/sensor.json");
        let data = await response.json();
        const featureClass = new FeatureClass();
        featureClass.loadGeoJSON(data);
        const featureLayer = new FeatureLayer();
        featureLayer.featureClass = featureClass;
        const renderer = new SimpleRenderer();
        featureLayer.renderer = renderer;
        featureLayer.zoom = [10, 20];

        const field = new Field();
        field.name = "DEPTH";
        const idw = new InverseDistanceWeight();
        idw.honey = true;
        idw.honeySide = 40;
        idw.honeyColor = "#00ffff";
        idw.generate(featureClass, field);
        const rasterLayer = new RasterLayer();
        rasterLayer.raster = idw;
        map.addLayer(rasterLayer);

        map.addLayer(featureLayer);

        map.setView([109.519, 18.271], 13);
        console.log(data);
    } catch(e) {
        console.log("Oops, error", e);
    }

}
