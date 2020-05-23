/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./main-03.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../dist/data/feature-class.js":
/*!*************************************!*\
  !*** ../dist/data/feature-class.js ***!
  \*************************************/
/*! exports provided: FeatureClass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeatureClass", function() { return FeatureClass; });
/* harmony import */ var _element_feature__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../element/feature */ "../dist/element/feature.js");
/* harmony import */ var _geometry_geometry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../geometry/geometry */ "../dist/geometry/geometry.js");
/* harmony import */ var _geometry_point__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../geometry/point */ "../dist/geometry/point.js");
/* harmony import */ var _geometry_polyline__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../geometry/polyline */ "../dist/geometry/polyline.js");
/* harmony import */ var _geometry_polygon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../geometry/polygon */ "../dist/geometry/polygon.js");





class FeatureClass {
    constructor() {
        this._fields = [];
        this._features = [];
    }
    get type() {
        return this._type;
    }
    get features() {
        return this._features;
    }
    get fields() {
        return this._fields;
    }
    addFeature(feature) {
        this._features.push(feature);
    }
    removeFeature(feature) {
        const index = this._features.findIndex(item => item === feature);
        index != -1 && this._features.splice(index, 1);
    }
    clearFeatures() {
        this._features = [];
    }
    addField(field) {
        this._fields.push(field);
    }
    removeField(field) {
        const index = this._fields.findIndex(item => item === field);
        index != -1 && this._fields.splice(index, 1);
    }
    clearFields() {
        this._fields = [];
    }
    //TODO: multiple point line polygon is not supported
    loadGeoJSON(data) {
        Array.isArray(data.features) && data.features.forEach(item => {
            switch (item.geometry.type) {
                case "Point":
                    //TODO: ridiculous
                    this._type = _geometry_geometry__WEBPACK_IMPORTED_MODULE_1__["GeometryType"].Point;
                    const point = new _geometry_point__WEBPACK_IMPORTED_MODULE_2__["Point"](item.geometry.coordinates[0], item.geometry.coordinates[1]);
                    this._features.push(new _element_feature__WEBPACK_IMPORTED_MODULE_0__["Feature"](point, item.properties));
                    break;
                case "LineString":
                    this._type = _geometry_geometry__WEBPACK_IMPORTED_MODULE_1__["GeometryType"].Polyline;
                    const polyline = new _geometry_polyline__WEBPACK_IMPORTED_MODULE_3__["Polyline"](item.geometry.coordinates);
                    this._features.push(new _element_feature__WEBPACK_IMPORTED_MODULE_0__["Feature"](polyline, item.properties));
                    break;
                case "Polygon":
                    this._type = _geometry_geometry__WEBPACK_IMPORTED_MODULE_1__["GeometryType"].Polygon;
                    const polygon = new _geometry_polygon__WEBPACK_IMPORTED_MODULE_4__["Polygon"](item.geometry.coordinates);
                    this._features.push(new _element_feature__WEBPACK_IMPORTED_MODULE_0__["Feature"](polygon, item.properties));
                    break;
            }
        });
    }
}


/***/ }),

/***/ "../dist/data/field.js":
/*!*****************************!*\
  !*** ../dist/data/field.js ***!
  \*****************************/
/*! exports provided: FieldType, Field */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FieldType", function() { return FieldType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Field", function() { return Field; });
var FieldType;
(function (FieldType) {
    FieldType[FieldType["String"] = 0] = "String";
    FieldType[FieldType["Number"] = 1] = "Number";
})(FieldType || (FieldType = {}));
class Field {
}


/***/ }),

/***/ "../dist/element/feature.js":
/*!**********************************!*\
  !*** ../dist/element/feature.js ***!
  \**********************************/
/*! exports provided: Feature */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Feature", function() { return Feature; });
/* harmony import */ var _symbol_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../symbol/symbol */ "../dist/symbol/symbol.js");
/* harmony import */ var _projection_web_mecator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../projection/web-mecator */ "../dist/projection/web-mecator.js");


class Feature {
    constructor(geometry, properties) {
        //要素事件的handlers
        this._events = {
            "click": [],
            "mouseover": [],
            "mouseout": [] //鼠标退出
        };
        this.visible = true;
        this._geometry = geometry;
        this._properties = properties;
    }
    get properties() {
        return this._properties;
    }
    get bound() {
        return this._geometry ? this._geometry.bound : null;
    }
    //地图事件注册监听
    on(event, handler) {
        this._events[event].push(handler);
    }
    off(event, handler) {
        if (Array.isArray(this._events[event])) {
            const index = this._events[event].findIndex(item => item === handler);
            index != -1 && this._events[event].splice(index, 1);
        }
    }
    emit(event, param) {
        this._events[event].forEach(handler => handler(param));
    }
    draw(ctx, projection = new _projection_web_mecator__WEBPACK_IMPORTED_MODULE_1__["WebMecator"](), extent = projection.bound, symbol = new _symbol_symbol__WEBPACK_IMPORTED_MODULE_0__["SimplePointSymbol"]()) {
        if (this.visible)
            this._geometry.draw(ctx, projection, extent, symbol);
    }
    intersect(projection = new _projection_web_mecator__WEBPACK_IMPORTED_MODULE_1__["WebMecator"](), extent = projection.bound) {
        if (this.visible)
            return this._geometry.intersect(projection, extent);
    }
    contain(screenX, screenY, event = undefined) {
        if (this.visible) {
            const flag = this._geometry.contain(screenX, screenY);
            if (event == "mousemove") {
                if (!this._contained && flag) {
                    this._events.mouseover.forEach(handler => handler({ feature: this, screenX: screenX, screenY: screenY }));
                }
                else if (this._contained && !flag) {
                    this._events.mouseout.forEach(handler => handler({ feature: this, screenX: screenX, screenY: screenY }));
                }
            }
            else if (event == "click") {
                if (flag)
                    this._events.click.forEach(handler => handler({ feature: this, screenX: screenX, screenY: screenY }));
            }
            this._contained = flag;
            return flag;
        }
    }
}


/***/ }),

/***/ "../dist/element/graphic.js":
/*!**********************************!*\
  !*** ../dist/element/graphic.js ***!
  \**********************************/
/*! exports provided: Graphic */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Graphic", function() { return Graphic; });
/* harmony import */ var _projection_web_mecator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../projection/web-mecator */ "../dist/projection/web-mecator.js");

class Graphic {
    constructor(geometry, symbol) {
        this.visible = true;
        this._geometry = geometry;
        this._symbol = symbol;
    }
    get bound() {
        return this._geometry ? this._geometry.bound : null;
    }
    draw(ctx, projection = new _projection_web_mecator__WEBPACK_IMPORTED_MODULE_0__["WebMecator"](), extent = projection.bound) {
        if (this.visible)
            this._geometry.draw(ctx, projection, extent, this._symbol);
    }
}


/***/ }),

/***/ "../dist/entity.js":
/*!*************************!*\
  !*** ../dist/entity.js ***!
  \*************************/
/*! exports provided: Entity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Entity", function() { return Entity; });
//实体基类
class Entity {
    constructor() {
        this._id = null;
        this.create();
    }
    get ID() {
        return this._id;
    }
    toString() {
        return this._id;
    }
    print() {
        Object.keys(this).forEach(property => {
            console.log(property + ": " + this[property]);
        });
    }
    create() {
        const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        this._id = timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
            return (Math.random() * 16 | 0).toString(16);
        }).toLowerCase();
    }
}


/***/ }),

