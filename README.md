# Green GIS JS API
Green GIS JS API is a lite GIS JS API based on Canvas API. Currently, this API only implement basic functions, so it can only be used by learning and researching! But, you can use it in a simple APP! Have fun!
Demo: [https://green.ispongecity.com](https://green.ispongecity.com)

## Functions & Boundary
0. **Only Support Canvas! NO SVG!**
1. Map basic functions, such as zoom in/zoom out/pan; Next: extent stacks;
2. Projection, **only support web mercator (3857)**, so can be integrated with all kinds of web maps, such as google map/amap(aka gaode);
3. Geometry, **only support simple point/line/polygon**, no multiple and no ring, but you can implement by yourself;
4. Symbol, **only simple point/line/fill symbol**, also you can extend;
5. Graphic, Geometry + Symbol = Graphic;
6. Feature, Geometry + Properties = Feature;
7. Layer, Graphic can managed by GraphicLayer, Feature can managed by FeatureClass, FeatureLayer is a view for FeatureClass;
8. Data, **only support geojson**, FeatureClass is designed to load geojson and managed fields;
9. Renderer, now SimpleRenderer and CategoryRenderer; Next: ClassRenderer;
10.Module, **only support ESM2015**, no bundle, no umd/cmd/amd...

## Usage & Demo
1. Basic Map
```
//foo is a canvas
const map = new Map("foo");
map.setView([116.397411,39.909186], 12);
const marker = new SimpleMarkerSymbol();
marker.width = 32;
marker.height = 32;
marker.offsetX = 16;
marker.offsetY = 32;
marker.url = "assets/img/marker.svg";
const point = new Point(116.397411,39.909186);
const graphic = new Graphic(point, marker);
map.addGraphic(graphic);
```

2. Graphic Layer
```
//foo is a canvas
const map = new Map("foo");
map.setView([116.397411,39.909186], 12);
//lng line 画经线
const lngLayer = new GraphicLayer();
const lngSymbol = new SimpleLineSymbol();
lngSymbol.strokeStyle = "#0000ff";
for (let i = -180; i <= 180; i = i + 10){
    const line = new Polyline([[i, -80], [i, 80]]);
    const graphic = new Graphic(line, lngSymbol);
    lngLayer.add(graphic);
}
map.addLayer(lngLayer);
//lat line 画纬线
const latLayer = new GraphicLayer();
const latSymbol = new SimpleLineSymbol();
lngSymbol.strokeStyle = "#4d9221";
for (let j = -80; j <= 80; j = j + 10){
    const line = new Polyline([[-180, j], [180, j]]);
    const graphic = new Graphic(line, latSymbol);
    latLayer.add(graphic);
}
map.addLayer(latLayer);
//lng lat intersect 画经纬线交点
const pointLayer = new GraphicLayer();
const pointSymbol = new SimplePointSymbol();
pointSymbol.radius = 5;
pointSymbol.fillStyle = "#de77ae";
pointSymbol.strokeStyle = "#c51b7d";
for (let i = -180; i <= 180; i = i + 10){
    for (let j = -90; j <= 90; j = j + 10){
        const point = new Point(i, j);
        const graphic = new Graphic(point, pointSymbol);
        pointLayer.add(graphic);
    }
}
map.addLayer(pointLayer);
```

3. Feature Layer
```
//foo is a canvas
const map = new Map("foo");
map.setView([107.411, 29.89], 7);
var req = new XMLHttpRequest();
req.onload = (event) => {
    const featureClass = new FeatureClass();
    featureClass.loadGeoJSON(JSON.parse(req.responseText));
    const featureLayer = new FeatureLayer();
    featureLayer.featureClass = featureClass;
    const field = new Field();
    field.name = "name";
    field.type = FieldType.String;
    const renderer = new CategoryRenderer();
    renderer.generate(featureClass, field);
        /*const renderer = new SimpleRenderer();
        renderer.symbol = new SimpleFillSymbol();*/
    featureLayer.renderer = renderer;
    featureLayer.zoom = [5, 20];
    featureLayer.on("click", (event) => {
        console.log(event.feature.properties["name"], "click");
    });
    featureLayer.on("mouseover", (event) => {
        console.log(event.feature.properties["name"], "mouse over");
    });
    featureLayer.on("mouseover", (event) => {
        console.log(event.feature.properties["name"], "mouse out");
    });
    map.addLayer(featureLayer);
};
req.open("GET", "assets/geojson/chongqing.json", true);
req.send(null);
```

4. AMap Integrated
```
//amap is a div, foo is a canvas
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
map.setView([107.411, 29.89], 7);
```

## Blog & Article
More Sample And Information: [Re-learning GIS](https://zhuanlan.zhihu.com/c_165676639) .

## License
[MIT](LICENSE) © Sheng Zheng