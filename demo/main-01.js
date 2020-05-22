import {Map} from "../dist/map.js";
import {Point} from "../dist/geometry/point.js";
import {Graphic, SimpleMarkerSymbol} from "../dist/esm2015";
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


//cause typescript tsc forget js suffix for geometry.js