/***/ "../dist/geometry/geometry.js":
/*!************************************!*\
  !*** ../dist/geometry/geometry.js ***!
  \************************************/
/*! exports provided: GeometryType, Geometry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeometryType", function() { return GeometryType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Geometry", function() { return Geometry; });
/* harmony import */ var _symbol_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../symbol/symbol */ "../dist/symbol/symbol.js");
/* harmony import */ var _projection_web_mecator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../projection/web-mecator */ "../dist/projection/web-mecator.js");


var GeometryType;
(function (GeometryType) {
    GeometryType[GeometryType["Point"] = 0] = "Point";
    GeometryType[GeometryType["Polyline"] = 1] = "Polyline";
    GeometryType[GeometryType["Polygon"] = 2] = "Polygon";
})(GeometryType || (GeometryType = {}));
class Geometry {
    get bound() {
        return this._bound;
    }
    project(projection) { }
    ;
    draw(ctx, projection = new _projection_web_mecator__WEBPACK_IMPORTED_MODULE_1__["WebMecator"](), extent = projection.bound, symbol = new _symbol_symbol__WEBPACK_IMPORTED_MODULE_0__["SimplePointSymbol"]()) { }
    ;
    contain(screenX, screenY) { return false; }
    intersect(projection = new _projection_web_mecator__WEBPACK_IMPORTED_MODULE_1__["WebMecator"](), extent = projection.bound) {
        if (!this._projected)
            this.project(projection);
        return extent.intersect(this._bound);
    }
}


/***/ }),

/***/ "../dist/geometry/point.js":
/*!*********************************!*\
  !*** ../dist/geometry/point.js ***!
  \*********************************/
/*! exports provided: Point */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Point", function() { return Point; });
/* harmony import */ var _geometry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./geometry */ "../dist/geometry/geometry.js");
/* harmony import */ var _util_bound__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/bound */ "../dist/util/bound.js");
/* harmony import */ var _symbol_symbol__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../symbol/symbol */ "../dist/symbol/symbol.js");
/* harmony import */ var _projection_web_mecator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../projection/web-mecator */ "../dist/projection/web-mecator.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




//点
class Point extends _geometry__WEBPACK_IMPORTED_MODULE_0__["Geometry"] {
    constructor(lng, lat) {
        super();
        this._lng = lng;
        this._lat = lat;
    }
    ;
    project(projection) {
        this._projection = projection;
        [this._x, this._y] = this._projection.project([this._lng, this._lat]);
        //TODO: bound tolerance
        this._bound = new _util_bound__WEBPACK_IMPORTED_MODULE_1__["Bound"](this._x, this._y, this._x, this._y);
        this._projected = true;
    }
    draw(ctx, projection = new _projection_web_mecator__WEBPACK_IMPORTED_MODULE_3__["WebMecator"](), extent = projection.bound, symbol = new _symbol_symbol__WEBPACK_IMPORTED_MODULE_2__["SimplePointSymbol"]()) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._projected)
                this.project(projection);
            if (!extent.intersect(this._bound))
                return;
            ctx.save();
            const matrix = ctx.getTransform();
            this._screenX = (matrix.a * this._x + matrix.e);
            this._screenY = (matrix.d * this._y + matrix.f);
            this._symbol = symbol;
            if (symbol instanceof _symbol_symbol__WEBPACK_IMPORTED_MODULE_2__["SimplePointSymbol"]) {
                ctx.strokeStyle = symbol.strokeStyle;
                ctx.fillStyle = symbol.fillStyle;
                ctx.lineWidth = symbol.lineWidth;
                ctx.beginPath(); //Start path
                //keep size
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.arc(this._screenX, this._screenY, symbol.radius, 0, Math.PI * 2, true);
                ctx.fill();
                ctx.stroke();
            }
            else if (symbol instanceof _symbol_symbol__WEBPACK_IMPORTED_MODULE_2__["SimpleMarkerSymbol"]) {
                const marker = symbol;
                if (!marker.loaded)
                    yield marker.load();
                if (marker.icon) {
                    const matrix = ctx.getTransform();
                    //keep size
                    ctx.setTransform(1, 0, 0, 1, 0, 0);
                    ctx.drawImage(marker.icon, this._screenX - marker.offsetX, this._screenY - marker.offsetY, marker.width, marker.height);
                }
            }
            ctx.restore();
        });
    }
    ;
    contain(screenX, screenY) {
        if (this._symbol instanceof _symbol_symbol__WEBPACK_IMPORTED_MODULE_2__["SimplePointSymbol"]) {
            return Math.sqrt((this._screenX - screenX) * (this._screenX - screenX) + (this._screenY - screenY) * (this._screenY - screenY)) <= this._symbol.radius;
        }
        else if (this._symbol instanceof _symbol_symbol__WEBPACK_IMPORTED_MODULE_2__["SimpleMarkerSymbol"]) {
            return screenX >= (this._screenX - this._symbol.offsetX) && screenX <= (this._screenX - this._symbol.offsetX + this._symbol.width) && screenY >= (this._screenY - this._symbol.offsetY) && screenY <= (this._screenY - this._symbol.offsetY + this._symbol.height);
        }
    }
}
//interaction: hover && identify
Point.TOLERANCE = 0; //screen pixel


/***/ }),

/***/ "../dist/geometry/polygon.js":
/*!***********************************!*\
  !*** ../dist/geometry/polygon.js ***!
  \***********************************/
/*! exports provided: Polygon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Polygon", function() { return Polygon; });
/* harmony import */ var _geometry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./geometry */ "../dist/geometry/geometry.js");
/* harmony import */ var _util_bound__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/bound */ "../dist/util/bound.js");
/* harmony import */ var _symbol_symbol__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../symbol/symbol */ "../dist/symbol/symbol.js");
/* harmony import */ var _projection_web_mecator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../projection/web-mecator */ "../dist/projection/web-mecator.js");




