import {
    Map,
    Point, Feature,
    FeatureClass,
    FeatureLayer,
    SimpleRenderer,
    Label, SimpleTextSymbol, CoverCollision, SimpleMarkerSymbol,
    Field,
    FieldType,
    GeometryType,
    ClusterType,
    GridCluster
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
        mapStyle: 'normal',
        features: ['road', 'point', 'bg'],
        viewMode: '2D'
    });

    const map = new Map("foo");
    map.on("extent", (event) => {
        amap.setZoomAndCenter(event.zoom, event.center);
    });

    //随机生成点数据
    const random = (lng, lat) => {
        return [lng + Math.random() - 0.5, lat + Math.random() - 0.5];
    };
    const featureClass = new FeatureClass(GeometryType.Point);
    const field = new Field();
    field.name = "name";
    field.type = FieldType.String;
    featureClass.addField(field)
    for (let i = 0; i < 100000; i++) {
        const lnglat = random(109.519, 18.271);
        const point = new Point(lnglat[0], lnglat[1]);
        const feature = new Feature(point, {name: "标注" + i});
        featureClass.addFeature(feature);
    }
    const featureLayer = new FeatureLayer();
    featureLayer.featureClass = featureClass;
    const renderer = new SimpleRenderer();
    const marker = new SimpleMarkerSymbol();
    marker.width = 32;
    marker.height = 32;
    marker.offsetX = -16;
    marker.offsetY = -32;
    marker.url = "assets/img/marker.svg";
    await marker.load();
    renderer.symbol = marker;
    featureLayer.cluster = true;
    featureLayer.clusterType = ClusterType.Thinning;
    featureLayer.clusterMethod = new GridCluster();
    featureLayer.renderer = renderer;

    const label = new Label();
    const symbol = new SimpleTextSymbol();
    symbol.pointSymbolWidth = 12;     //diameter
    symbol.pointSymbolHeight = 12;   //diameter
    symbol.auto = true;
    label.field = field;
    label.symbol = symbol;
    label.collision = new CoverCollision();
    //featureLayer.label = label;
    //featureLayer.labeled = true;

    featureLayer.zoom = [5, 20];
    map.addLayer(featureLayer);

    map.setView([109.519, 18.271], 13);

}
