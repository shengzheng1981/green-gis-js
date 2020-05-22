import {Map} from "../dist/map.js";
import {Point} from "../dist/geometry/point.js";

const map = new Map("foo");
const point = new Point(100, 100);
point.addTo(map);

map.redraw();


//cause typescript tsc forget js suffix for geometry.js