//面
class Polygon extends _geometry__WEBPACK_IMPORTED_MODULE_0__["Geometry"] {
    constructor(lnglats) {
        super();
        this._lnglats = lnglats;
    }
    ;
    project(projection) {
        this._projection = projection;
        this._coordinates = this._lnglats.map((ring) => ring.map((point) => this._projection.project(point)));
        let xmin = Number.MAX_VALUE, ymin = Number.MAX_VALUE, xmax = -Number.MAX_VALUE, ymax = -Number.MAX_VALUE;
        this._coordinates.forEach(ring => {
            ring.forEach(point => {
                xmin = Math.min(xmin, point[0]);
                ymin = Math.min(ymin, point[1]);
                xmax = Math.max(xmax, point[0]);
                ymax = Math.max(ymax, point[1]);
            });
        });
        this._bound = new _util_bound__WEBPACK_IMPORTED_MODULE_1__["Bound"](xmin, ymin, xmax, ymax);
    }
    draw(ctx, projection = new _projection_web_mecator__WEBPACK_IMPORTED_MODULE_3__["WebMecator"](), extent = projection.bound, symbol = new _symbol_symbol__WEBPACK_IMPORTED_MODULE_2__["SimpleFillSymbol"]()) {
        if (!this._projected)
            this.project(projection);
        if (!extent.intersect(this._bound))
            return;
        ctx.save();
        ctx.strokeStyle = symbol.strokeStyle;
        ctx.fillStyle = symbol.fillStyle;
        ctx.lineWidth = symbol.lineWidth;
        const matrix = ctx.getTransform();
        //keep lineWidth
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        //TODO:  exceeding the maximum extent(bound), best way is overlap by extent. find out: maximum is [-PI*R, PI*R]??
        //TODO:  ring is not supported
        this._screen = [];
        this._coordinates.forEach(ring => {
            ctx.beginPath();
            const temp = [];
            this._screen.push(temp);
            ring.forEach((point, index) => {
                const screenX = (matrix.a * point[0] + matrix.e), screenY = (matrix.d * point[1] + matrix.f);
                if (index === 0) {
                    ctx.moveTo(screenX, screenY);
                }
                else {
                    ctx.lineTo(screenX, screenY);
                }
                temp.push([screenX, screenY]);
            });
            ctx.closePath();
        });
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
    contain(screenX, screenY) {
        //TODO: ring is not supported
        return this._screen.some(ring => this._pointInPolygon([screenX, screenY], ring));
    }
    //from https://github.com/substack/point-in-polygon
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    _pointInPolygon(point, vs) {
        let x = point[0], y = point[1];
        let inside = false;
        for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            let xi = vs[i][0], yi = vs[i][1];
            let xj = vs[j][0], yj = vs[j][1];
            let intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect)
                inside = !inside;
        }
        return inside;
    }
    ;
}


/***/ }),

/***/ "../dist/geometry/polyline.js":
/*!************************************!*\
  !*** ../dist/geometry/polyline.js ***!
  \************************************/
/*! exports provided: Polyline */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Polyline", function() { return Polyline; });
/* harmony import */ var _geometry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./geometry */ "../dist/geometry/geometry.js");
/* harmony import */ var _util_bound__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/bound */ "../dist/util/bound.js");
/* harmony import */ var _symbol_symbol__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../symbol/symbol */ "../dist/symbol/symbol.js");
/* harmony import */ var _projection_web_mecator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../projection/web-mecator */ "../dist/projection/web-mecator.js");




//线
class Polyline extends _geometry__WEBPACK_IMPORTED_MODULE_0__["Geometry"] {
    constructor(lnglats) {
        super();
        this._tolerance = 4; //TOLERANCE + symbol.lineWidth
        this._lnglats = lnglats;
    }
    ;
    project(projection) {
        this._projection = projection;
        this._coordinates = this._lnglats.map((point) => this._projection.project(point));
        let xmin = Number.MAX_VALUE, ymin = Number.MAX_VALUE, xmax = -Number.MAX_VALUE, ymax = -Number.MAX_VALUE;
        this._coordinates.forEach(point => {
            xmin = Math.min(xmin, point[0]);
            ymin = Math.min(ymin, point[1]);
            xmax = Math.max(xmax, point[0]);
            ymax = Math.max(ymax, point[1]);
        });
        this._bound = new _util_bound__WEBPACK_IMPORTED_MODULE_1__["Bound"](xmin, ymin, xmax, ymax);
    }
    draw(ctx, projection = new _projection_web_mecator__WEBPACK_IMPORTED_MODULE_3__["WebMecator"](), extent = projection.bound, symbol = new _symbol_symbol__WEBPACK_IMPORTED_MODULE_2__["SimpleLineSymbol"]()) {
        if (!this._projected)
            this.project(projection);
        if (!extent.intersect(this._bound))
            return;
        ctx.save();
        ctx.strokeStyle = symbol.strokeStyle;
        ctx.lineWidth = symbol.lineWidth;
        this._tolerance = Polyline.TOLERANCE + symbol.lineWidth;
        ctx.beginPath();
        const matrix = ctx.getTransform();
        //keep lineWidth
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        //TODO:  exceeding the maximum extent(bound), best way is overlap by extent. find out: maximum is [-PI*R, PI*R]??
        this._screen = [];
        this._coordinates.forEach((point, index) => {
            const screenX = (matrix.a * point[0] + matrix.e), screenY = (matrix.d * point[1] + matrix.f);
            if (index === 0) {
                ctx.moveTo(screenX, screenY);
            }
            else {
                ctx.lineTo(screenX, screenY);
            }
            this._screen.push([screenX, screenY]);
        });
        ctx.stroke();
        ctx.restore();
    }
    contain(screenX, screenY) {
        let p2;
        const distance = this._screen.reduce((acc, cur) => {
            if (p2) {
                const p1 = p2;
                p2 = cur;
                return Math.min(acc, this._distanceToSegment([screenX, screenY], p1, p2));
            }
            else {
                p2 = cur;
                return acc;
            }
        }, Number.MAX_VALUE);
        return distance <= this._tolerance;
    }
    //from Leaflet
    _distanceToSegment(p, p1, p2) {
        let x = p1[0], y = p1[1], dx = p2[0] - x, dy = p2[1] - y, dot = dx * dx + dy * dy, t;
        if (dot > 0) {
            t = ((p[0] - x) * dx + (p[1] - y) * dy) / dot;
            if (t > 1) {
                x = p2[0];
                y = p2[1];
            }
            else if (t > 0) {
                x += dx * t;
                y += dy * t;
            }
        }
        dx = p[0] - x;
        dy = p[1] - y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
//interaction: hover && identify
Polyline.TOLERANCE = 4; //screen pixel


/***/ }),

/***/ "../dist/index.js":
/*!************************!*\
  !*** ../dist/index.js ***!
  \************************/
/*! exports provided: Map, Entity, FeatureClass, FieldType, Field, Graphic, Feature, GeometryType, Geometry, Point, Polyline, Polygon, Layer, GraphicLayer, FeatureLayer, Symbol, SimplePointSymbol, SimpleLineSymbol, SimpleFillSymbol, SimpleMarkerSymbol, Renderer, SimpleRenderer, CategoryRendererItem, CategoryRenderer, ClassRendererItem, ClassRenderer, Projection, WebMecator, Utility, Bound, ColorGenerator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map */ "../dist/map.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Map", function() { return _map__WEBPACK_IMPORTED_MODULE_0__["Map"]; });

/* harmony import */ var _entity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entity */ "../dist/entity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Entity", function() { return _entity__WEBPACK_IMPORTED_MODULE_1__["Entity"]; });

/* harmony import */ var _data_feature_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data/feature-class */ "../dist/data/feature-class.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FeatureClass", function() { return _data_feature_class__WEBPACK_IMPORTED_MODULE_2__["FeatureClass"]; });

/* harmony import */ var _data_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data/field */ "../dist/data/field.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FieldType", function() { return _data_field__WEBPACK_IMPORTED_MODULE_3__["FieldType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Field", function() { return _data_field__WEBPACK_IMPORTED_MODULE_3__["Field"]; });

/* harmony import */ var _element_graphic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./element/graphic */ "../dist/element/graphic.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Graphic", function() { return _element_graphic__WEBPACK_IMPORTED_MODULE_4__["Graphic"]; });

