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


    const map = new Map("foo");
    map.setProjection(new NoopProjection());
    //画网格线
    const xLayer = new GraphicLayer();
    map.addLayer(xLayer);
    const lngSymbol = new SimpleLineSymbol();
    lngSymbol.strokeStyle = "#0000ff";
    for (let i = -900; i <= 900; i = i + 100){
        const line = new Polyline([[i, -500], [i, 500]]);
        const graphic = new Graphic(line, lngSymbol);
        xLayer.add(graphic);
    }
    //画网格线
    const yLayer = new GraphicLayer();
    map.addLayer(yLayer);
    const latSymbol = new SimpleLineSymbol();
    latSymbol.strokeStyle = "#4d9221";
    for (let j = -500; j <= 500; j = j + 100){
        const line = new Polyline([[-900, j], [900, j]]);
        const graphic = new Graphic(line, latSymbol);
        yLayer.add(graphic);
    }
    //画原点
    const pointLayer = new GraphicLayer();
    map.addLayer(pointLayer);
    const pointSymbol = new SimplePointSymbol();
    pointSymbol.radius = 10;
    pointSymbol.fillStyle = "#de77ae";
    pointSymbol.strokeStyle = "#c51b7d";
    const point = new Point(0, 0);
    const graphic = new Graphic(point, pointSymbol);
    pointLayer.add(graphic);

    //画XY轴
    const arrowSymbol = new ArrowSymbol();

    const axisLayer = new GraphicLayer();
    map.addLayer(axisLayer);
    const xLine = new Polyline([[-1000, 0], [1000, 0]]);
    const xAxis = new Graphic(xLine, arrowSymbol);
    axisLayer.add(xAxis);
    const yLine = new Polyline([[0, -600], [0, 600]]);
    const yAxis = new Graphic(yLine, arrowSymbol);
    axisLayer.add(yAxis);

    map.setView([0, 0], 3);

}