/* harmony import */ var _element_feature__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./element/feature */ "../dist/element/feature.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Feature", function() { return _element_feature__WEBPACK_IMPORTED_MODULE_5__["Feature"]; });

/* harmony import */ var _geometry_geometry__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./geometry/geometry */ "../dist/geometry/geometry.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GeometryType", function() { return _geometry_geometry__WEBPACK_IMPORTED_MODULE_6__["GeometryType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Geometry", function() { return _geometry_geometry__WEBPACK_IMPORTED_MODULE_6__["Geometry"]; });

/* harmony import */ var _geometry_point__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./geometry/point */ "../dist/geometry/point.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Point", function() { return _geometry_point__WEBPACK_IMPORTED_MODULE_7__["Point"]; });

/* harmony import */ var _geometry_polyline__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./geometry/polyline */ "../dist/geometry/polyline.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Polyline", function() { return _geometry_polyline__WEBPACK_IMPORTED_MODULE_8__["Polyline"]; });

/* harmony import */ var _geometry_polygon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./geometry/polygon */ "../dist/geometry/polygon.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Polygon", function() { return _geometry_polygon__WEBPACK_IMPORTED_MODULE_9__["Polygon"]; });

/* harmony import */ var _layer_layer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./layer/layer */ "../dist/layer/layer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Layer", function() { return _layer_layer__WEBPACK_IMPORTED_MODULE_10__["Layer"]; });

/* harmony import */ var _layer_graphic_layer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./layer/graphic-layer */ "../dist/layer/graphic-layer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GraphicLayer", function() { return _layer_graphic_layer__WEBPACK_IMPORTED_MODULE_11__["GraphicLayer"]; });

/* harmony import */ var _layer_feature_layer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./layer/feature-layer */ "../dist/layer/feature-layer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FeatureLayer", function() { return _layer_feature_layer__WEBPACK_IMPORTED_MODULE_12__["FeatureLayer"]; });

/* harmony import */ var _symbol_symbol__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./symbol/symbol */ "../dist/symbol/symbol.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Symbol", function() { return _symbol_symbol__WEBPACK_IMPORTED_MODULE_13__["Symbol"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SimplePointSymbol", function() { return _symbol_symbol__WEBPACK_IMPORTED_MODULE_13__["SimplePointSymbol"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SimpleLineSymbol", function() { return _symbol_symbol__WEBPACK_IMPORTED_MODULE_13__["SimpleLineSymbol"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SimpleFillSymbol", function() { return _symbol_symbol__WEBPACK_IMPORTED_MODULE_13__["SimpleFillSymbol"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SimpleMarkerSymbol", function() { return _symbol_symbol__WEBPACK_IMPORTED_MODULE_13__["SimpleMarkerSymbol"]; });

/* harmony import */ var _renderer_renderer__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./renderer/renderer */ "../dist/renderer/renderer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Renderer", function() { return _renderer_renderer__WEBPACK_IMPORTED_MODULE_14__["Renderer"]; });

/* harmony import */ var _renderer_simple_renderer__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./renderer/simple-renderer */ "../dist/renderer/simple-renderer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SimpleRenderer", function() { return _renderer_simple_renderer__WEBPACK_IMPORTED_MODULE_15__["SimpleRenderer"]; });

/* harmony import */ var _renderer_category_renderer__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./renderer/category-renderer */ "../dist/renderer/category-renderer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CategoryRendererItem", function() { return _renderer_category_renderer__WEBPACK_IMPORTED_MODULE_16__["CategoryRendererItem"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CategoryRenderer", function() { return _renderer_category_renderer__WEBPACK_IMPORTED_MODULE_16__["CategoryRenderer"]; });

/* harmony import */ var _renderer_class_renderer__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./renderer/class-renderer */ "../dist/renderer/class-renderer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClassRendererItem", function() { return _renderer_class_renderer__WEBPACK_IMPORTED_MODULE_17__["ClassRendererItem"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClassRenderer", function() { return _renderer_class_renderer__WEBPACK_IMPORTED_MODULE_17__["ClassRenderer"]; });

/* harmony import */ var _projection_projection__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./projection/projection */ "../dist/projection/projection.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Projection", function() { return _projection_projection__WEBPACK_IMPORTED_MODULE_18__["Projection"]; });

/* harmony import */ var _projection_web_mecator__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./projection/web-mecator */ "../dist/projection/web-mecator.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebMecator", function() { return _projection_web_mecator__WEBPACK_IMPORTED_MODULE_19__["WebMecator"]; });

/* harmony import */ var _util_utility__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./util/utility */ "../dist/util/utility.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Utility", function() { return _util_utility__WEBPACK_IMPORTED_MODULE_20__["Utility"]; });

/* harmony import */ var _util_bound__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./util/bound */ "../dist/util/bound.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Bound", function() { return _util_bound__WEBPACK_IMPORTED_MODULE_21__["Bound"]; });

/* harmony import */ var _util_color_generator__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./util/color-generator */ "../dist/util/color-generator.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ColorGenerator", function() { return _util_color_generator__WEBPACK_IMPORTED_MODULE_22__["ColorGenerator"]; });


























/***/ }),

/***/ "../dist/layer/feature-layer.js":
/*!**************************************!*\
  !*** ../dist/layer/feature-layer.js ***!
  \**************************************/
/*! exports provided: FeatureLayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeatureLayer", function() { return FeatureLayer; });
/* harmony import */ var _layer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layer */ "../dist/layer/layer.js");
/* harmony import */ var _projection_web_mecator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../projection/web-mecator */ "../dist/projection/web-mecator.js");
/* harmony import */ var _renderer_simple_renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../renderer/simple-renderer */ "../dist/renderer/simple-renderer.js");
/* harmony import */ var _renderer_category_renderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../renderer/category-renderer */ "../dist/renderer/category-renderer.js");
/* harmony import */ var _renderer_class_renderer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../renderer/class-renderer */ "../dist/renderer/class-renderer.js");





class FeatureLayer extends _layer__WEBPACK_IMPORTED_MODULE_0__["Layer"] {
    constructor() {
        super(...arguments);
        this._zoom = [3, 20];
        this._interactive = true;
    }
    get interactive() {
        return this._interactive;
    }
    set interactive(value) {
        this._interactive = value;
    }
    set featureClass(value) {
        this._featureClass = value;
    }
    set renderer(value) {
        this._renderer = value;
    }
    set zoom(value) {
        this._zoom = value;
    }
    //地图事件注册监听
    on(event, handler) {
        this._featureClass.features.forEach((feature) => {
            feature.on(event, handler);
        });
    }
    off(event, handler) {
        this._featureClass.features.forEach((feature) => {
            feature.off(event, handler);
        });
    }
    emit(event, param) {
        this._featureClass.features.forEach((feature) => {
            feature.emit(event, param);
        });
    }
    draw(ctx, projection = new _projection_web_mecator__WEBPACK_IMPORTED_MODULE_1__["WebMecator"](), extent = projection.bound, zoom = 10) {
        if (this.visible && this._zoom[0] <= zoom && this._zoom[1] >= zoom) {
            this._featureClass.features.forEach((feature) => {
                feature.draw(ctx, projection, extent, this._getSymbol(feature));
            });
        }
    }
    contain(screenX, screenY, projection = new _projection_web_mecator__WEBPACK_IMPORTED_MODULE_1__["WebMecator"](), extent = projection.bound, event = undefined) {
        if (this.visible) {
            return this._featureClass.features.filter((feature) => feature.intersect(projection, extent)).some((feature) => {
                return feature.contain(screenX, screenY, event);
            });
        }
    }
    _getSymbol(feature) {
        if (this._renderer instanceof _renderer_simple_renderer__WEBPACK_IMPORTED_MODULE_2__["SimpleRenderer"]) {
            return this._renderer.symbol;
        }
        else if (this._renderer instanceof _renderer_category_renderer__WEBPACK_IMPORTED_MODULE_3__["CategoryRenderer"]) {
            const renderer = this._renderer;
            const item = renderer.items.find(item => item.value == feature.properties[renderer.field.name]);
            return item === null || item === void 0 ? void 0 : item.symbol;
        }
        else if (this._renderer instanceof _renderer_class_renderer__WEBPACK_IMPORTED_MODULE_4__["ClassRenderer"]) {
            const renderer = this._renderer;
            const item = renderer.items.find(item => item.low <= feature.properties[renderer.field.name] && item.high >= feature.properties[renderer.field.name]);
            return item === null || item === void 0 ? void 0 : item.symbol;
        }
    }
}


/***/ }),

/***/ "../dist/layer/graphic-layer.js":
/*!**************************************!*\
  !*** ../dist/layer/graphic-layer.js ***!
  \**************************************/
/*! exports provided: GraphicLayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphicLayer", function() { return GraphicLayer; });
/* harmony import */ var _layer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layer */ "../dist/layer/layer.js");
/* harmony import */ var _projection_web_mecator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../projection/web-mecator */ "../dist/projection/web-mecator.js");


class GraphicLayer extends _layer__WEBPACK_IMPORTED_MODULE_0__["Layer"] {
    constructor() {
        super(...arguments);
        this._graphics = [];
    }
    add(graphic) {
        this._graphics.push(graphic);
    }
    remove(graphic) {
        const index = this._graphics.findIndex(item => item === graphic);
        index != -1 && this._graphics.splice(index, 1);
    }
    clear() {
        this._graphics = [];
    }
    draw(ctx, projection = new _projection_web_mecator__WEBPACK_IMPORTED_MODULE_1__["WebMecator"](), extent = projection.bound, zoom = 10) {
        if (this.visible) {
            this._graphics.forEach((graphic) => {
                graphic.draw(ctx, projection, extent);
            });
        }
    }
}


/***/ }),

/***/ "../dist/layer/layer.js":
/*!******************************!*\
  !*** ../dist/layer/layer.js ***!
  \******************************/
/*! exports provided: Layer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Layer", function() { return Layer; });
/* harmony import */ var _projection_web_mecator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../projection/web-mecator */ "../dist/projection/web-mecator.js");

class Layer {
    constructor() {
        this._visible = true;
    }
    get visible() {
        return this._visible;
    }
    set visible(value) {
        this._visible = value;
    }
    draw(ctx, projection = new _projection_web_mecator__WEBPACK_IMPORTED_MODULE_0__["WebMecator"](), extent = projection.bound, zoom = 10) { }
    ;
}


/***/ }),

/***/ "../dist/map.js":
/*!**********************!*\
  !*** ../dist/map.js ***!
  \**********************/
/*! exports provided: Map */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Map", function() { return Map; });
/* harmony import */ var _util_bound__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/bound */ "../dist/util/bound.js");
/* harmony import */ var _projection_web_mecator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projection/web-mecator */ "../dist/projection/web-mecator.js");
/* harmony import */ var _layer_graphic_layer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layer/graphic-layer */ "../dist/layer/graphic-layer.js");
/* harmony import */ var _layer_feature_layer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./layer/feature-layer */ "../dist/layer/feature-layer.js");
/* harmony import */ var _util_utility__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util/utility */ "../dist/util/utility.js");





class Map {
    constructor(id) {
        this._drag = {
            flag: false,
            start: {
                x: 0,
                y: 0
            },
            end: {
                x: 0,
                y: 0
            }
        };
        //地图缩放等级
        this._zoom = 1;
        //地图视图中心
        this._center = [0, 0];
        //地图事件的handlers
        this._events = {
            "click": [],
            "extent": [] //view updated
        };
        this._defaultGraphicLayer = new _layer_graphic_layer__WEBPACK_IMPORTED_MODULE_2__["GraphicLayer"]();
        this._layers = [];
        this._canvas = document.getElementById(id);
        this._ctx = this._canvas.getContext("2d");
        this._canvas.addEventListener("click", this._onClick.bind(this));
        this._canvas.addEventListener("dblclick", this._onDoubleClick.bind(this));
        this._canvas.addEventListener("mousedown", this._onMouseDown.bind(this));
        this._canvas.addEventListener("mousemove", this._onMouseMove.bind(this));
        this._canvas.addEventListener("mouseup", this._onMouseUp.bind(this));
        this._canvas.addEventListener("wheel", this._onWheel.bind(this));
        this._projection = new _projection_web_mecator__WEBPACK_IMPORTED_MODULE_1__["WebMecator"]();
        this._center = [0, 0];
        this._zoom = 3;
        //Latlng [-180, 180] [-90, 90]
        //this._ctx.setTransform(256/180 * Math.pow(2, this._zoom - 1), 0, 0, -256/90 * Math.pow(2, this._zoom - 1), this._canvas.width/2, this._canvas.height/2);
        const bound = this._projection.bound;
        //设置初始矩阵，由于地图切片是256*256，Math.pow(2, this._zoom)代表在一定缩放级别下x与y轴的切片数量
        this._ctx.setTransform(256 * Math.pow(2, this._zoom) / (bound.xmax - bound.xmin) * bound.xscale, 0, 0, 256 * Math.pow(2, this._zoom) / (bound.ymax - bound.ymin) * bound.yscale, this._canvas.width / 2, this._canvas.height / 2);
    }
    get projection() {
        return this._projection;
    }
    //设置视图级别及视图中心
    setView(center = [0, 0], zoom = 3) {
        this._center = center;
        this._zoom = Math.max(3, Math.min(20, zoom));
        //center为经纬度，转化为平面坐标
        const origin = this._projection.project(center);
        const bound = this._projection.bound;
        //已知：matrix 转换前 坐标origin，转换后坐标 即canvas的中心 [this._canvas.width / 2, this._canvas.height / 2]
        //求：转换矩阵
        //解法如下：
        const a = 256 * Math.pow(2, this._zoom) / (bound.xmax - bound.xmin) * bound.xscale;
        const d = 256 * Math.pow(2, this._zoom) / (bound.ymax - bound.ymin) * bound.yscale;
        const e = this._canvas.width / 2 - a * origin[0];
        const f = this._canvas.height / 2 - d * origin[1];
        this._ctx.setTransform(a, 0, 0, d, e, f);
        this.redraw();
    }
    //地图事件注册监听
    on(event, handler) {
        this._events[event].push(handler);
    }
    off(event, handler) {
        if (Array.isArray(this._events[event])) {
            const index = this._events[event].findIndex(item => item === handler);
            index != -1 && this._events[event].splice(index, 1);
        }
    }
    emit(event, param) {
        this._events[event].forEach(handler => handler(param));
    }
    addLayer(layer) {
        this._layers.push(layer);
        layer.draw(this._ctx, this._projection, this._extent);
    }
    removeLayer(layer) {
        const index = this._layers.findIndex(item => item === layer);
        index != -1 && this._layers.splice(index, 1);
        this.redraw();
    }
    clearLayers() {
        this._layers = [];
        this.redraw();
    }
    //shortcut
    addGraphic(graphic) {
        this._defaultGraphicLayer.add(graphic);
        graphic.draw(this._ctx, this._projection, this._extent);
    }
    removeGraphic(graphic) {
        this._defaultGraphicLayer.remove(graphic);
        this._defaultGraphicLayer.draw(this._ctx, this._projection, this._extent);
    }
    clearGraphics() {
        this._defaultGraphicLayer.clear();
        this._defaultGraphicLayer.draw(this._ctx, this._projection, this._extent);
    }
    //更新地图视图范围以及中心点
    updateExtent() {
        const matrix = this._ctx.getTransform();
        const x1 = (0 - matrix.e) / matrix.a, y1 = (0 - matrix.f) / matrix.d, x2 = (this._canvas.width - matrix.e) / matrix.a, y2 = (this._canvas.height - matrix.f) / matrix.d;
        this._extent = new _util_bound__WEBPACK_IMPORTED_MODULE_0__["Bound"](Math.min(x1, x2), Math.min(y1, y2), Math.max(x1, x2), Math.max(y1, y2));
        this._center = this._projection.unproject([(x1 + x2) / 2, (y1 + y2) / 2]);
        this._events.extent.forEach(handler => handler({ extent: this._extent, center: this._center, zoom: this._zoom, matrix: matrix }));
    }
    redraw() {
        this._ctx.save();
        this._ctx.setTransform(1, 0, 0, 1, 0, 0);
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        /* //start axis
        this._ctx.strokeStyle = "#0000ff";
        //x axis
        this._ctx.lineWidth = 1;
        this._ctx.beginPath();
        this._ctx.moveTo(0, this._canvas.height/2);
        this._ctx.lineTo(this._canvas.width, this._canvas.height/2);
        this._ctx.stroke();
        //y axis
        this._ctx.beginPath();
        this._ctx.moveTo(this._canvas.width/2, this._canvas.height);
        this._ctx.lineTo(this._canvas.width/2, 0);
        this._ctx.stroke();
        //end axis*/
        this._ctx.restore();
        this.updateExtent();
        this._defaultGraphicLayer.draw(this._ctx, this._projection, this._extent);
        this._layers.forEach(layer => {
            layer.draw(this._ctx, this._projection, this._extent, this._zoom);
        });
    }
    clear() {
        this._ctx.setTransform(1, 0, 0, 1, 0, 0);
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this.updateExtent();
    }
    _onClick(event) {
        const flag = this._layers.filter(layer => (layer instanceof _layer_feature_layer__WEBPACK_IMPORTED_MODULE_3__["FeatureLayer"]) && layer.interactive).some((layer) => layer.contain(event.offsetX, event.offsetY, this._projection, this._extent, "click"));
        if (!flag) {
            this._events.click.forEach(handler => handler({ event: event }));
        }
    }
    _onDoubleClick(event) {
        if (this._zoom >= 20)
            return;
        const scale = 2;
        this._zoom += 1;
        const matrix = this._ctx.getTransform();
        const a1 = matrix.a, e1 = matrix.e, x1 = event.offsetX, x2 = x1; //放大到中心点 x2 = this._canvas.width / 2
        const e = (x2 - scale * (x1 - e1) - e1) / a1;
        const d1 = matrix.d, f1 = matrix.f, y1 = event.offsetY, y2 = y1; //放大到中心点 y2 = this._canvas.height / 2
        const f = (y2 - scale * (y1 - f1) - f1) / d1;
        this._ctx.transform(scale, 0, 0, scale, e, f);
        this.redraw();
    }
    _onMouseDown(event) {
        this._drag.flag = true;
        this._drag.start.x = event.x;
        this._drag.start.y = event.y;
    }
    _onMouseMove(event) {
        if (!this._drag.flag) {
            const flag = this._layers.filter(layer => (layer instanceof _layer_feature_layer__WEBPACK_IMPORTED_MODULE_3__["FeatureLayer"]) && layer.interactive).some((layer) => layer.contain(event.offsetX, event.offsetY, this._projection, this._extent, "mousemove"));
            if (flag) {
                _util_utility__WEBPACK_IMPORTED_MODULE_4__["Utility"].addClass(this._canvas, "green-hover");
            }
            else {
                _util_utility__WEBPACK_IMPORTED_MODULE_4__["Utility"].removeClass(this._canvas, "green-hover");
            }
        }
    }
    _onMouseUp(event) {
        if (this._drag.flag) {
            this._drag.end.x = event.x;
            this._drag.end.y = event.y;
            const matrix = this._ctx.getTransform();
            this._ctx.translate((this._drag.end.x - this._drag.start.x) / matrix.a, (this._drag.end.y - this._drag.start.y) / matrix.d);
            this.redraw();
        }
        this._drag.flag = false;
    }
    _onWheel(event) {
        let scale = 1;
        const sensitivity = 100;
        const delta = event.deltaY / sensitivity;
        if (delta < 0) {
            if (this._zoom >= 20)
                return;
            // 放大
            scale *= delta * -2;
        }
        else {
            // 缩小
            if (this._zoom <= 3)
                return;
            scale /= delta * 2;
        }
        const zoom = Math.round(Math.log(scale));
        scale = Math.pow(2, zoom);
        this._zoom += zoom;
        //交互表现为 鼠标当前位置 屏幕坐标不变 进行缩放 即x2 = x1
        //第一种方案，坐标系不变，变坐标值
        //1.将原屏幕坐标 x1 转成 初始坐标 x0 = (x1 - e1) / a1  初始矩阵 (1,0,0,1,0,0)
        //2.初始坐标x0 转成 现屏幕坐标x2  a2 * x0 + e2 = x2    e2 = x2 - a2 * x0  代入1式 e2 = x2 - a2 * (x1 - e1) / a1
        //3.已知scale = a2 / a1  故 e2 = x2 - scale * (x1 - e1)
        //4.另矩阵变换 a1 * e + e1 = e2
        //5.联立3和4  求得 e = (x2 - scale * (x1 - e1) - e1) / a1
        const matrix = this._ctx.getTransform();
        const a1 = matrix.a, e1 = matrix.e, x1 = event.x, x2 = x1; //放大到中心点 x2 = this._canvas.width / 2
        const e = (x2 - scale * (x1 - e1) - e1) / a1;
        const d1 = matrix.d, f1 = matrix.f, y1 = event.y, y2 = y1; //放大到中心点 y2 = this._canvas.height / 2
        const f = (y2 - scale * (y1 - f1) - f1) / d1;
        this._ctx.transform(scale, 0, 0, scale, e, f);
        this.redraw();
    }
    destroy() {
        this._canvas.removeEventListener("click", this._onClick);
        this._canvas.removeEventListener("dblclick", this._onDoubleClick);
        this._canvas.removeEventListener("mousedown", this._onMouseDown);
        this._canvas.removeEventListener("mousemove", this._onMouseMove);
        this._canvas.removeEventListener("mouseup", this._onMouseUp);
        this._canvas.removeEventListener("wheel", this._onWheel);
    }
}


/***/ }),

/***/ "../dist/projection/projection.js":
/*!****************************************!*\
  !*** ../dist/projection/projection.js ***!
  \****************************************/
/*! exports provided: Projection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Projection", function() { return Projection; });
//TODO: only support web mecator
class Projection {
    //经纬度转平面坐标
    project([lng, lat]) { return []; }
    ;
    //平面坐标转经纬度
    unproject([x, y]) { return []; }
    ;
    //投影后的平面坐标范围
    get bound() { return null; }
    ;
}


/***/ }),

/***/ "../dist/projection/web-mecator.js":
/*!*****************************************!*\
  !*** ../dist/projection/web-mecator.js ***!
  \*****************************************/
/*! exports provided: WebMecator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebMecator", function() { return WebMecator; });
/* harmony import */ var _util_bound__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/bound */ "../dist/util/bound.js");

class WebMecator {
    //投影后的平面坐标范围
    get bound() {
        return new _util_bound__WEBPACK_IMPORTED_MODULE_0__["Bound"](-Math.PI * WebMecator.R, Math.PI * WebMecator.R, Math.PI * WebMecator.R, -Math.PI * WebMecator.R);
    }
    //经纬度转平面坐标
    project([lng, lat]) {
        //from leaflet & wiki
        const d = Math.PI / 180, sin = Math.sin(lat * d);
        return [WebMecator.R * lng * d, WebMecator.R * Math.log((1 + sin) / (1 - sin)) / 2];
    }
    //平面坐标转经纬度
    unproject([x, y]) {
        const d = 180 / Math.PI;
        return [x * d / WebMecator.R, (2 * Math.atan(Math.exp(y / WebMecator.R)) - (Math.PI / 2)) * d];
    }
}
WebMecator.R = 6378137;


/***/ }),

/***/ "../dist/renderer/category-renderer.js":
/*!*********************************************!*\
  !*** ../dist/renderer/category-renderer.js ***!
  \*********************************************/
/*! exports provided: CategoryRendererItem, CategoryRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryRendererItem", function() { return CategoryRendererItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryRenderer", function() { return CategoryRenderer; });
/* harmony import */ var _symbol_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../symbol/symbol */ "../dist/symbol/symbol.js");
/* harmony import */ var _geometry_geometry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../geometry/geometry */ "../dist/geometry/geometry.js");
/* harmony import */ var _util_color_generator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/color-generator */ "../dist/util/color-generator.js");



class CategoryRendererItem {
    constructor() {
        this.count = 1;
    }
}
class CategoryRenderer {
    constructor() {
        this._items = [];
    }
    get field() {
        return this._field;
    }
    get items() {
        return this._items;
    }
    generate(featureClass, field) {
        this._field = field;
        this._items = [];
        featureClass.features.map(feature => feature.properties[field.name]).forEach((value) => {
            const item = this._items.find(item => item.value == value);
            if (item) {
                item.count += 1;
            }
            else {
                const item = new CategoryRendererItem();
                switch (featureClass.type) {
                    case _geometry_geometry__WEBPACK_IMPORTED_MODULE_1__["GeometryType"].Point:
                        const symbol1 = new _symbol_symbol__WEBPACK_IMPORTED_MODULE_0__["SimplePointSymbol"]();
                        symbol1.fillStyle = _util_color_generator__WEBPACK_IMPORTED_MODULE_2__["ColorGenerator"].random();
                        symbol1.strokeStyle = _util_color_generator__WEBPACK_IMPORTED_MODULE_2__["ColorGenerator"].random();
                        item.symbol = symbol1;
                        item.value = value;
                        this._items.push(item);
                        break;
                    case _geometry_geometry__WEBPACK_IMPORTED_MODULE_1__["GeometryType"].Polyline:
                        const symbol2 = new _symbol_symbol__WEBPACK_IMPORTED_MODULE_0__["SimpleLineSymbol"]();
                        symbol2.strokeStyle = _util_color_generator__WEBPACK_IMPORTED_MODULE_2__["ColorGenerator"].random();
                        item.symbol = symbol2;
                        item.value = value;
                        this._items.push(item);
                        break;
                    case _geometry_geometry__WEBPACK_IMPORTED_MODULE_1__["GeometryType"].Polygon:
                        const symbol3 = new _symbol_symbol__WEBPACK_IMPORTED_MODULE_0__["SimpleFillSymbol"]();
                        symbol3.fillStyle = _util_color_generator__WEBPACK_IMPORTED_MODULE_2__["ColorGenerator"].random();
                        symbol3.strokeStyle = _util_color_generator__WEBPACK_IMPORTED_MODULE_2__["ColorGenerator"].random();
                        item.symbol = symbol3;
                        item.value = value;
                        this._items.push(item);
                        break;
                }
            }
        });
    }
}


/***/ }),

/***/ "../dist/renderer/class-renderer.js":
/*!******************************************!*\
  !*** ../dist/renderer/class-renderer.js ***!
  \******************************************/
/*! exports provided: ClassRendererItem, ClassRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClassRendererItem", function() { return ClassRendererItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClassRenderer", function() { return ClassRenderer; });
class ClassRendererItem {
}
class ClassRenderer {
    constructor() {
        this._items = [];
    }
    get field() {
        return this._field;
    }
    get items() {
        return this._items;
    }
    generate(featureClass, field, breaks) {
        this._field = field;
        this._items = [];
        //TODO auto class break
    }
}


/***/ }),

/***/ "../dist/renderer/renderer.js":
/*!************************************!*\
  !*** ../dist/renderer/renderer.js ***!
  \************************************/
/*! exports provided: Renderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Renderer", function() { return Renderer; });
class Renderer {
}


/***/ }),

/***/ "../dist/renderer/simple-renderer.js":
/*!*******************************************!*\
  !*** ../dist/renderer/simple-renderer.js ***!
  \*******************************************/
/*! exports provided: SimpleRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimpleRenderer", function() { return SimpleRenderer; });
class SimpleRenderer {
}


/***/ }),

/***/ "../dist/symbol/symbol.js":
/*!********************************!*\
  !*** ../dist/symbol/symbol.js ***!
  \********************************/
/*! exports provided: Symbol, SimplePointSymbol, SimpleLineSymbol, SimpleFillSymbol, SimpleMarkerSymbol */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Symbol", function() { return Symbol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimplePointSymbol", function() { return SimplePointSymbol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimpleLineSymbol", function() { return SimpleLineSymbol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimpleFillSymbol", function() { return SimpleFillSymbol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimpleMarkerSymbol", function() { return SimpleMarkerSymbol; });
class Symbol {
}
class SimplePointSymbol extends Symbol {
    constructor() {
        super(...arguments);
        //circle
        this.radius = 10;
        this.lineWidth = 1;
        this.strokeStyle = "#ff0000"; //#ff0000
        this.fillStyle = "#ff0000"; //#ff0000
    }
}
class SimpleLineSymbol extends Symbol {
    constructor() {
        super(...arguments);
        this.lineWidth = 1;
        this.strokeStyle = "#ff0000"; //#ff0000
    }
}
class SimpleFillSymbol extends Symbol {
    constructor() {
        super(...arguments);
        this.lineWidth = 1;
        this.strokeStyle = "#ff0000"; //#ff0000
        this.fillStyle = "#ff0000"; //#ff0000
    }
}
class SimpleMarkerSymbol extends Symbol {
    constructor() {
        super(...arguments);
        this.width = 16;
        this.height = 16;
        this.offsetX = 8;
        this.offsetY = 8;
    }
    get loaded() {
        return this._loaded;
    }
    load() {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.onload = () => {
                createImageBitmap(img).then(icon => {
                    this.icon = icon;
                    this._loaded = true;
                    resolve(icon);
                }, err => reject(err));
            };
            img.onerror = reject;
            img.src = this.url;
        });
    }
}


/***/ }),

/***/ "../dist/util/bound.js":
/*!*****************************!*\
  !*** ../dist/util/bound.js ***!
  \*****************************/
/*! exports provided: Bound */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bound", function() { return Bound; });
class Bound {
    constructor(xmin, ymin, xmax, ymax) {
        //+1代表 x方向为自西向东，-1则反之
        this._xscale = 1;
        //+1代表 y方向为自北向南，-1则反之
        this._yscale = 1;
        this._xmin = Math.min(xmin, xmax);
        this._ymin = Math.min(ymin, ymax);
        this._xmax = Math.max(xmin, xmax);
        this._ymax = Math.max(ymin, ymax);
        this._xscale = xmin <= xmax ? 1 : -1;
        this._yscale = ymin <= ymax ? 1 : -1;
    }
    get xmin() {
        return this._xmin;
    }
    get ymin() {
        return this._ymin;
    }
    get xmax() {
        return this._xmax;
    }
    get ymax() {
        return this._ymax;
    }
    get xscale() {
        return this._xscale;
    }
    get yscale() {
        return this._yscale;
    }
    //是否交叉叠盖
    intersect(bound) {
        return (bound.xmax >= this._xmin) && (bound.xmin <= this._xmax) && (bound.ymax >= this._ymin) && (bound.ymin <= this._ymax);
    }
}


/***/ }),

/***/ "../dist/util/color-generator.js":
/*!***************************************!*\
  !*** ../dist/util/color-generator.js ***!
  \***************************************/
/*! exports provided: ColorGenerator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorGenerator", function() { return ColorGenerator; });
class ColorGenerator {
    static random() {
        return "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
    }
}


/***/ }),

/***/ "../dist/util/utility.js":
/*!*******************************!*\
  !*** ../dist/util/utility.js ***!
  \*******************************/
/*! exports provided: Utility */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Utility", function() { return Utility; });
class Utility {
    // @function addClass(el: HTMLElement, name: String)
    // Adds `name` to the element's class attribute.
    static addClass(el, name) {
        if (el.classList !== undefined) {
            el.classList.add(name);
        }
        else if (!Utility.hasClass(el, name)) {
            var className = Utility.getClass(el);
            Utility.setClass(el, (className ? className + ' ' : '') + name);
        }
    }
    // @function removeClass(el: HTMLElement, name: String)
    // Removes `name` from the element's class attribute.
    static removeClass(el, name) {
        if (el.classList !== undefined) {
            el.classList.remove(name);
        }
        else {
            Utility.setClass(el, (' ' + Utility.getClass(el) + ' ').replace(' ' + name + ' ', ' ').trim());
        }
    }
    // @function hasClass(el: HTMLElement, name: String): Boolean
    // Returns `true` if the element's class attribute contains `name`.
    static hasClass(el, name) {
        if (el.classList !== undefined) {
            return el.classList.contains(name);
        }
        var className = Utility.getClass(el);
        return className.length > 0 && new RegExp('(^|\\s)' + name + '(\\s|$)').test(className);
    }
    // @function setClass(el: HTMLElement, name: String)
    // Sets the element's class.
    static setClass(el, name) {
        if (el.className.baseVal === undefined) {
            el.className = name;
        }
        else {
            // in case of SVG element
            el.className.baseVal = name;
        }
    }
    // @function getClass(el: HTMLElement): String
    // Returns the element's class.
    static getClass(el) {
        // Check if the element is an SVGElementInstance and use the correspondingElement instead
        // (Required for linked SVG elements in IE11.)
        if (el.correspondingElement) {
            el = el.correspondingElement;
        }
        return el.className.baseVal === undefined ? el.className : el.className.baseVal;
    }
}


/***/ }),

/***/ "./main-03.js":
/*!********************!*\
  !*** ./main-03.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dist */ "../dist/index.js");


var AMap = window.AMap;

window.load = () => {

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

    const map = new _dist__WEBPACK_IMPORTED_MODULE_0__["Map"]("foo");
    map.on("extent", (event) => {
        amap.setZoomAndCenter(event.zoom, event.center);
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
    map.setView([107.411, 29.89], 7);

    var req = new XMLHttpRequest();
    req.onload = (event) => {
        const featureClass = new _dist__WEBPACK_IMPORTED_MODULE_0__["FeatureClass"]();
        featureClass.loadGeoJSON(JSON.parse(req.responseText));
        const featureLayer = new _dist__WEBPACK_IMPORTED_MODULE_0__["FeatureLayer"]();
        featureLayer.featureClass = featureClass;
        const field = new _dist__WEBPACK_IMPORTED_MODULE_0__["Field"]();
        field.name = "name";
        field.type = _dist__WEBPACK_IMPORTED_MODULE_0__["FieldType"].String;
        const renderer = new _dist__WEBPACK_IMPORTED_MODULE_0__["CategoryRenderer"]();
        renderer.generate(featureClass, field);

        /*renderer.field = field;
        let item = new CategoryRendererItem();
        item.value = "WEAR";
        const symbol1 = new SimpleFillSymbol();
        symbol1.fillStyle = "#0868ac";
        symbol1.strokeStyle = "#084081";
        item.symbol = symbol1;
        renderer.items.push(item);
        item = new CategoryRendererItem();
        item.value = "GAAR";
        const symbol2 = new SimpleFillSymbol();
        symbol2.fillStyle = "#1a9850";
        symbol2.strokeStyle = "#006837";
        item.symbol = symbol2;
        renderer.items.push(item);*/
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


    //beijing gugong
    const point = new _dist__WEBPACK_IMPORTED_MODULE_0__["Point"](116.397411,39.909186);
    const feature = new _dist__WEBPACK_IMPORTED_MODULE_0__["Feature"](point, {});
    const featureClass = new _dist__WEBPACK_IMPORTED_MODULE_0__["FeatureClass"]();
    featureClass.addFeature(feature);
    const marker = new _dist__WEBPACK_IMPORTED_MODULE_0__["SimpleMarkerSymbol"]();
    marker.width = 32;
    marker.height = 32;
    marker.offsetX = 16;
    marker.offsetY = 32;
    marker.url = "assets/img/marker.svg";
    const featureLayer = new _dist__WEBPACK_IMPORTED_MODULE_0__["FeatureLayer"]();
    featureLayer.featureClass = featureClass;
    const renderer = new _dist__WEBPACK_IMPORTED_MODULE_0__["SimpleRenderer"]();
    renderer.symbol = marker;
    featureLayer.renderer = renderer;
    map.addLayer(featureLayer);

}


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map