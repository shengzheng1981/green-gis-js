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
/******/ 	return __webpack_require__(__webpack_require__.s = "./large-than-20.js");
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
/* harmony import */ var _geometry_multiple_polygon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../geometry/multiple-polygon */ "../dist/geometry/multiple-polygon.js");
/* harmony import */ var _geometry_multiple_polyline__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../geometry/multiple-polyline */ "../dist/geometry/multiple-polyline.js");
/* harmony import */ var _geometry_multiple_point__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../geometry/multiple-point */ "../dist/geometry/multiple-point.js");








class FeatureClass {
    constructor(type) {
        this._fields = [];
        this._features = [];
        this._type = type;
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
                    //TODO: each feature has one type that is ridiculous, cause geojson is a featurecollection, not a featurelayer.
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
                case "MultiPoint":
                    this._type = _geometry_geometry__WEBPACK_IMPORTED_MODULE_1__["GeometryType"].Point;
                    const multipoint = new _geometry_multiple_point__WEBPACK_IMPORTED_MODULE_7__["MultiplePoint"](item.geometry.coordinates);
                    this._features.push(new _element_feature__WEBPACK_IMPORTED_MODULE_0__["Feature"](multipoint, item.properties));
                    break;
                case "MultiLineString":
                    this._type = _geometry_geometry__WEBPACK_IMPORTED_MODULE_1__["GeometryType"].Polyline;
                    const multipolyline = new _geometry_multiple_polyline__WEBPACK_IMPORTED_MODULE_6__["MultiplePolyline"](item.geometry.coordinates);
                    this._features.push(new _element_feature__WEBPACK_IMPORTED_MODULE_0__["Feature"](multipolyline, item.properties));
                    break;
                case "MultiPolygon":
                    this._type = _geometry_geometry__WEBPACK_IMPORTED_MODULE_1__["GeometryType"].Polygon;
                    const multipolygon = new _geometry_multiple_polygon__WEBPACK_IMPORTED_MODULE_5__["MultiplePolygon"](item.geometry.coordinates);
                    this._features.push(new _element_feature__WEBPACK_IMPORTED_MODULE_0__["Feature"](multipolygon, item.properties));
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
    FieldType[FieldType["String"] = 1] = "String";
    FieldType[FieldType["Number"] = 2] = "Number";
})(FieldType || (FieldType = {}));
class Field {
}


/***/ }),

/***/ "../dist/editor/editor.js":
/*!********************************!*\
  !*** ../dist/editor/editor.js ***!
  \********************************/
/*! exports provided: EditorActionType, Editor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditorActionType", function() { return EditorActionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Editor", function() { return Editor; });
/* harmony import */ var _geometry_geometry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../geometry/geometry */ "../dist/geometry/geometry.js");
/* harmony import */ var _layer_graphic_layer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../layer/graphic-layer */ "../dist/layer/graphic-layer.js");
/* harmony import */ var _element_graphic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../element/graphic */ "../dist/element/graphic.js");
/* harmony import */ var _element_feature__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../element/feature */ "../dist/element/feature.js");
/* harmony import */ var _geometry_point__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../geometry/point */ "../dist/geometry/point.js");
/* harmony import */ var _symbol_symbol__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../symbol/symbol */ "../dist/symbol/symbol.js");
/* harmony import */ var _util_subject__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/subject */ "../dist/util/subject.js");
/* harmony import */ var _geometry_polyline__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../geometry/polyline */ "../dist/geometry/polyline.js");
/* harmony import */ var _geometry_polygon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../geometry/polygon */ "../dist/geometry/polygon.js");









var EditorActionType;
(function (EditorActionType) {
    EditorActionType[EditorActionType["Select"] = 0] = "Select";
    EditorActionType[EditorActionType["Create"] = 1] = "Create";
    EditorActionType[EditorActionType["Edit"] = 2] = "Edit";
})(EditorActionType || (EditorActionType = {}));
class Editor extends _util_subject__WEBPACK_IMPORTED_MODULE_6__["Subject"] {
    constructor(map) {
        super(["mouseover", "mouseout", "startedit", "stopedit", "click", "update", "commit", "create", "delete"]); //when mouseover feature or vertex
        this._drag = {
            flag: false,
            vertex: null,
            start: {
                x: 0,
                y: 0
            },
            end: {
                x: 0,
                y: 0
            }
        };
        this._create = {
            click: 0,
            graphic: null,
            lnglats: []
        };
        this._action = EditorActionType.Select;
        this._defaultPointSymbol = new _symbol_symbol__WEBPACK_IMPORTED_MODULE_5__["SimplePointSymbol"]();
        this._defaultLineSymbol = new _symbol_symbol__WEBPACK_IMPORTED_MODULE_5__["SimpleLineSymbol"]();
        this._defaultPolygonSymbol = new _symbol_symbol__WEBPACK_IMPORTED_MODULE_5__["SimpleFillSymbol"]();
        this._map = map;
        const container = map.container;
        //create canvas
        this._canvas = document.createElement("canvas");
        this._canvas.style.cssText = "position: absolute; height: 100%; width: 100%; z-index: 90";
        this._canvas.width = container.clientWidth;
        this._canvas.height = container.clientHeight;
        container.appendChild(this._canvas);
        this._ctx = this._canvas.getContext("2d");
        this._onResize = this._onResize.bind(this);
        this._extentChange = this._extentChange.bind(this);
        this._switchEditing = this._switchEditing.bind(this);
        this._map.on("resize", this._onResize);
        this._map.on("extent", this._extentChange);
    }
    get editing() {
        return this._editing;
    }
    get editingFeature() {
        return this._editingFeature;
    }
    get action() {
        return this._action;
    }
    set action(value) {
        this._action = value;
    }
    get defaultPointSymbol() {
        return this._defaultPointSymbol;
    }
    set defaultPointSymbol(value) {
        this._defaultPointSymbol = value;
    }
    get defaultLineSymbol() {
        return this._defaultLineSymbol;
    }
    set defaultLineSymbol(value) {
        this._defaultLineSymbol = value;
    }
    get defaultPolygonSymbol() {
        return this._defaultPolygonSymbol;
    }
    set defaultPolygonSymbol(value) {
        this._defaultPolygonSymbol = value;
    }
    setFeatureLayer(layer) {
        if (this._editing) {
            this._featureLayer = layer;
            this._featureLayer.editing = true;
            this._featureLayer.on("dblclick", this._switchEditing);
            this._map.redraw();
            //layer.draw(this._ctx, this._map.projection, this._map.extent, this._map.zoom);
        }
        else {
            throw new Error("please start editing!");
        }
    }
    start() {
        if (!this._editing) {
            this._editing = true;
            this._vertexLayer = new _layer_graphic_layer__WEBPACK_IMPORTED_MODULE_1__["GraphicLayer"]();
            this._action = EditorActionType.Select;
            this._createLayer = new _layer_graphic_layer__WEBPACK_IMPORTED_MODULE_1__["GraphicLayer"]();
            this._handlers["startedit"].forEach(handler => handler());
        }
        //TODO: edit stack for undo/redo
    }
    create() {
        this._action = EditorActionType.Create;
        this._vertexLayer.clear();
        this._editingFeature = null;
        this.redraw();
    }
    save() {
    }
    stop() {
        if (this._editing) {
            this._editing = false;
            this._editingFeature = null;
            this._featureLayer.editing = false;
            this._featureLayer.off("dblclick", this._switchEditing);
            this._featureLayer = null;
            this._vertexLayer = null;
            this._action = EditorActionType.Select;
            this._create = {
                click: 0,
                graphic: null,
                lnglats: []
            };
            this._drag = {
                flag: false,
                vertex: null,
                start: {
                    x: 0,
                    y: 0
                },
                end: {
                    x: 0,
                    y: 0
                }
            };
            this.clear();
            this._handlers["stopedit"].forEach(handler => handler());
        }
    }
    addFeature(feature) {
        this._featureLayer.featureClass.addFeature(feature);
        feature.on("dblclick", this._switchEditing);
        this._handlers["create"].forEach(handler => handler({ feature: feature }));
        this.redraw();
    }
    removeFeature(feature) {
        this._featureLayer.featureClass.removeFeature(feature);
        feature.off("dblclick", this._switchEditing);
        this._handlers["delete"].forEach(handler => handler({ feature: feature }));
        this.redraw();
    }
    _onResize(event) {
        this._canvas.width = this._map.container.clientWidth;
        this._canvas.height = this._map.container.clientHeight;
    }
    _extentChange(event) {
        this._ctx.setTransform(event.matrix.a, 0, 0, event.matrix.d, event.matrix.e, event.matrix.f);
        this.redraw();
    }
    _getMiddlePoint(point1, point2) {
        point1.project(this._map.projection);
        point2.project(this._map.projection);
        const [x, y] = [(point1.x + point2.x) / 2, (point1.y + point2.y) / 2];
        const [lng, lat] = this._map.projection.unproject([x, y]);
        return new _geometry_point__WEBPACK_IMPORTED_MODULE_4__["Point"](lng, lat);
    }
    _switchEditing(event) {
        if (!this._editingFeature && this._action === EditorActionType.Select) {
            this._action = EditorActionType.Edit;
            this._editingFeature = event.feature;
            if (this._editingFeature.geometry instanceof _geometry_point__WEBPACK_IMPORTED_MODULE_4__["Point"]) {
                const point = this._editingFeature.geometry;
                const vertex = new _element_graphic__WEBPACK_IMPORTED_MODULE_2__["Graphic"](point, new _symbol_symbol__WEBPACK_IMPORTED_MODULE_5__["VertexSymbol"]());
                this._vertexLayer.add(vertex);
                this.redraw();
            }
            else if (this._editingFeature.geometry instanceof _geometry_polyline__WEBPACK_IMPORTED_MODULE_7__["Polyline"]) {
                const polyline = this._editingFeature.geometry;
                polyline.lnglats.forEach((lnglat, index) => {
                    const point = new _geometry_point__WEBPACK_IMPORTED_MODULE_4__["Point"](lnglat[0], lnglat[1]);
                    const vertex = new _element_graphic__WEBPACK_IMPORTED_MODULE_2__["Graphic"](point, new _symbol_symbol__WEBPACK_IMPORTED_MODULE_5__["VertexSymbol"]());
                    this._vertexLayer.add(vertex);
                    vertex.on("dragstart", (event) => {
                        this._drag.vertex = vertex;
                    });
                    vertex.on("dblclick", (event) => {
                        this._vertexLayer.remove(vertex);
                        this._editingFeature.edited = true;
                        polyline.splice(this._ctx, this._map.projection, [point.lng, point.lat]);
                        this.redraw();
                    });
                    //middle point
                    /*if (index < polyline.lnglats.length - 1) {
                        const p1: Point = new Point(lnglat[0], lnglat[1]), p2: Point = new Point(polyline.lnglats[index + 1][0], polyline.lnglats[index + 1][1]);
                        const p: Point = this._getMiddlePoint(p1, p2);
                        const symbol: VertexSymbol = new VertexSymbol();
                        symbol.strokeStyle = "#888888";
                        symbol.fillStyle = "#88888888";
                        symbol.size = 6;
                        const middle: Graphic = new Graphic(p, symbol);
                        this._vertexLayer.add(middle);
                    }*/
                });
                this.redraw();
            }
            else if (this._editingFeature.geometry instanceof _geometry_polygon__WEBPACK_IMPORTED_MODULE_8__["Polygon"]) {
                const polygon = this._editingFeature.geometry;
                polygon.lnglats.forEach(ring => {
                    ring.forEach(lnglat => {
                        const point = new _geometry_point__WEBPACK_IMPORTED_MODULE_4__["Point"](lnglat[0], lnglat[1]);
                        const vertex = new _element_graphic__WEBPACK_IMPORTED_MODULE_2__["Graphic"](point, new _symbol_symbol__WEBPACK_IMPORTED_MODULE_5__["VertexSymbol"]());
                        this._vertexLayer.add(vertex);
                        vertex.on("dragstart", (event) => {
                            this._drag.vertex = vertex;
                        });
                        vertex.on("dblclick", (event) => {
                            this._vertexLayer.remove(vertex);
                            this._editingFeature.edited = true;
                            polygon.splice(this._ctx, this._map.projection, [point.lng, point.lat]);
                            this.redraw();
                        });
                    });
                });
                this.redraw();
            }
        }
        else if (this._editingFeature === event.feature && this._action === EditorActionType.Edit) {
            this._action = EditorActionType.Select;
            if (this._editingFeature.edited) {
                this._handlers["update"].forEach(handler => handler({ feature: this._editingFeature }));
                this._editingFeature.edited = false;
            }
            this._editingFeature = null;
            this._vertexLayer.clear();
            this.redraw();
        }
    }
    redraw() {
        this._ctx.save();
        this._ctx.setTransform(1, 0, 0, 1, 0, 0);
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._ctx.restore();
        this._featureLayer && this._featureLayer.draw(this._ctx, this._map.projection, this._map.extent, this._map.zoom);
        this._vertexLayer && this._vertexLayer.draw(this._ctx, this._map.projection, this._map.extent, this._map.zoom);
        this._createLayer && this._createLayer.draw(this._ctx, this._map.projection, this._map.extent, this._map.zoom);
    }
    clear() {
        this._ctx.save();
        this._ctx.setTransform(1, 0, 0, 1, 0, 0);
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._ctx.restore();
    }
    _onClick(event) {
        if (event.detail > 1)
            return;
        if (this._action === EditorActionType.Create) {
            if (this._featureLayer.featureClass.type == _geometry_geometry__WEBPACK_IMPORTED_MODULE_0__["GeometryType"].Point) {
                const point = new _geometry_point__WEBPACK_IMPORTED_MODULE_4__["Point"](event.lng, event.lat);
                const feature = new _element_feature__WEBPACK_IMPORTED_MODULE_3__["Feature"](point, {}, this._defaultPointSymbol);
                this.addFeature(feature);
                this._action = EditorActionType.Select;
            }
            else if (this._featureLayer.featureClass.type == _geometry_geometry__WEBPACK_IMPORTED_MODULE_0__["GeometryType"].Polygon) {
                if (this._create.click == 0) {
                    this._createLayer.clear();
                    const point = new _geometry_point__WEBPACK_IMPORTED_MODULE_4__["Point"](event.lng, event.lat);
                    const graphic = new _element_graphic__WEBPACK_IMPORTED_MODULE_2__["Graphic"](point, this._defaultPointSymbol);
                    this._createLayer.add(graphic);
                    this._create.click += 1;
                    this._create.lnglats.push([event.lng, event.lat]);
                }
                else if (this._create.click == 1) {
                    const second = new _geometry_point__WEBPACK_IMPORTED_MODULE_4__["Point"](event.lng, event.lat);
                    const graphic1 = new _element_graphic__WEBPACK_IMPORTED_MODULE_2__["Graphic"](second, this._defaultPointSymbol);
                    this._createLayer.add(graphic1);
                    if (this._create.graphic)
                        this._createLayer.remove(this._create.graphic);
                    this._create.lnglats.push([event.lng, event.lat]);
                    const line = new _geometry_polyline__WEBPACK_IMPORTED_MODULE_7__["Polyline"](this._create.lnglats);
                    this._create.graphic = new _element_graphic__WEBPACK_IMPORTED_MODULE_2__["Graphic"](line, this._defaultLineSymbol);
                    this._createLayer.add(this._create.graphic);
                    this._create.click += 1;
                }
                else {
                    const second = new _geometry_point__WEBPACK_IMPORTED_MODULE_4__["Point"](event.lng, event.lat);
                    const graphic1 = new _element_graphic__WEBPACK_IMPORTED_MODULE_2__["Graphic"](second, this._defaultPointSymbol);
                    this._createLayer.add(graphic1);
                    if (this._create.graphic)
                        this._createLayer.remove(this._create.graphic);
                    this._create.lnglats.push([event.lng, event.lat]);
                    const polygon = new _geometry_polygon__WEBPACK_IMPORTED_MODULE_8__["Polygon"]([this._create.lnglats]);
                    this._create.graphic = new _element_graphic__WEBPACK_IMPORTED_MODULE_2__["Graphic"](polygon, this._defaultPolygonSymbol);
                    this._createLayer.add(this._create.graphic);
                    this._create.click += 1;
                }
            }
            else if (this._featureLayer.featureClass.type == _geometry_geometry__WEBPACK_IMPORTED_MODULE_0__["GeometryType"].Polyline) {
                if (this._create.click == 0) {
                    this._createLayer.clear();
                    const point = new _geometry_point__WEBPACK_IMPORTED_MODULE_4__["Point"](event.lng, event.lat);
                    const graphic = new _element_graphic__WEBPACK_IMPORTED_MODULE_2__["Graphic"](point, this._defaultPointSymbol);
                    this._createLayer.add(graphic);
                    this._create.click += 1;
                    this._create.lnglats.push([event.lng, event.lat]);
                }
                else {
                    const second = new _geometry_point__WEBPACK_IMPORTED_MODULE_4__["Point"](event.lng, event.lat);
                    const graphic1 = new _element_graphic__WEBPACK_IMPORTED_MODULE_2__["Graphic"](second, this._defaultPointSymbol);
                    this._createLayer.add(graphic1);
                    if (this._create.graphic)
                        this._createLayer.remove(this._create.graphic);
                    this._create.lnglats.push([event.lng, event.lat]);
                    const line = new _geometry_polyline__WEBPACK_IMPORTED_MODULE_7__["Polyline"](this._create.lnglats);
                    this._create.graphic = new _element_graphic__WEBPACK_IMPORTED_MODULE_2__["Graphic"](line, this._defaultLineSymbol);
                    this._createLayer.add(this._create.graphic);
                    this._create.click += 1;
                }
            }
            this._handlers["click"].forEach(handler => handler(event));
        }
        else {
            /*if (!this._editingFeature) {
                this._featureLayer.contain(event.offsetX, event.offsetY, this._map.projection, this._map.extent, this._map.zoom, "click");
            }*/
        }
    }
    _onDoubleClick(event) {
        if (!this._editing)
            return;
        if (this._action === EditorActionType.Create) {
            if (this._featureLayer.featureClass.type == _geometry_geometry__WEBPACK_IMPORTED_MODULE_0__["GeometryType"].Polygon) {
                if (this._create.click > 1) {
                    if (this._create.graphic)
                        this._createLayer.remove(this._create.graphic);
                    const polygon = new _geometry_polygon__WEBPACK_IMPORTED_MODULE_8__["Polygon"]([this._create.lnglats]);
                    const feature = new _element_feature__WEBPACK_IMPORTED_MODULE_3__["Feature"](polygon, {}, this._defaultPolygonSymbol);
                    this._create = {
                        click: 0,
                        graphic: null,
                        lnglats: []
                    };
                    this._createLayer.clear();
                    this.addFeature(feature);
                    this._action = EditorActionType.Select;
                }
            }
            else if (this._featureLayer.featureClass.type == _geometry_geometry__WEBPACK_IMPORTED_MODULE_0__["GeometryType"].Polyline) {
                if (this._create.click > 0) {
                    if (this._create.graphic)
                        this._createLayer.remove(this._create.graphic);
                    const polyline = new _geometry_polyline__WEBPACK_IMPORTED_MODULE_7__["Polyline"](this._create.lnglats);
                    const feature = new _element_feature__WEBPACK_IMPORTED_MODULE_3__["Feature"](polyline, {}, this._defaultLineSymbol);
                    this._create = {
                        click: 0,
                        graphic: null,
                        lnglats: []
                    };
                    this._createLayer.clear();
                    this.addFeature(feature);
                    this._action = EditorActionType.Select;
                }
            }
            return;
        }
        if (this._editingFeature && !(this._editingFeature.geometry instanceof _geometry_point__WEBPACK_IMPORTED_MODULE_4__["Point"])) {
            const flag = this._vertexLayer.contain(event.offsetX, event.offsetY, this._map.projection, this._map.extent, this._map.zoom, "dblclick");
            if (flag)
                return;
        }
        this._featureLayer.contain(event.offsetX, event.offsetY, this._map.projection, this._map.extent, this._map.zoom, "dblclick");
    }
    _onMouseDown(event) {
        if (this._action === EditorActionType.Create)
            return;
        if (this._editingFeature) {
            this._drag.flag = this._vertexLayer.contain(event.offsetX, event.offsetY, this._map.projection, this._map.extent, this._map.zoom, "dragstart");
            this._drag.start.x = event.x;
            this._drag.start.y = event.y;
        }
    }
    _onMouseMove(event) {
        if (this._action === EditorActionType.Create) {
            if (this._featureLayer.featureClass.type == _geometry_geometry__WEBPACK_IMPORTED_MODULE_0__["GeometryType"].Polygon) {
                if (this._create.click == 1) {
                    if (this._create.graphic)
                        this._createLayer.remove(this._create.graphic);
                    const lnglats = [...this._create.lnglats];
                    lnglats.push([event.lng, event.lat]);
                    const line = new _geometry_polyline__WEBPACK_IMPORTED_MODULE_7__["Polyline"](lnglats);
                    this._create.graphic = new _element_graphic__WEBPACK_IMPORTED_MODULE_2__["Graphic"](line, this._defaultLineSymbol);
                    this._createLayer.add(this._create.graphic);
                }
                else if (this._create.click > 1) {
                    if (this._create.graphic)
                        this._createLayer.remove(this._create.graphic);
                    const lnglats = [...this._create.lnglats];
                    lnglats.push([event.lng, event.lat]);
                    const polygon = new _geometry_polygon__WEBPACK_IMPORTED_MODULE_8__["Polygon"]([lnglats]);
                    this._create.graphic = new _element_graphic__WEBPACK_IMPORTED_MODULE_2__["Graphic"](polygon, this._defaultPolygonSymbol);
                    this._createLayer.add(this._create.graphic);
                }
            }
            else if (this._featureLayer.featureClass.type == _geometry_geometry__WEBPACK_IMPORTED_MODULE_0__["GeometryType"].Polyline) {
                if (this._create.click > 0) {
                    if (this._create.graphic)
                        this._createLayer.remove(this._create.graphic);
                    const lnglats = [...this._create.lnglats];
                    lnglats.push([event.lng, event.lat]);
                    const line = new _geometry_polyline__WEBPACK_IMPORTED_MODULE_7__["Polyline"](lnglats);
                    this._create.graphic = new _element_graphic__WEBPACK_IMPORTED_MODULE_2__["Graphic"](line, this._defaultLineSymbol);
                    this._createLayer.add(this._create.graphic);
                }
            }
            this.redraw();
            return;
        }
        if (!this._drag.flag) {
            const flag1 = this._featureLayer.contain(event.offsetX, event.offsetY, this._map.projection, this._map.extent, this._map.zoom, "mousemove");
            const flag2 = this._vertexLayer.contain(event.offsetX, event.offsetY, this._map.projection, this._map.extent, this._map.zoom, "mousemove");
            if (flag1 || flag2) {
                this.emit("mouseover", event);
            }
            else {
                this.emit("mouseout", event);
            }
        }
    }
    _onMouseUp(event) {
        if (this._action === EditorActionType.Create)
            return;
        if (this._drag.flag) {
            this._drag.end.x = event.x;
            this._drag.end.y = event.y;
            this._drag.flag = false;
            this._editingFeature.edited = true;
            if (this._editingFeature.geometry instanceof _geometry_point__WEBPACK_IMPORTED_MODULE_4__["Point"]) {
                const point = this._editingFeature.geometry;
                point.move(this._ctx, this._map.projection, event.offsetX, event.offsetY);
                this.redraw();
            }
            else if (this._editingFeature.geometry instanceof _geometry_polyline__WEBPACK_IMPORTED_MODULE_7__["Polyline"]) {
                if (this._drag.vertex) {
                    const polyline = this._editingFeature.geometry;
                    const point = this._drag.vertex.geometry;
                    polyline.splice(this._ctx, this._map.projection, [point.lng, point.lat], event.offsetX, event.offsetY, !event.shiftKey);
                    if (event.shiftKey) {
                        const shift = new _geometry_point__WEBPACK_IMPORTED_MODULE_4__["Point"](point.lng, point.lat);
                        shift.move(this._ctx, this._map.projection, event.offsetX, event.offsetY);
                        const vertex = new _element_graphic__WEBPACK_IMPORTED_MODULE_2__["Graphic"](shift, new _symbol_symbol__WEBPACK_IMPORTED_MODULE_5__["VertexSymbol"]());
                        this._vertexLayer.add(vertex);
                        vertex.on("dragstart", (event) => {
                            this._drag.vertex = vertex;
                        });
                        vertex.on("dblclick", (event) => {
                            this._vertexLayer.remove(vertex);
                            this._editingFeature.edited = true;
                            polyline.splice(this._ctx, this._map.projection, [shift.lng, shift.lat]);
                            this.redraw();
                        });
                    }
                    else {
                        point.move(this._ctx, this._map.projection, event.offsetX, event.offsetY);
                    }
                    this._drag.vertex = null;
                    this.redraw();
                }
            }
            else if (this._editingFeature.geometry instanceof _geometry_polygon__WEBPACK_IMPORTED_MODULE_8__["Polygon"]) {
                if (this._drag.vertex) {
                    const polygon = this._editingFeature.geometry;
                    const point = this._drag.vertex.geometry;
                    polygon.splice(this._ctx, this._map.projection, [point.lng, point.lat], event.offsetX, event.offsetY, !event.shiftKey);
                    if (event.shiftKey) {
                        const shift = new _geometry_point__WEBPACK_IMPORTED_MODULE_4__["Point"](point.lng, point.lat);
                        shift.move(this._ctx, this._map.projection, event.offsetX, event.offsetY);
                        const vertex = new _element_graphic__WEBPACK_IMPORTED_MODULE_2__["Graphic"](shift, new _symbol_symbol__WEBPACK_IMPORTED_MODULE_5__["VertexSymbol"]());
                        this._vertexLayer.add(vertex);
                        vertex.on("dragstart", (event) => {
                            this._drag.vertex = vertex;
                        });
                        vertex.on("dblclick", (event) => {
                            this._vertexLayer.remove(vertex);
                            this._editingFeature.edited = true;
                            polygon.splice(this._ctx, this._map.projection, [shift.lng, shift.lat]);
                            this.redraw();
                        });
                    }
                    else {
                        point.move(this._ctx, this._map.projection, event.offsetX, event.offsetY);
                    }
                    this._drag.vertex = null;
                    this.redraw();
                }
            }
        }
    }
    destroy() {
        this._featureLayer = null;
        this._map.off("resize", this._onResize);
        this._map.off("extent", this._extentChange);
    }
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
/* harmony import */ var _projection_web_mercator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../projection/web-mercator */ "../dist/projection/web-mercator.js");
/* harmony import */ var _util_subject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/subject */ "../dist/util/subject.js");



class Feature extends _util_subject__WEBPACK_IMPORTED_MODULE_2__["Subject"] {
    constructor(geometry, properties, symbol) {
        super(["click", "dblclick", "mouseover", "mouseout"]);
        this.visible = true;
        this._geometry = geometry;
        this._properties = properties;
        this._symbol = symbol;
    }
    get symbol() {
        return this._symbol;
    }
    set symbol(value) {
        this._symbol = value;
    }
    get geometry() {
        return this._geometry;
    }
    get properties() {
        return this._properties;
    }
    get bound() {
        return this._geometry ? this._geometry.bound : null;
    }
    get edited() {
        return this._edited;
    }
    set edited(value) {
        this._edited = value;
    }
    get text() {
        return this._text;
    }
    set text(value) {
        this._text = value;
    }
    draw(ctx, projection = new _projection_web_mercator__WEBPACK_IMPORTED_MODULE_1__["WebMercator"](), extent = projection.bound, symbol = new _symbol_symbol__WEBPACK_IMPORTED_MODULE_0__["SimplePointSymbol"]()) {
        if (this.visible)
            this._geometry.draw(ctx, projection, extent, symbol instanceof _symbol_symbol__WEBPACK_IMPORTED_MODULE_0__["ClusterSymbol"] ? symbol : (this._symbol || symbol));
    }
    label(field, ctx, projection = new _projection_web_mercator__WEBPACK_IMPORTED_MODULE_1__["WebMercator"](), symbol = new _symbol_symbol__WEBPACK_IMPORTED_MODULE_0__["SimpleTextSymbol"]()) {
        if (this.visible)
            this._geometry.label(this._properties[field.name], ctx, projection, this._text || symbol);
    }
    intersect(projection = new _projection_web_mercator__WEBPACK_IMPORTED_MODULE_1__["WebMercator"](), extent = projection.bound) {
        if (this.visible)
            return this._geometry.intersect(projection, extent);
    }
    contain(screenX, screenY, event = undefined) {
        if (this.visible) {
            const flag = this._geometry.contain(screenX, screenY);
            if (event == "mousemove") {
                if (!this._contained && flag) {
                    this._handlers["mouseover"].forEach(handler => handler({ feature: this, screenX: screenX, screenY: screenY }));
                }
                else if (this._contained && !flag) {
                    this._handlers["mouseout"].forEach(handler => handler({ feature: this, screenX: screenX, screenY: screenY }));
                }
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
/* harmony import */ var _projection_web_mercator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../projection/web-mercator */ "../dist/projection/web-mercator.js");
/* harmony import */ var _util_subject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/subject */ "../dist/util/subject.js");


class Graphic extends _util_subject__WEBPACK_IMPORTED_MODULE_1__["Subject"] {
    constructor(geometry, symbol) {
        super(["click", "dblclick", "mouseover", "mouseout", "dragstart"]);
        this.visible = true;
        this._geometry = geometry;
        this._symbol = symbol;
    }
    get geometry() {
        return this._geometry;
    }
    get symbol() {
        return this._symbol;
    }
    get bound() {
        return this._geometry ? this._geometry.bound : null;
    }
    draw(ctx, projection = new _projection_web_mercator__WEBPACK_IMPORTED_MODULE_0__["WebMercator"](), extent = projection.bound) {
        if (this.visible)
            this._geometry.draw(ctx, projection, extent, this._symbol);
    }
    intersect(projection = new _projection_web_mercator__WEBPACK_IMPORTED_MODULE_0__["WebMercator"](), extent = projection.bound) {
        if (this.visible)
            return this._geometry.intersect(projection, extent);
    }
    contain(screenX, screenY, event = undefined) {
        if (this.visible) {
            const flag = this._geometry.contain(screenX, screenY);
            if (event == "mousemove") {
                if (!this._contained && flag) {
                    this._handlers["mouseover"].forEach(handler => handler({ feature: this, screenX: screenX, screenY: screenY }));
                }
                else if (this._contained && !flag) {
                    this._handlers["mouseout"].forEach(handler => handler({ feature: this, screenX: screenX, screenY: screenY }));
                }
            }
            this._contained = flag;
            return flag;
        }
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
    copy(entity) {
        Object.keys(this).forEach(property => {
            this[property] = entity[property];
        });
    }
}


/***/ }),

/***/ "../dist/geometry/geometry.js":
/*!************************************!*\
  !*** ../dist/geometry/geometry.js ***!
  \************************************/
/*! exports provided: CoordinateType, GeometryType, Geometry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoordinateType", function() { return CoordinateType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeometryType", function() { return GeometryType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Geometry", function() { return Geometry; });
/* harmony import */ var _util_bound__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/bound */ "../dist/util/bound.js");
/* harmony import */ var _symbol_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../symbol/symbol */ "../dist/symbol/symbol.js");
/* harmony import */ var _projection_web_mercator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../projection/web-mercator */ "../dist/projection/web-mercator.js");



var CoordinateType;
(function (CoordinateType) {
    CoordinateType[CoordinateType["Latlng"] = 1] = "Latlng";
    CoordinateType[CoordinateType["Projection"] = 2] = "Projection";
    CoordinateType[CoordinateType["Screen"] = 3] = "Screen";
})(CoordinateType || (CoordinateType = {}));
var GeometryType;
(function (GeometryType) {
    GeometryType[GeometryType["Point"] = 1] = "Point";
    GeometryType[GeometryType["Polyline"] = 2] = "Polyline";
    GeometryType[GeometryType["Polygon"] = 3] = "Polygon";
})(GeometryType || (GeometryType = {}));
class Geometry {
    get bound() {
        return this._bound;
    }
    toGeoJSON() { }
    project(projection) { }
    ;
    draw(ctx, projection = new _projection_web_mercator__WEBPACK_IMPORTED_MODULE_2__["WebMercator"](), extent = projection.bound, symbol = new _symbol_symbol__WEBPACK_IMPORTED_MODULE_1__["SimplePointSymbol"]()) { }
    ;
    contain(screenX, screenY) { return false; }
    intersect(projection = new _projection_web_mercator__WEBPACK_IMPORTED_MODULE_2__["WebMercator"](), extent = projection.bound) {
        if (!this._projected)
            this.project(projection);
        return extent.intersect(this._bound);
    }
    label(text, ctx, projection = new _projection_web_mercator__WEBPACK_IMPORTED_MODULE_2__["WebMercator"](), symbol = new _symbol_symbol__WEBPACK_IMPORTED_MODULE_1__["SimpleTextSymbol"]()) {
        if (!text)
            return;
        if (!this._projected)
            this.project(projection);
        ctx.save();
        ctx.strokeStyle = symbol.strokeStyle;
        ctx.fillStyle = symbol.fillStyle;
        ctx.lineWidth = symbol.lineWidth;
        ctx.lineJoin = "round";
        ctx.font = symbol.fontSize + "px/1 " + symbol.fontFamily + " " + symbol.fontWeight;
        const center = this.getCenter(CoordinateType.Projection, projection);
        const matrix = ctx.getTransform();
        //keep pixel
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        const array = text.split("/r/n");
        let widths = array.map(str => ctx.measureText(str).width + symbol.padding * 2);
        let width = Math.max(...widths);
        let height = symbol.fontSize * array.length + symbol.padding * 2 + symbol.padding * (array.length - 1);
        const screenX = (matrix.a * center[0] + matrix.e);
        const screenY = (matrix.d * center[1] + matrix.f);
        let totalX, totalY;
        switch (symbol.placement) {
            case "TOP":
                totalX = -width / 2;
                totalY = -symbol.pointSymbolHeight / 2 - height;
                break;
            case "BOTTOM":
                totalX = -width / 2;
                totalY = symbol.pointSymbolHeight / 2;
                break;
            case "RIGHT":
                totalX = symbol.pointSymbolWidth / 2;
                totalY = -height / 2;
                break;
            case "LEFT":
                totalX = -symbol.pointSymbolWidth / 2 - width;
                totalY = -height / 2;
                break;
        }
        ctx.strokeRect(screenX + totalX, screenY + totalY, width, height);
        ctx.fillRect(screenX + totalX, screenY + totalY, width, height);
        ctx.textBaseline = "top";
        ctx.fillStyle = symbol.fontColor;
        array.forEach((str, index) => {
            ctx.fillText(str, screenX + totalX + symbol.padding + (width - widths[index]) / 2, screenY + totalY + symbol.padding + index * (symbol.fontSize + symbol.padding));
        });
        ctx.restore();
    }
    ;
    measure(text, ctx, projection = new _projection_web_mercator__WEBPACK_IMPORTED_MODULE_2__["WebMercator"](), symbol = new _symbol_symbol__WEBPACK_IMPORTED_MODULE_1__["SimpleTextSymbol"]()) {
        if (!text)
            return;
        ctx.save();
        ctx.font = symbol.fontSize + "px/1 " + symbol.fontFamily + " " + symbol.fontWeight;
        const center = this.getCenter(CoordinateType.Projection, projection);
        const matrix = ctx.getTransform();
        //keep pixel
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        const array = text.split("/r/n");
        let widths = array.map(str => ctx.measureText(str).width + symbol.padding * 2);
        let width = Math.max(...widths);
        let height = symbol.fontSize * array.length + symbol.padding * 2 + symbol.padding * (array.length - 1);
        const screenX = (matrix.a * center[0] + matrix.e);
        const screenY = (matrix.d * center[1] + matrix.f);
        ctx.restore();
        let totalX, totalY;
        switch (symbol.placement) {
            case "TOP":
                totalX = -width / 2;
                totalY = -symbol.pointSymbolHeight / 2 - height;
                break;
            case "BOTTOM":
                totalX = -width / 2;
                totalY = symbol.pointSymbolHeight / 2;
                break;
            case "RIGHT":
                totalX = symbol.pointSymbolWidth / 2;
                totalY = -height / 2;
                break;
            case "LEFT":
                totalX = -symbol.pointSymbolWidth / 2 - width;
                totalY = -height / 2;
                break;
        }
        return new _util_bound__WEBPACK_IMPORTED_MODULE_0__["Bound"](screenX + totalX, screenY + totalY, screenX + totalX + width, screenY + totalY + height);
    }
    ;
    getCenter(type = CoordinateType.Latlng, projection = new _projection_web_mercator__WEBPACK_IMPORTED_MODULE_2__["WebMercator"]()) { }
    ;
    getBound(projection = new _projection_web_mercator__WEBPACK_IMPORTED_MODULE_2__["WebMercator"]()) {
        if (!this._projected)
            this.project(projection);
        return this._bound;
    }
    ;
    distance(geometry, type, ctx, projection = new _projection_web_mercator__WEBPACK_IMPORTED_MODULE_2__["WebMercator"]()) {
        const center = this.getCenter(type == CoordinateType.Screen ? CoordinateType.Projection : type, projection);
        const point = geometry.getCenter(type == CoordinateType.Screen ? CoordinateType.Projection : type, projection);
        if (type == CoordinateType.Screen) {
            const matrix = ctx.getTransform();
            const screenX1 = (matrix.a * center[0] + matrix.e), screenY1 = (matrix.d * center[1] + matrix.f);
            const screenX2 = (matrix.a * point[0] + matrix.e), screenY2 = (matrix.d * point[1] + matrix.f);
            return Math.sqrt((screenX2 - screenX1) * (screenX2 - screenX1) + (screenY2 - screenY1) * (screenY2 - screenY1));
        }
        else {
            return Math.sqrt((point[0] - center[0]) * (point[0] - center[0]) + (point[1] - center[1]) * (point[1] - center[1]));
        }
    }
}


/***/ }),

/***/ "../dist/geometry/multiple-point.js":
/*!******************************************!*\
  !*** ../dist/geometry/multiple-point.js ***!
  \******************************************/
/*! exports provided: MultiplePoint */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiplePoint", function() { return MultiplePoint; });
/* harmony import */ var _geometry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./geometry */ "../dist/geometry/geometry.js");
/* harmony import */ var _util_bound__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/bound */ "../dist/util/bound.js");
/* harmony import */ var _symbol_symbol__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../symbol/symbol */ "../dist/symbol/symbol.js");
/* harmony import */ var _projection_web_mercator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../projection/web-mercator */ "../dist/projection/web-mercator.js");
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
class MultiplePoint extends _geometry__WEBPACK_IMPORTED_MODULE_0__["Geometry"] {
    constructor(lnglats) {
        super();
        this._lnglats = lnglats;
    }
    ;
    toGeoJSON() {
        return {
            "type": "MultiPoint",
            "coordinates": this._lnglats
        };
    }
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
    draw(ctx, projection = new _projection_web_mercator__WEBPACK_IMPORTED_MODULE_3__["WebMercator"](), extent = projection.bound, symbol = new _symbol_symbol__WEBPACK_IMPORTED_MODULE_2__["SimplePointSymbol"]()) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._projected)
                this.project(projection);
            if (!extent.intersect(this._bound))
                return;
            const matrix = ctx.getTransform();
            this._screen = [];
            this._symbol = symbol;
            /*if (symbol instanceof SimpleMarkerSymbol) {
                const marker: SimpleMarkerSymbol = symbol;
                if (!marker.loaded) await marker.load();
            }*/
            this._coordinates.forEach((point) => {
                const screenX = (matrix.a * point[0] + matrix.e), screenY = (matrix.d * point[1] + matrix.f);
                this._screen.push([screenX, screenY]);
                this._symbol.draw(ctx, screenX, screenY);
                /*if (symbol instanceof SimplePointSymbol) {
                    ctx.save();
                    ctx.strokeStyle = (symbol as SimplePointSymbol).strokeStyle;
                    ctx.fillStyle = (symbol as SimplePointSymbol).fillStyle;
                    ctx.lineWidth = (symbol as SimplePointSymbol).lineWidth;
                    ctx.beginPath(); //Start path
                    //keep size
                    ctx.setTransform(1,0,0,1,0,0);
                    ctx.arc(screenX, screenY, (symbol as SimplePointSymbol).radius, 0, Math.PI * 2, true);
                    ctx.fill();
                    ctx.stroke();
                    ctx.restore();
                } else if (symbol instanceof SimpleMarkerSymbol) {
                    const marker: SimpleMarkerSymbol = symbol;
                    if (marker.icon) {
                        ctx.save();
                        const matrix = (ctx as any).getTransform();
                        //keep size
                        ctx.setTransform(1,0,0,1,0,0);
                        ctx.drawImage(marker.icon, screenX + marker.offsetX, screenY + marker.offsetY, marker.width, marker.height);
                        ctx.restore();
                    }
                }*/
            });
        });
    }
    ;
    contain(screenX, screenY) {
        return this._screen.some((point) => {
            if (this._symbol instanceof _symbol_symbol__WEBPACK_IMPORTED_MODULE_2__["SimplePointSymbol"]) {
                return Math.sqrt((point[0] - screenX) * (point[0] - screenX) + (point[1] - screenY) * (point[1] - screenY)) <= this._symbol.radius;
            }
            else if (this._symbol instanceof _symbol_symbol__WEBPACK_IMPORTED_MODULE_2__["SimpleMarkerSymbol"]) {
                return screenX >= (point[0] - this._symbol.offsetX) && screenX <= (point[0] - this._symbol.offsetX + this._symbol.width) && screenY >= (point[1] - this._symbol.offsetY) && screenY <= (point[1] - this._symbol.offsetY + this._symbol.height);
            }
        });
    }
    //TODO: now return first point center
    getCenter(type = _geometry__WEBPACK_IMPORTED_MODULE_0__["CoordinateType"].Latlng, projection = new _projection_web_mercator__WEBPACK_IMPORTED_MODULE_3__["WebMercator"]()) {
        if (!this._projected)
            this.project(projection);
        if (type = _geometry__WEBPACK_IMPORTED_MODULE_0__["CoordinateType"].Latlng) {
            return [this._lnglats[0][0], this._lnglats[0][1]];
        }
        else {
            return [this._coordinates[0][0], this._coordinates[0][1]];
        }
    }
}
//such as [[1,1],[2,2]]
//interaction: hover && identify
MultiplePoint.TOLERANCE = 0; //screen pixel


/***/ }),

/***/ "../dist/geometry/multiple-polygon.js":
/*!********************************************!*\
  !*** ../dist/geometry/multiple-polygon.js ***!
  \********************************************/
/*! exports provided: MultiplePolygon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiplePolygon", function() { return MultiplePolygon; });
/* harmony import */ var _geometry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./geometry */ "../dist/geometry/geometry.js");
/* harmony import */ var _util_bound__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/bound */ "../dist/util/bound.js");
/* harmony import */ var _symbol_symbol__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../symbol/symbol */ "../dist/symbol/symbol.js");
/* harmony import */ var _projection_web_mercator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../projection/web-mercator */ "../dist/projection/web-mercator.js");




//面
class MultiplePolygon extends _geometry__WEBPACK_IMPORTED_MODULE_0__["Geometry"] {
    constructor(lnglats) {
        super();
        this._lnglats = lnglats;
    }
    ;
    toGeoJSON() {
        return {
            "type": "MultiPolygon",
            "coordinates": this._lnglats
        };
    }
    project(projection) {
        this._projection = projection;
        this._coordinates = this._lnglats.map((polygon) => polygon.map((ring) => ring.map((point) => this._projection.project(point))));
        let xmin = Number.MAX_VALUE, ymin = Number.MAX_VALUE, xmax = -Number.MAX_VALUE, ymax = -Number.MAX_VALUE;
        this._coordinates.forEach(polygon => {
            polygon.forEach(ring => {
                ring.forEach(point => {
                    xmin = Math.min(xmin, point[0]);
                    ymin = Math.min(ymin, point[1]);
                    xmax = Math.max(xmax, point[0]);
                    ymax = Math.max(ymax, point[1]);
                });
            });
        });
        this._bound = new _util_bound__WEBPACK_IMPORTED_MODULE_1__["Bound"](xmin, ymin, xmax, ymax);
    }
    draw(ctx, projection = new _projection_web_mercator__WEBPACK_IMPORTED_MODULE_3__["WebMercator"](), extent = projection.bound, symbol = new _symbol_symbol__WEBPACK_IMPORTED_MODULE_2__["SimpleFillSymbol"]()) {
        if (!this._projected)
            this.project(projection);
        if (!extent.intersect(this._bound))
            return;
        const matrix = ctx.getTransform();
        this._screen = this._coordinates.map(polygon => polygon.map(ring => ring.map((point, index) => {
            const screenX = (matrix.a * point[0] + matrix.e), screenY = (matrix.d * point[1] + matrix.f);
            return [screenX, screenY];
        })));
        this._screen.forEach(polygon => {
            symbol.draw(ctx, polygon);
        });
        /*ctx.save();
        ctx.strokeStyle = (symbol as SimpleFillSymbol).strokeStyle;
        ctx.fillStyle = (symbol as SimpleFillSymbol).fillStyle;
        ctx.lineWidth = (symbol as SimpleFillSymbol).lineWidth;
        const matrix = (ctx as any).getTransform();
        //keep lineWidth
        ctx.setTransform(1,0,0,1,0,0);
        //TODO:  exceeding the maximum extent(bound), best way is overlap by extent. find out: maximum is [-PI*R, PI*R]??
        //TODO:  ring is not supported
        this._screen = [];
        this._coordinates.forEach( polygon => {
            const screen_polygon = [];
            this._screen.push(screen_polygon);
            ctx.beginPath();
            polygon.forEach(ring => {
                const screen_ring = [];
                screen_polygon.push(screen_ring);
                ring.forEach((point: any,index) => {
                    const screenX = (matrix.a * point[0] + matrix.e), screenY = (matrix.d * point[1] + matrix.f);
                    if (index === 0){
                        ctx.moveTo(screenX, screenY);
                    } else {
                        ctx.lineTo(screenX, screenY);
                    }
                    screen_ring.push([screenX, screenY]);
                });
            });
            ctx.closePath();
            ctx.fill("evenodd");
            ctx.stroke();
        });
        ctx.restore();*/
    }
    contain(screenX, screenY) {
        //TODO: only test first polygon, ring is not supported
        return this._screen.some(polygon => this._pointInPolygon([screenX, screenY], polygon[0]));
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
    //from Leaflet
    //TODO: now return first polygon center
    getCenter(type = _geometry__WEBPACK_IMPORTED_MODULE_0__["CoordinateType"].Latlng, projection = new _projection_web_mercator__WEBPACK_IMPORTED_MODULE_3__["WebMercator"]()) {
        if (!this._projected)
            this.project(projection);
        let i, j, p1, p2, f, area, x, y, center, points = this._coordinates[0], len = points.length;
        if (!len) {
            return null;
        }
        // polygon centroid algorithm; only uses the first ring if there are multiple
        area = x = y = 0;
        for (i = 0, j = len - 1; i < len; j = i++) {
            p1 = points[i];
            p2 = points[j];
            f = p1[1] * p2[0] - p2[1] * p1[0];
            x += (p1[0] + p2[0]) * f;
            y += (p1[1] + p2[1]) * f;
            area += f * 3;
        }
        if (area === 0) {
            // Polygon is so small that all points are on same pixel.
            center = points[0];
        }
        else {
            center = [x / area, y / area];
        }
        if (type = _geometry__WEBPACK_IMPORTED_MODULE_0__["CoordinateType"].Latlng) {
            return projection.unproject(center);
        }
        else {
            return center;
        }
    }
}


/***/ }),

/***/ "../dist/geometry/multiple-polyline.js":
/*!*********************************************!*\
  !*** ../dist/geometry/multiple-polyline.js ***!
  \*********************************************/
/*! exports provided: MultiplePolyline */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiplePolyline", function() { return MultiplePolyline; });
/* harmony import */ var _geometry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./geometry */ "../dist/geometry/geometry.js");
/* harmony import */ var _util_bound__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/bound */ "../dist/util/bound.js");
/* harmony import */ var _symbol_symbol__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../symbol/symbol */ "../dist/symbol/symbol.js");
/* harmony import */ var _projection_web_mercator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../projection/web-mercator */ "../dist/projection/web-mercator.js");
/* harmony import */ var _polyline__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./polyline */ "../dist/geometry/polyline.js");





//线
class MultiplePolyline extends _geometry__WEBPACK_IMPORTED_MODULE_0__["Geometry"] {
    constructor(lnglats) {
        super();
        this._tolerance = 4; //TOLERANCE + symbol.lineWidth
        this._lnglats = lnglats;
    }
    ;
    toGeoJSON() {
        return {
            "type": "MultiPolyline",
            "coordinates": this._lnglats
        };
    }
    project(projection) {
        this._projection = projection;
        this._coordinates = this._lnglats.map((polyline) => polyline.map((point) => this._projection.project(point)));
        let xmin = Number.MAX_VALUE, ymin = Number.MAX_VALUE, xmax = -Number.MAX_VALUE, ymax = -Number.MAX_VALUE;
        this._coordinates.forEach(polyline => {
            polyline.forEach(point => {
                xmin = Math.min(xmin, point[0]);
                ymin = Math.min(ymin, point[1]);
                xmax = Math.max(xmax, point[0]);
                ymax = Math.max(ymax, point[1]);
            });
        });
        this._bound = new _util_bound__WEBPACK_IMPORTED_MODULE_1__["Bound"](xmin, ymin, xmax, ymax);
    }
    draw(ctx, projection = new _projection_web_mercator__WEBPACK_IMPORTED_MODULE_3__["WebMercator"](), extent = projection.bound, symbol = new _symbol_symbol__WEBPACK_IMPORTED_MODULE_2__["SimpleLineSymbol"]()) {
        if (!this._projected)
            this.project(projection);
        if (!extent.intersect(this._bound))
            return;
        this._tolerance = _polyline__WEBPACK_IMPORTED_MODULE_4__["Polyline"].TOLERANCE + symbol.lineWidth;
        const matrix = ctx.getTransform();
        this._screen = this._coordinates.map(polyline => polyline.map((point, index) => {
            const screenX = (matrix.a * point[0] + matrix.e), screenY = (matrix.d * point[1] + matrix.f);
            return [screenX, screenY];
        }));
        this._screen.forEach(polyline => {
            symbol.draw(ctx, polyline);
        });
        /*ctx.save();
        ctx.strokeStyle = (symbol as SimpleLineSymbol).strokeStyle;
        ctx.lineWidth = (symbol as SimpleLineSymbol).lineWidth;
        this._tolerance = MultiplePolyline.TOLERANCE + (symbol as SimpleLineSymbol).lineWidth;
        const matrix = (ctx as any).getTransform();
        //keep lineWidth
        ctx.setTransform(1,0,0,1,0,0);
        //TODO:  exceeding the maximum extent(bound), best way is overlap by extent. find out: maximum is [-PI*R, PI*R]??
        this._screen = [];
        this._coordinates.forEach( polyline => {
            ctx.beginPath();
            const screen_polyline = [];
            this._screen.push(screen_polyline);
            polyline.forEach((point: any,index) =>{
                const screenX = (matrix.a * point[0] + matrix.e), screenY = (matrix.d * point[1] + matrix.f);
                if (index === 0) {
                    ctx.moveTo(screenX, screenY);
                } else {
                    ctx.lineTo(screenX, screenY);
                }
                screen_polyline.push([screenX, screenY]);
            });
            ctx.stroke();
        });
        ctx.restore();*/
    }
    contain(screenX, screenY) {
        let p2;
        return this._screen.some(polyline => {
            const distance = polyline.reduce((acc, cur) => {
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
        });
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
    //from Leaflet
    //TODO: now return first polyline center
    getCenter(type = _geometry__WEBPACK_IMPORTED_MODULE_0__["CoordinateType"].Latlng, projection = new _projection_web_mercator__WEBPACK_IMPORTED_MODULE_3__["WebMercator"]()) {
        if (!this._projected)
            this.project(projection);
        let i, halfDist, segDist, dist, p1, p2, ratio, points = this._coordinates[0], len = points.length;
        if (!len) {
            return null;
        }
        // polyline centroid algorithm; only uses the first ring if there are multiple
        for (i = 0, halfDist = 0; i < len - 1; i++) {
            halfDist += Math.sqrt((points[i + 1][0] - points[i][0]) * (points[i + 1][0] - points[i][0]) + (points[i + 1][1] - points[i][1]) * (points[i + 1][1] - points[i][1])) / 2;
        }
        let center;
        // The line is so small in the current view that all points are on the same pixel.
        if (halfDist === 0) {
            center = points[0];
        }
        for (i = 0, dist = 0; i < len - 1; i++) {
            p1 = points[i];
            p2 = points[i + 1];
            segDist = Math.sqrt((p2[0] - p1[0]) * (p2[0] - p1[0]) + (p2[1] - p1[1]) * (p2[1] - p1[1]));
            dist += segDist;
            if (dist > halfDist) {
                ratio = (dist - halfDist) / segDist;
                center = [
                    p2[0] - ratio * (p2[0] - p1[0]),
                    p2[1] - ratio * (p2[1] - p1[1])
                ];
            }
        }
        if (type = _geometry__WEBPACK_IMPORTED_MODULE_0__["CoordinateType"].Latlng) {
            return projection.unproject(center);
        }
        else {
            return center;
        }
    }
}
//[polyline[point[xy]]]
//such as [[[1,1],[2,2]],[[3,3],[4,4]]]
//interaction: hover && identify
MultiplePolyline.TOLERANCE = 4; //screen pixel


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
/* harmony import */ var _projection_web_mercator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../projection/web-mercator */ "../dist/projection/web-mercator.js");
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
    get lng() {
        return this._lng;
    }
    get lat() {
        return this._lat;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    ;
    toGeoJSON() {
        return {
            "type": "Point",
            "coordinates": [this._lng, this._lat]
        };
    }
    project(projection) {
        this._projection = projection;
        [this._x, this._y] = this._projection.project([this._lng, this._lat]);
        //TODO: bound tolerance
        this._bound = new _util_bound__WEBPACK_IMPORTED_MODULE_1__["Bound"](this._x, this._y, this._x, this._y);
        this._projected = true;
    }
    move(ctx, projection, screenX, screenY) {
        const matrix = ctx.getTransform();
        this._screenX = screenX;
        this._screenY = screenY;
        this._x = (this._screenX - matrix.e) / matrix.a;
        this._y = (this._screenY - matrix.f) / matrix.d;
        this._bound = new _util_bound__WEBPACK_IMPORTED_MODULE_1__["Bound"](this._x, this._y, this._x, this._y);
        this._projection = projection;
        [this._lng, this._lat] = this._projection.unproject([this._x, this._y]);
        this._projected = true;
    }
    draw(ctx, projection = new _projection_web_mercator__WEBPACK_IMPORTED_MODULE_3__["WebMercator"](), extent = projection.bound, symbol = new _symbol_symbol__WEBPACK_IMPORTED_MODULE_2__["SimplePointSymbol"]()) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._projected)
                this.project(projection);
            if (!extent.intersect(this._bound))
                return;
            const matrix = ctx.getTransform();
            this._screenX = (matrix.a * this._x + matrix.e);
            this._screenY = (matrix.d * this._y + matrix.f);
            this._symbol = symbol;
            this._symbol.draw(ctx, this._screenX, this._screenY);
            /*if (symbol instanceof SimplePointSymbol) {
                ctx.save();
                ctx.strokeStyle = (symbol as SimplePointSymbol).strokeStyle;
                ctx.fillStyle = (symbol as SimplePointSymbol).fillStyle;
                ctx.lineWidth = (symbol as SimplePointSymbol).lineWidth;
                ctx.beginPath(); //Start path
                //keep size
                //地理坐标 转回 屏幕坐标
                ctx.setTransform(1,0,0,1,0,0);
                ctx.arc(this._screenX, this._screenY, (symbol as SimplePointSymbol).radius, 0, Math.PI * 2, true);
                ctx.fill();
                ctx.stroke();
                ctx.restore();
            } else if (symbol instanceof SimpleMarkerSymbol) {
                const marker: SimpleMarkerSymbol = symbol;
                if (!marker.loaded) await marker.load();
                if (marker.icon) {
                    ctx.save();
                    const matrix = (ctx as any).getTransform();
                    //keep size
                    ctx.setTransform(1,0,0,1,0,0);
                    ctx.drawImage(marker.icon, this._screenX + marker.offsetX, this._screenY + marker.offsetY, marker.width, marker.height);
                    ctx.restore();
                }
            } else if (symbol instanceof LetterSymbol) {
                const letter: LetterSymbol = symbol;
                ctx.save();
                ctx.strokeStyle = letter.strokeStyle;
                ctx.fillStyle = letter.fillStyle;
                ctx.lineWidth = letter.lineWidth;
                ctx.beginPath(); //Start path
                //keep size
                ctx.setTransform(1,0,0,1,0,0);
                ctx.arc(this._screenX, this._screenY, letter.radius, 0, Math.PI * 2, true);
                ctx.fill();
                ctx.stroke();
                ctx.textBaseline = "middle";
                ctx.textAlign = "center";
                ctx.fillStyle = letter.fontColor;
                ctx.font =  letter.fontSize + "px/1 " + letter.fontFamily +  " " + letter.fontWeight;
                ctx.fillText(letter.letter, this._screenX, this._screenY);
                ctx.restore();
            } else if (symbol instanceof VertexSymbol) {
                ctx.save();
                ctx.strokeStyle = (symbol as VertexSymbol).strokeStyle;
                ctx.fillStyle = (symbol as VertexSymbol).fillStyle;
                ctx.lineWidth = (symbol as VertexSymbol).lineWidth;
                ctx.beginPath(); //Start path
                //keep size
                ctx.setTransform(1,0,0,1,0,0);
                const size = (symbol as VertexSymbol).size;
                ctx.rect(this._screenX - size/2, this._screenY - size/2, size, size);
                ctx.fill();
                ctx.stroke();
                ctx.restore();
            } else if (symbol instanceof ClusterSymbol) {
                const cluster: ClusterSymbol = symbol;
                ctx.save();
                ctx.setTransform(1,0,0,1,0,0);
                ctx.strokeStyle = cluster.strokeStyle;
                ctx.fillStyle = cluster.outerFillStyle;
                ctx.lineWidth = cluster.lineWidth;
                ctx.beginPath(); //Start path
                //keep size
                ctx.arc(this._screenX, this._screenY, cluster.outer, 0, Math.PI * 2, true);
                ctx.fill();
                ctx.stroke();
                ctx.fillStyle = cluster.innerFillStyle;
                ctx.beginPath(); //Start path
                //keep size
                ctx.arc(this._screenX, this._screenY, cluster.inner, 0, Math.PI * 2, true);
                ctx.fill();
                ctx.stroke();
                ctx.textBaseline = "middle";
                ctx.textAlign = "center";
                ctx.fillStyle = cluster.fontColor;
                ctx.font =  cluster.fontSize + "px/1 " + cluster.fontFamily +  " " + cluster.fontWeight;
                ctx.fillText(cluster.text, this._screenX, this._screenY);
                ctx.restore();
            }*/
        });
    }
    ;
    contain(screenX, screenY) {
        /*if (this._symbol instanceof SimplePointSymbol) {
            return Math.sqrt((this._screenX - screenX) *  (this._screenX - screenX) +  (this._screenY - screenY) *  (this._screenY - screenY)) <= (this._symbol as SimplePointSymbol).radius;
        } else if (this._symbol instanceof SimpleMarkerSymbol) {
            return screenX >= (this._screenX + this._symbol.offsetX) &&  screenX <= (this._screenX + this._symbol.offsetX + this._symbol.width) && screenY >= (this._screenY + this._symbol.offsetY) &&  screenY <= (this._screenY + this._symbol.offsetY + this._symbol.height);
        } else if (this._symbol instanceof LetterSymbol) {
            return Math.sqrt((this._screenX - screenX) *  (this._screenX - screenX) +  (this._screenY - screenY) *  (this._screenY - screenY)) <= (this._symbol as LetterSymbol).radius;
        } else if (this._symbol instanceof VertexSymbol) {
            return screenX >= (this._screenX - this._symbol.size / 2) &&  screenX <= (this._screenX + this._symbol.size / 2) && screenY >= (this._screenY - this._symbol.size / 2) &&  screenY <= (this._screenY + this._symbol.size / 2);
        }*/
        return this._symbol ? this._symbol.contain(this._screenX, this._screenY, screenX, screenY) : false;
    }
    getCenter(type = _geometry__WEBPACK_IMPORTED_MODULE_0__["CoordinateType"].Latlng, projection = new _projection_web_mercator__WEBPACK_IMPORTED_MODULE_3__["WebMercator"]()) {
        if (!this._projected)
            this.project(projection);
        if (type === _geometry__WEBPACK_IMPORTED_MODULE_0__["CoordinateType"].Latlng) {
            return [this._lng, this._lat];
        }
        else {
            return [this._x, this._y];
        }
    }
}
//bound
Point.BOUND_TOLERANCE = 10; //meter
//interaction: hover && identify
Point.INTERACTION_TOLERANCE = 0; //screen pixel


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
/* harmony import */ var _projection_web_mercator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../projection/web-mercator */ "../dist/projection/web-mercator.js");




//面
class Polygon extends _geometry__WEBPACK_IMPORTED_MODULE_0__["Geometry"] {
    constructor(lnglats) {
        super();
        this._lnglats = lnglats;
    }
    get lnglats() {
        return this._lnglats;
    }
    ;
    toGeoJSON() {
        return {
            "type": "Polygon",
            "coordinates": this._lnglats
        };
    }
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
    splice(ctx, projection, lnglat, screenX = undefined, screenY = undefined, replaced = true) {
        if (screenX == undefined && screenY == undefined) {
            this._lnglats.forEach(ring => {
                const index = ring.findIndex(point => point[0] == lnglat[0] && point[1] == lnglat[1]);
                ring.length > 3 && index != -1 && ring.splice(index, 1);
            });
        }
        else {
            const matrix = ctx.getTransform();
            const x = (screenX - matrix.e) / matrix.a;
            const y = (screenY - matrix.f) / matrix.d;
            this._projection = projection;
            const [lng, lat] = this._projection.unproject([x, y]);
            this._lnglats.forEach(ring => {
                const index = ring.findIndex(point => point[0] == lnglat[0] && point[1] == lnglat[1]);
                index != -1 && ring.splice(index, replaced ? 1 : 0, [lng, lat]);
            });
        }
        this.project(projection);
    }
    draw(ctx, projection = new _projection_web_mercator__WEBPACK_IMPORTED_MODULE_3__["WebMercator"](), extent = projection.bound, symbol = new _symbol_symbol__WEBPACK_IMPORTED_MODULE_2__["SimpleFillSymbol"]()) {
        if (!this._projected)
            this.project(projection);
        if (!extent.intersect(this._bound))
            return;
        const matrix = ctx.getTransform();
        this._screen = this._coordinates.map(ring => {
            return ring.map((point, index) => {
                const screenX = (matrix.a * point[0] + matrix.e), screenY = (matrix.d * point[1] + matrix.f);
                return [screenX, screenY];
            });
        });
        symbol.draw(ctx, this._screen);
        /*ctx.save();
        ctx.strokeStyle = (symbol as SimpleFillSymbol).strokeStyle;
        ctx.fillStyle = (symbol as SimpleFillSymbol).fillStyle;
        ctx.lineWidth = (symbol as SimpleFillSymbol).lineWidth;
        //keep lineWidth
        ctx.setTransform(1,0,0,1,0,0);
        //TODO:  exceeding the maximum extent(bound), best way is overlap by extent. find out: maximum is [-PI*R, PI*R]??
        this._screen = [];
        ctx.beginPath();
        this._coordinates.forEach( ring => {
            const temp = [];
            this._screen.push(temp);
            ring.forEach((point: any,index) => {
                const screenX = (matrix.a * point[0] + matrix.e), screenY = (matrix.d * point[1] + matrix.f);
                if (index === 0){
                    ctx.moveTo(screenX, screenY);
                } else {
                    ctx.lineTo(screenX, screenY);
                }
                temp.push([screenX, screenY]);
            });
        });
        ctx.closePath();
        ctx.fill("evenodd");
        ctx.stroke();
        ctx.restore();*/
    }
    contain(screenX, screenY) {
        const first = this._screen[0];
        const others = this._screen.slice(1);
        //first ring contained && others no contained
        return this._pointInPolygon([screenX, screenY], first) && others.every(ring => !this._pointInPolygon([screenX, screenY], ring));
        //return this._screen.some(ring => this._pointInPolygon([screenX, screenY], ring));
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
    //from Leaflet
    getCenter(type = _geometry__WEBPACK_IMPORTED_MODULE_0__["CoordinateType"].Latlng, projection = new _projection_web_mercator__WEBPACK_IMPORTED_MODULE_3__["WebMercator"]()) {
        if (!this._projected)
            this.project(projection);
        let i, j, p1, p2, f, area, x, y, center, points = this._coordinates[0], len = points.length;
        if (!len) {
            return null;
        }
        // polygon centroid algorithm; only uses the first ring if there are multiple
        area = x = y = 0;
        for (i = 0, j = len - 1; i < len; j = i++) {
            p1 = points[i];
            p2 = points[j];
            f = p1[1] * p2[0] - p2[1] * p1[0];
            x += (p1[0] + p2[0]) * f;
            y += (p1[1] + p2[1]) * f;
            area += f * 3;
        }
        if (area === 0) {
            // Polygon is so small that all points are on same pixel.
            center = points[0];
        }
        else {
            center = [x / area, y / area];
        }
        if (type === _geometry__WEBPACK_IMPORTED_MODULE_0__["CoordinateType"].Latlng) {
            return projection.unproject(center);
        }
        else {
            return center;
        }
    }
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
/* harmony import */ var _projection_web_mercator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../projection/web-mercator */ "../dist/projection/web-mercator.js");




//线
class Polyline extends _geometry__WEBPACK_IMPORTED_MODULE_0__["Geometry"] {
    constructor(lnglats) {
        super();
        this._tolerance = 4; //TOLERANCE + symbol.lineWidth
        this._lnglats = lnglats;
    }
    get lnglats() {
        return this._lnglats;
    }
    ;
    toGeoJSON() {
        return {
            "type": "LineString",
            "coordinates": this._lnglats
        };
    }
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
    splice(ctx, projection, lnglat, screenX = undefined, screenY = undefined, replaced = true) {
        if (screenX == undefined && screenY == undefined) {
            const index = this._lnglats.findIndex(point => point[0] == lnglat[0] && point[1] == lnglat[1]);
            this._lnglats.length > 2 && index != -1 && this._lnglats.splice(index, 1);
        }
        else {
            const matrix = ctx.getTransform();
            const x = (screenX - matrix.e) / matrix.a;
            const y = (screenY - matrix.f) / matrix.d;
            this._projection = projection;
            const [lng, lat] = this._projection.unproject([x, y]);
            const index = this._lnglats.findIndex(point => point[0] == lnglat[0] && point[1] == lnglat[1]);
            index != -1 && this._lnglats.splice(index, replaced ? 1 : 0, [lng, lat]);
        }
        this.project(projection);
    }
    draw(ctx, projection = new _projection_web_mercator__WEBPACK_IMPORTED_MODULE_3__["WebMercator"](), extent = projection.bound, symbol = new _symbol_symbol__WEBPACK_IMPORTED_MODULE_2__["SimpleLineSymbol"]()) {
        if (!this._projected)
            this.project(projection);
        if (!extent.intersect(this._bound))
            return;
        this._tolerance = Polyline.TOLERANCE + symbol.lineWidth;
        const matrix = ctx.getTransform();
        this._screen = this._coordinates.map((point, index) => {
            const screenX = (matrix.a * point[0] + matrix.e), screenY = (matrix.d * point[1] + matrix.f);
            return [screenX, screenY];
        });
        symbol.draw(ctx, this._screen);
        //TODO:  exceeding the maximum extent(bound), best way is overlap by extent. find out: maximum is [-PI*R, PI*R]??
        /*ctx.save();
        ctx.strokeStyle = (symbol as SimpleLineSymbol).strokeStyle;
        ctx.lineWidth = (symbol as SimpleLineSymbol).lineWidth;
        //keep lineWidth
        ctx.setTransform(1,0,0,1,0,0);
        this._screen = [];
        ctx.beginPath();
        this._coordinates.forEach( (point: any,index) => {
            const screenX = (matrix.a * point[0] + matrix.e), screenY = (matrix.d * point[1] + matrix.f);
            if (index === 0){
                ctx.moveTo(screenX, screenY);
            } else {
                ctx.lineTo(screenX, screenY);
            }
            this._screen.push([screenX, screenY]);
        });
        ctx.stroke();
        if (symbol instanceof ArrowSymbol) {
            const arrow: ArrowSymbol = symbol;
            this._screen.reduce( (prev, cur) => {
                if (prev) {
                    const length = Math.sqrt((cur[0] - prev[0]) * (cur[0] - prev[0]) + (cur[1] - prev[1]) * (cur[1] - prev[1]));
                    if (length >= arrow.minLength) {
                        //中点 即箭头
                        const [middleX, middleY] = [(prev[0] + cur[0])/2, (prev[1] + cur[1])/2];
                        //箭尾垂线的垂足
                        const [footX, footY] = this._getPointAlongLine([middleX, middleY], prev, Math.cos(arrow.arrowAngle) * arrow.arrowLength);
                        const k = (cur[1] - prev[1]) / (cur[0] - prev[0]);
                        // 1/k 垂线
                        const points = this._getPointAlongLine2( -1/k, footY - footX * -1/k, [footX, footY], Math.sin(arrow.arrowAngle) * arrow.arrowLength);
                        //两点
                        points.forEach(point => {
                            ctx.beginPath();
                            ctx.moveTo(middleX, middleY);
                            ctx.lineTo(point[0], point[1]);
                            ctx.stroke();
                        });
                    }
                    return cur;
                } else {
                    return cur;
                }
            });
        }
        ctx.restore();*/
    }
    /*//已知 起点和终点  求沿线距起点定长的点
    _getPointAlongLine(p1, p2, d) {
        //line length
        let l = Math.sqrt((p2[0] - p1[0]) * (p2[0] - p1[0]) + (p2[1] - p1[1]) * (p2[1] - p1[1]));
        let t = d / l;
        return [(1 - t) * p1[0] + t * p2[0], (1 - t) * p1[1] + t * p2[1]];
    }

    //已知 起点 y = kx + b   求沿线距起点定长的点 两个点
    _getPointAlongLine2(k, b, p, d) {
        let x0 = p[0] + Math.sqrt( (d * d) / (k * k + 1)), x1 = p[0] - Math.sqrt( (d * d) / (k * k + 1));
        return [[x0, k * x0 + b], [x1, k * x1 + b]];
    }*/
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
    //from Leaflet
    getCenter(type = _geometry__WEBPACK_IMPORTED_MODULE_0__["CoordinateType"].Latlng, projection = new _projection_web_mercator__WEBPACK_IMPORTED_MODULE_3__["WebMercator"]()) {
        if (!this._projected)
            this.project(projection);
        let i, halfDist, segDist, dist, p1, p2, ratio, points = this._coordinates, len = points.length;
        if (!len) {
            return null;
        }
        // polyline centroid algorithm; only uses the first ring if there are multiple
        for (i = 0, halfDist = 0; i < len - 1; i++) {
            halfDist += Math.sqrt((points[i + 1][0] - points[i][0]) * (points[i + 1][0] - points[i][0]) + (points[i + 1][1] - points[i][1]) * (points[i + 1][1] - points[i][1])) / 2;
        }
        let center;
        // The line is so small in the current view that all points are on the same pixel.
        if (halfDist === 0) {
            center = points[0];
        }
        for (i = 0, dist = 0; i < len - 1; i++) {
            p1 = points[i];
            p2 = points[i + 1];
            segDist = Math.sqrt((p2[0] - p1[0]) * (p2[0] - p1[0]) + (p2[1] - p1[1]) * (p2[1] - p1[1]));
            dist += segDist;
            if (dist > halfDist) {
                ratio = (dist - halfDist) / segDist;
                center = [
                    p2[0] - ratio * (p2[0] - p1[0]),
                    p2[1] - ratio * (p2[1] - p1[1])
                ];
            }
        }
        if (type === _geometry__WEBPACK_IMPORTED_MODULE_0__["CoordinateType"].Latlng) {
            return projection.unproject(center);
        }
        else {
            return center;
        }
    }
}
//[point[xy]]
//such as [[1,1],[2,2]]
//interaction: hover && identify
Polyline.TOLERANCE = 4; //screen pixel


/***/ }),

/***/ "../dist/index.js":
/*!************************!*\
  !*** ../dist/index.js ***!
  \************************/
/*! exports provided: Map, Viewer, Entity, FeatureClass, FieldType, Field, EditorActionType, Editor, Graphic, Feature, CoordinateType, GeometryType, Geometry, Point, Polyline, Polygon, MultiplePoint, MultiplePolyline, MultiplePolygon, Layer, GraphicLayer, FeatureLayer, Collision, NullCollision, SimpleCollision, CoverCollision, Label, Tooltip, Symbol, PointSymbol, LineSymbol, FillSymbol, SimplePointSymbol, GradientPointSymbol, SimpleLineSymbol, SimpleFillSymbol, SimpleMarkerSymbol, SimpleTextSymbol, LetterSymbol, ArrowSymbol, VertexSymbol, ClusterSymbol, Renderer, SimpleRenderer, CategoryRendererItem, CategoryRenderer, ClassRendererItem, ClassRenderer, LatLngType, Projection, WebMercator, BD09, GCJ02, Utility, Bound, Color, Subject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map */ "../dist/map.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Map", function() { return _map__WEBPACK_IMPORTED_MODULE_0__["Map"]; });

/* harmony import */ var _viewer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./viewer */ "../dist/viewer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Viewer", function() { return _viewer__WEBPACK_IMPORTED_MODULE_1__["Viewer"]; });

/* harmony import */ var _entity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./entity */ "../dist/entity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Entity", function() { return _entity__WEBPACK_IMPORTED_MODULE_2__["Entity"]; });

/* harmony import */ var _data_feature_class__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data/feature-class */ "../dist/data/feature-class.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FeatureClass", function() { return _data_feature_class__WEBPACK_IMPORTED_MODULE_3__["FeatureClass"]; });

/* harmony import */ var _data_field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./data/field */ "../dist/data/field.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FieldType", function() { return _data_field__WEBPACK_IMPORTED_MODULE_4__["FieldType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Field", function() { return _data_field__WEBPACK_IMPORTED_MODULE_4__["Field"]; });

/* harmony import */ var _editor_editor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor/editor */ "../dist/editor/editor.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EditorActionType", function() { return _editor_editor__WEBPACK_IMPORTED_MODULE_5__["EditorActionType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Editor", function() { return _editor_editor__WEBPACK_IMPORTED_MODULE_5__["Editor"]; });

/* harmony import */ var _element_graphic__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./element/graphic */ "../dist/element/graphic.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Graphic", function() { return _element_graphic__WEBPACK_IMPORTED_MODULE_6__["Graphic"]; });

/* harmony import */ var _element_feature__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./element/feature */ "../dist/element/feature.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Feature", function() { return _element_feature__WEBPACK_IMPORTED_MODULE_7__["Feature"]; });

/* harmony import */ var _geometry_geometry__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./geometry/geometry */ "../dist/geometry/geometry.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CoordinateType", function() { return _geometry_geometry__WEBPACK_IMPORTED_MODULE_8__["CoordinateType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GeometryType", function() { return _geometry_geometry__WEBPACK_IMPORTED_MODULE_8__["GeometryType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Geometry", function() { return _geometry_geometry__WEBPACK_IMPORTED_MODULE_8__["Geometry"]; });

/* harmony import */ var _geometry_point__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./geometry/point */ "../dist/geometry/point.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Point", function() { return _geometry_point__WEBPACK_IMPORTED_MODULE_9__["Point"]; });

/* harmony import */ var _geometry_polyline__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./geometry/polyline */ "../dist/geometry/polyline.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Polyline", function() { return _geometry_polyline__WEBPACK_IMPORTED_MODULE_10__["Polyline"]; });

/* harmony import */ var _geometry_polygon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./geometry/polygon */ "../dist/geometry/polygon.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Polygon", function() { return _geometry_polygon__WEBPACK_IMPORTED_MODULE_11__["Polygon"]; });

/* harmony import */ var _geometry_multiple_point__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./geometry/multiple-point */ "../dist/geometry/multiple-point.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MultiplePoint", function() { return _geometry_multiple_point__WEBPACK_IMPORTED_MODULE_12__["MultiplePoint"]; });

/* harmony import */ var _geometry_multiple_polyline__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./geometry/multiple-polyline */ "../dist/geometry/multiple-polyline.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MultiplePolyline", function() { return _geometry_multiple_polyline__WEBPACK_IMPORTED_MODULE_13__["MultiplePolyline"]; });

/* harmony import */ var _geometry_multiple_polygon__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./geometry/multiple-polygon */ "../dist/geometry/multiple-polygon.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MultiplePolygon", function() { return _geometry_multiple_polygon__WEBPACK_IMPORTED_MODULE_14__["MultiplePolygon"]; });

/* harmony import */ var _layer_layer__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./layer/layer */ "../dist/layer/layer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Layer", function() { return _layer_layer__WEBPACK_IMPORTED_MODULE_15__["Layer"]; });

/* harmony import */ var _layer_graphic_layer__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./layer/graphic-layer */ "../dist/layer/graphic-layer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GraphicLayer", function() { return _layer_graphic_layer__WEBPACK_IMPORTED_MODULE_16__["GraphicLayer"]; });

/* harmony import */ var _layer_feature_layer__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./layer/feature-layer */ "../dist/layer/feature-layer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FeatureLayer", function() { return _layer_feature_layer__WEBPACK_IMPORTED_MODULE_17__["FeatureLayer"]; });

/* harmony import */ var _label_collision__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./label/collision */ "../dist/label/collision.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Collision", function() { return _label_collision__WEBPACK_IMPORTED_MODULE_18__["Collision"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NullCollision", function() { return _label_collision__WEBPACK_IMPORTED_MODULE_18__["NullCollision"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SimpleCollision", function() { return _label_collision__WEBPACK_IMPORTED_MODULE_18__["SimpleCollision"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CoverCollision", function() { return _label_collision__WEBPACK_IMPORTED_MODULE_18__["CoverCollision"]; });

/* harmony import */ var _label_label__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./label/label */ "../dist/label/label.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Label", function() { return _label_label__WEBPACK_IMPORTED_MODULE_19__["Label"]; });

/* harmony import */ var _tooltip_tooltip__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./tooltip/tooltip */ "../dist/tooltip/tooltip.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Tooltip", function() { return _tooltip_tooltip__WEBPACK_IMPORTED_MODULE_20__["Tooltip"]; });

/* harmony import */ var _symbol_symbol__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./symbol/symbol */ "../dist/symbol/symbol.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Symbol", function() { return _symbol_symbol__WEBPACK_IMPORTED_MODULE_21__["Symbol"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PointSymbol", function() { return _symbol_symbol__WEBPACK_IMPORTED_MODULE_21__["PointSymbol"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LineSymbol", function() { return _symbol_symbol__WEBPACK_IMPORTED_MODULE_21__["LineSymbol"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FillSymbol", function() { return _symbol_symbol__WEBPACK_IMPORTED_MODULE_21__["FillSymbol"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SimplePointSymbol", function() { return _symbol_symbol__WEBPACK_IMPORTED_MODULE_21__["SimplePointSymbol"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GradientPointSymbol", function() { return _symbol_symbol__WEBPACK_IMPORTED_MODULE_21__["GradientPointSymbol"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SimpleLineSymbol", function() { return _symbol_symbol__WEBPACK_IMPORTED_MODULE_21__["SimpleLineSymbol"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SimpleFillSymbol", function() { return _symbol_symbol__WEBPACK_IMPORTED_MODULE_21__["SimpleFillSymbol"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SimpleMarkerSymbol", function() { return _symbol_symbol__WEBPACK_IMPORTED_MODULE_21__["SimpleMarkerSymbol"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SimpleTextSymbol", function() { return _symbol_symbol__WEBPACK_IMPORTED_MODULE_21__["SimpleTextSymbol"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LetterSymbol", function() { return _symbol_symbol__WEBPACK_IMPORTED_MODULE_21__["LetterSymbol"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ArrowSymbol", function() { return _symbol_symbol__WEBPACK_IMPORTED_MODULE_21__["ArrowSymbol"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VertexSymbol", function() { return _symbol_symbol__WEBPACK_IMPORTED_MODULE_21__["VertexSymbol"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClusterSymbol", function() { return _symbol_symbol__WEBPACK_IMPORTED_MODULE_21__["ClusterSymbol"]; });

/* harmony import */ var _renderer_renderer__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./renderer/renderer */ "../dist/renderer/renderer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Renderer", function() { return _renderer_renderer__WEBPACK_IMPORTED_MODULE_22__["Renderer"]; });

/* harmony import */ var _renderer_simple_renderer__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./renderer/simple-renderer */ "../dist/renderer/simple-renderer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SimpleRenderer", function() { return _renderer_simple_renderer__WEBPACK_IMPORTED_MODULE_23__["SimpleRenderer"]; });

/* harmony import */ var _renderer_category_renderer__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./renderer/category-renderer */ "../dist/renderer/category-renderer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CategoryRendererItem", function() { return _renderer_category_renderer__WEBPACK_IMPORTED_MODULE_24__["CategoryRendererItem"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CategoryRenderer", function() { return _renderer_category_renderer__WEBPACK_IMPORTED_MODULE_24__["CategoryRenderer"]; });

/* harmony import */ var _renderer_class_renderer__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./renderer/class-renderer */ "../dist/renderer/class-renderer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClassRendererItem", function() { return _renderer_class_renderer__WEBPACK_IMPORTED_MODULE_25__["ClassRendererItem"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClassRenderer", function() { return _renderer_class_renderer__WEBPACK_IMPORTED_MODULE_25__["ClassRenderer"]; });

/* harmony import */ var _projection_projection__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./projection/projection */ "../dist/projection/projection.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LatLngType", function() { return _projection_projection__WEBPACK_IMPORTED_MODULE_26__["LatLngType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Projection", function() { return _projection_projection__WEBPACK_IMPORTED_MODULE_26__["Projection"]; });

/* harmony import */ var _projection_web_mercator__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./projection/web-mercator */ "../dist/projection/web-mercator.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebMercator", function() { return _projection_web_mercator__WEBPACK_IMPORTED_MODULE_27__["WebMercator"]; });

/* harmony import */ var _projection_bd09__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./projection/bd09 */ "../dist/projection/bd09.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BD09", function() { return _projection_bd09__WEBPACK_IMPORTED_MODULE_28__["BD09"]; });

/* harmony import */ var _projection_gcj02__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./projection/gcj02 */ "../dist/projection/gcj02.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GCJ02", function() { return _projection_gcj02__WEBPACK_IMPORTED_MODULE_29__["GCJ02"]; });

/* harmony import */ var _util_utility__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./util/utility */ "../dist/util/utility.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Utility", function() { return _util_utility__WEBPACK_IMPORTED_MODULE_30__["Utility"]; });

/* harmony import */ var _util_bound__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./util/bound */ "../dist/util/bound.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Bound", function() { return _util_bound__WEBPACK_IMPORTED_MODULE_31__["Bound"]; });

/* harmony import */ var _util_color__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./util/color */ "../dist/util/color.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Color", function() { return _util_color__WEBPACK_IMPORTED_MODULE_32__["Color"]; });

/* harmony import */ var _util_subject__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./util/subject */ "../dist/util/subject.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Subject", function() { return _util_subject__WEBPACK_IMPORTED_MODULE_33__["Subject"]; });





































/***/ }),

/***/ "../dist/label/collision.js":
/*!**********************************!*\
  !*** ../dist/label/collision.js ***!
  \**********************************/
/*! exports provided: Collision, NullCollision, SimpleCollision, CoverCollision */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Collision", function() { return Collision; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NullCollision", function() { return NullCollision; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimpleCollision", function() { return SimpleCollision; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoverCollision", function() { return CoverCollision; });
/* harmony import */ var _geometry_geometry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../geometry/geometry */ "../dist/geometry/geometry.js");
/* harmony import */ var _projection_web_mercator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../projection/web-mercator */ "../dist/projection/web-mercator.js");
/* harmony import */ var _symbol_symbol__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../symbol/symbol */ "../dist/symbol/symbol.js");



//碰撞冲突
class Collision {
    test(features, field, symbol, ctx, projection = new _projection_web_mercator__WEBPACK_IMPORTED_MODULE_1__["WebMercator"]()) { return []; }
}
class NullCollision {
    test(features, field, symbol, ctx, projection = new _projection_web_mercator__WEBPACK_IMPORTED_MODULE_1__["WebMercator"]()) {
        return features;
    }
}
//简单碰撞冲突  距离判断
class SimpleCollision {
    constructor() {
        this.distance = 50; //pixel
    }
    test(features, field, symbol, ctx, projection = new _projection_web_mercator__WEBPACK_IMPORTED_MODULE_1__["WebMercator"]()) {
        return features.reduce((acc, cur) => {
            const item = acc.find((item) => {
                const distance = cur.geometry.distance(item.geometry, _geometry_geometry__WEBPACK_IMPORTED_MODULE_0__["CoordinateType"].Screen, ctx, projection);
                return distance <= this.distance;
            });
            if (!item)
                acc.push(cur);
            return acc;
        }, []); // [feature]
    }
}
//叠盖碰撞冲突  叠盖判断
class CoverCollision {
    constructor() {
        //drawn label bounds
        this._bounds = [];
        this.buffer = 10; //pixel
    }
    test(features, field, symbol, ctx, projection = new _projection_web_mercator__WEBPACK_IMPORTED_MODULE_1__["WebMercator"]()) {
        if (!field || !symbol)
            return [];
        this._bounds = [];
        const measure = (feature, symbol) => {
            const bound = feature.geometry.measure(feature.properties[field.name], ctx, projection, symbol);
            bound.buffer(this.buffer);
            if (bound) {
                const item = this._bounds.find(item => item.intersect(bound));
                if (!item) {
                    return bound;
                }
            }
            return null;
        };
        const replace = (feature, symbol, count) => {
            const symbol2 = new _symbol_symbol__WEBPACK_IMPORTED_MODULE_2__["SimpleTextSymbol"]();
            symbol2.copy(symbol);
            symbol2.replacement();
            const bound = measure(feature, symbol2);
            if (bound) {
                return [bound, symbol2];
            }
            else {
                if (count == 0) {
                    return [null, null];
                }
                else {
                    count -= 1;
                    return replace(feature, symbol2, count);
                }
            }
        };
        return features.reduce((acc, cur) => {
            cur.text = null;
            let bound = measure(cur, symbol);
            if (bound) {
                acc.push(cur);
                this._bounds.push(bound);
            }
            else {
                if (symbol.auto) {
                    const [bound, symbol2] = replace(cur, symbol, 3); //一共4个方向，再测试剩余3个方向
                    if (bound) {
                        cur.text = symbol2;
                        acc.push(cur);
                        this._bounds.push(bound);
                    }
                }
            }
            return acc;
        }, []); // [feature]
    }
}


/***/ }),

/***/ "../dist/label/label.js":
/*!******************************!*\
  !*** ../dist/label/label.js ***!
  \******************************/
/*! exports provided: Label */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Label", function() { return Label; });
/* harmony import */ var _symbol_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../symbol/symbol */ "../dist/symbol/symbol.js");
/* harmony import */ var _collision__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./collision */ "../dist/label/collision.js");
/* harmony import */ var _projection_web_mercator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../projection/web-mercator */ "../dist/projection/web-mercator.js");



class Label {
    constructor() {
        this.symbol = new _symbol_symbol__WEBPACK_IMPORTED_MODULE_0__["SimpleTextSymbol"]();
        this.collision = new _collision__WEBPACK_IMPORTED_MODULE_1__["SimpleCollision"]();
    }
    draw(features, ctx, projection = new _projection_web_mercator__WEBPACK_IMPORTED_MODULE_2__["WebMercator"]()) {
        const remain = this.collision.test(features, this.field, this.symbol, ctx, projection);
        remain.forEach((feature) => {
            feature.label(this.field, ctx, projection, this.symbol);
        });
    }
}


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
/* harmony import */ var _projection_web_mercator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../projection/web-mercator */ "../dist/projection/web-mercator.js");
/* harmony import */ var _renderer_simple_renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../renderer/simple-renderer */ "../dist/renderer/simple-renderer.js");
/* harmony import */ var _renderer_category_renderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../renderer/category-renderer */ "../dist/renderer/category-renderer.js");
/* harmony import */ var _renderer_class_renderer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../renderer/class-renderer */ "../dist/renderer/class-renderer.js");
/* harmony import */ var _geometry_geometry__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../geometry/geometry */ "../dist/geometry/geometry.js");
/* harmony import */ var _geometry_point__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../geometry/point */ "../dist/geometry/point.js");
/* harmony import */ var _symbol_symbol__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../symbol/symbol */ "../dist/symbol/symbol.js");








class FeatureLayer extends _layer__WEBPACK_IMPORTED_MODULE_0__["Layer"] {
    constructor() {
        super(...arguments);
        //是否显示标注
        this.labeled = false;
        //是否聚合
        this.cluster = false;
        //是否正在编辑
        this.editing = false;
        this._zoom = [3, 20];
        this._interactive = true;
        this._index = 0; //z-index
    }
    get interactive() {
        return this._interactive;
    }
    set interactive(value) {
        this._interactive = value;
    }
    get featureClass() {
        return this._featureClass;
    }
    set featureClass(value) {
        this._featureClass = value;
    }
    set label(value) {
        this._label = value;
    }
    set renderer(value) {
        this._renderer = value;
    }
    set zoom(value) {
        this._zoom = value;
    }
    get index() {
        return this._index;
    }
    set index(value) {
        this._index = value;
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
    draw(ctx, projection = new _projection_web_mercator__WEBPACK_IMPORTED_MODULE_1__["WebMercator"](), extent = projection.bound, zoom = 10) {
        if (this.visible && this._zoom[0] <= zoom && this._zoom[1] >= zoom) {
            const features = this._featureClass.features.filter((feature) => feature.intersect(projection, extent));
            if (this._featureClass.type == _geometry_geometry__WEBPACK_IMPORTED_MODULE_5__["GeometryType"].Point && this.cluster) {
                const cluster = features.reduce((acc, cur) => {
                    if (cur.geometry instanceof _geometry_point__WEBPACK_IMPORTED_MODULE_6__["Point"]) {
                        const point = cur.geometry;
                        const item = acc.find((item) => {
                            const distance = point.distance(item.feature.geometry, _geometry_geometry__WEBPACK_IMPORTED_MODULE_5__["CoordinateType"].Screen, ctx, projection);
                            return distance <= 50;
                        });
                        if (item) {
                            item.count += 1;
                        }
                        else {
                            acc.push({ feature: cur, count: 1 });
                        }
                        return acc;
                    }
                }, []); // [{feature, count}]
                cluster.forEach((item) => {
                    if (item.count == 1) {
                        item.feature.draw(ctx, projection, extent, this._getSymbol(item.feature));
                    }
                    else {
                        item.feature.draw(ctx, projection, extent, new _symbol_symbol__WEBPACK_IMPORTED_MODULE_7__["ClusterSymbol"](item.count));
                    }
                });
            }
            else {
                features.forEach((feature) => {
                    feature.draw(ctx, projection, extent, this._getSymbol(feature));
                });
            }
        }
    }
    drawLabel(ctx, projection = new _projection_web_mercator__WEBPACK_IMPORTED_MODULE_1__["WebMercator"](), extent = projection.bound, zoom = 10) {
        if (this.visible && !this.cluster && this._zoom[0] <= zoom && this._zoom[1] >= zoom) {
            const features = this._featureClass.features.filter((feature) => feature.intersect(projection, extent));
            this._label.draw(features, ctx, projection);
            /*features.forEach( feature => {
                feature.label(this._label.field, ctx, projection, extent, this._label.symbol);
            });*/
            /*const cluster = features.reduce( (acc, cur) => {
                const item: any = acc.find((item: any) => {
                    const distance = cur.geometry.distance(item.feature.geometry, CoordinateType.Screen, ctx, projection);
                    return distance <= 50;
                });
                if (item) {
                    item.count += 1;
                } else {
                    acc.push({feature: cur, count: 1});
                }
                return acc;
            }, []); // [{feature, count}]
            cluster.forEach( (item: any) => {
                item.feature.label(this._label.field, ctx, projection, extent, this._label.symbol);
            });*/
        }
    }
    contain(screenX, screenY, projection = new _projection_web_mercator__WEBPACK_IMPORTED_MODULE_1__["WebMercator"](), extent = projection.bound, zoom = 10, event = undefined) {
        if (this.visible && this._zoom[0] <= zoom && this._zoom[1] >= zoom) {
            //if call Array.some, maybe abort mouseout last feature which mouseover!!! but filter maybe cause slow!!!no choice
            //return this._featureClass.features.filter((feature: Feature) => feature.intersect(projection, extent)).some( (feature: Feature) => {
            const features = this._featureClass.features.filter((feature) => feature.intersect(projection, extent)).filter((feature) => {
                return feature.contain(screenX, screenY, event);
            });
            if (features.length > 0) {
                if (event == "dblclick") {
                    features[0].emit("dblclick", { feature: features[0], screenX: screenX, screenY: screenY });
                }
                else if (event == "click") {
                    features[0].emit("click", { feature: features[0], screenX: screenX, screenY: screenY });
                }
                return true;
            }
            else {
                return false;
            }
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
/* harmony import */ var _projection_web_mercator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../projection/web-mercator */ "../dist/projection/web-mercator.js");


class GraphicLayer extends _layer__WEBPACK_IMPORTED_MODULE_0__["Layer"] {
    constructor() {
        super(...arguments);
        this._graphics = [];
    }
    //地图事件注册监听
    on(event, handler) {
        this._graphics.forEach((graphic) => {
            graphic.on(event, handler);
        });
    }
    off(event, handler) {
        this._graphics.forEach((graphic) => {
            graphic.off(event, handler);
        });
    }
    emit(event, param) {
        this._graphics.forEach((graphic) => {
            graphic.emit(event, param);
        });
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
    draw(ctx, projection = new _projection_web_mercator__WEBPACK_IMPORTED_MODULE_1__["WebMercator"](), extent = projection.bound, zoom = 10) {
        if (this.visible) {
            this._graphics.forEach((graphic) => {
                graphic.draw(ctx, projection, extent);
            });
        }
    }
    contain(screenX, screenY, projection = new _projection_web_mercator__WEBPACK_IMPORTED_MODULE_1__["WebMercator"](), extent = projection.bound, zoom = 10, event = undefined) {
        if (this.visible) {
            const graphics = this._graphics.filter((graphic) => graphic.intersect(projection, extent)).filter((graphic) => {
                return graphic.contain(screenX, screenY, event);
            });
            if (graphics.length > 0) {
                if (event == "dblclick") {
                    graphics[0].emit("dblclick", { graphic: graphics[0], screenX: screenX, screenY: screenY });
                }
                else if (event == "click") {
                    graphics[0].emit("click", { graphic: graphics[0], screenX: screenX, screenY: screenY });
                }
                else if (event == "dragstart") {
                    graphics[0].emit("dragstart", { graphic: graphics[0], screenX: screenX, screenY: screenY });
                }
                return true;
            }
            else {
                return false;
            }
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
/* harmony import */ var _projection_web_mercator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../projection/web-mercator */ "../dist/projection/web-mercator.js");

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
    draw(ctx, projection = new _projection_web_mercator__WEBPACK_IMPORTED_MODULE_0__["WebMercator"](), extent = projection.bound, zoom = 10) { }
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
/* harmony import */ var _geometry_geometry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./geometry/geometry */ "../dist/geometry/geometry.js");
/* harmony import */ var _util_bound__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/bound */ "../dist/util/bound.js");
/* harmony import */ var _projection_web_mercator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projection/web-mercator */ "../dist/projection/web-mercator.js");
/* harmony import */ var _layer_graphic_layer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./layer/graphic-layer */ "../dist/layer/graphic-layer.js");
/* harmony import */ var _util_utility__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util/utility */ "../dist/util/utility.js");
/* harmony import */ var _editor_editor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor/editor */ "../dist/editor/editor.js");
/* harmony import */ var _viewer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./viewer */ "../dist/viewer.js");
/* harmony import */ var _util_subject__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./util/subject */ "../dist/util/subject.js");
/* harmony import */ var _tooltip_tooltip__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./tooltip/tooltip */ "../dist/tooltip/tooltip.js");









class Map extends _util_subject__WEBPACK_IMPORTED_MODULE_7__["Subject"] {
    constructor(id, option) {
        super(["extent", "click", "dblclick", "mousemove", "resize"]);
        this._option = {
            disableDoubleClick: false
        };
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
        this._touch = {
            zooming: false,
            dragging: false,
            finger_dist: 0
        };
        //地图缩放等级
        this._zoom = 1;
        this.minZoom = 3;
        this.maxZoom = 20;
        //地图视图中心
        this._center = [0, 0];
        //默认图形图层
        this._defaultGraphicLayer = new _layer_graphic_layer__WEBPACK_IMPORTED_MODULE_3__["GraphicLayer"]();
        //option
        this._option.disableDoubleClick = option && option.hasOwnProperty('disableDoubleClick') ? option.disableDoubleClick : false;
        this._container = id instanceof HTMLDivElement ? id : document.getElementById(id);
        //create canvas
        this._canvas = document.createElement("canvas");
        this._canvas.style.cssText = "position: absolute; height: 100%; width: 100%; z-index: 100";
        this._canvas.width = this._container.clientWidth;
        this._canvas.height = this._container.clientHeight;
        this._container.appendChild(this._canvas);
        this._onClick = this._onClick.bind(this);
        this._onDoubleClick = this._onDoubleClick.bind(this);
        this._onMouseDown = this._onMouseDown.bind(this);
        this._onMouseMove = this._onMouseMove.bind(this);
        this._onMouseUp = this._onMouseUp.bind(this);
        this._onWheel = this._onWheel.bind(this);
        this._onTouchStart = this._onTouchStart.bind(this);
        this._onTouchMove = this._onTouchMove.bind(this);
        this._onTouchEnd = this._onTouchEnd.bind(this);
        this._ctx = this._canvas.getContext("2d");
        this._canvas.addEventListener("click", this._onClick);
        this._canvas.addEventListener("dblclick", this._onDoubleClick);
        this._canvas.addEventListener("mousedown", this._onMouseDown);
        this._canvas.addEventListener("mousemove", this._onMouseMove, false);
        this._canvas.addEventListener("mouseup", this._onMouseUp);
        this._canvas.addEventListener("wheel", this._onWheel);
        this._canvas.addEventListener("touchstart", this._onTouchStart, false);
        this._canvas.addEventListener("touchmove", this._onTouchMove, false);
        this._canvas.addEventListener("touchend", this._onTouchEnd, false);
        //viewer
        this._viewer = new _viewer__WEBPACK_IMPORTED_MODULE_6__["Viewer"](this);
        this._viewer.on("mouseover", () => { _util_utility__WEBPACK_IMPORTED_MODULE_4__["Utility"].addClass(this._canvas, "green-hover"); });
        this._viewer.on("mouseout", () => { _util_utility__WEBPACK_IMPORTED_MODULE_4__["Utility"].removeClass(this._canvas, "green-hover"); });
        //editor
        this._editor = new _editor_editor__WEBPACK_IMPORTED_MODULE_5__["Editor"](this);
        this._editor.on("mouseover", () => { _util_utility__WEBPACK_IMPORTED_MODULE_4__["Utility"].addClass(this._canvas, "green-hover"); });
        this._editor.on("mouseout", () => { _util_utility__WEBPACK_IMPORTED_MODULE_4__["Utility"].removeClass(this._canvas, "green-hover"); });
        this._editor.on("startedit", () => { this._viewer.redraw(); });
        this._editor.on("stopedit", () => { this._viewer.redraw(); });
        //tooltip
        this._tooltip = new _tooltip_tooltip__WEBPACK_IMPORTED_MODULE_8__["Tooltip"](this);
        this._projection = new _projection_web_mercator__WEBPACK_IMPORTED_MODULE_2__["WebMercator"]();
        //this._center = [0, 0];
        //this._zoom = 10;
        //Latlng [-180, 180] [-90, 90]
        //this._ctx.setTransform(256/180 * Math.pow(2, this._zoom - 1), 0, 0, -256/90 * Math.pow(2, this._zoom - 1), this._canvas.width/2, this._canvas.height/2);
        //const bound: Bound = this._projection.bound;
        //设置初始矩阵，由于地图切片是256*256，Math.pow(2, this._zoom)代表在一定缩放级别下x与y轴的切片数量
        //this._ctx.setTransform(256 * Math.pow(2, this._zoom) / (bound.xmax - bound.xmin) * bound.xscale , 0, 0, 256 * Math.pow(2, this._zoom) / (bound.ymax - bound.ymin) * bound.yscale, this._canvas.width / 2, this._canvas.height / 2);
        this.setView([0, 0], 10);
        this._onResize = this._onResize.bind(this);
        window.addEventListener("resize", this._onResize);
    }
    get container() {
        return this._container;
    }
    get viewer() {
        return this._viewer;
    }
    get tooltip() {
        return this._tooltip;
    }
    get editor() {
        return this._editor;
    }
    set editor(value) {
        this._editor = value;
    }
    get center() {
        return this._center;
    }
    get extent() {
        return this._extent;
    }
    get zoom() {
        return this._zoom;
    }
    get projection() {
        return this._projection;
    }
    //设置option
    disableDoubleClick() {
        this._option.disableDoubleClick = true;
    }
    enableDoubleClick() {
        this._option.disableDoubleClick = false;
    }
    //设置投影
    setProjection(projection) {
        this._projection = projection;
        //const bound: Bound = this._projection.bound;
        //this._ctx.setTransform(256 * Math.pow(2, this._zoom) / (bound.xmax - bound.xmin) * bound.xscale , 0, 0, 256 * Math.pow(2, this._zoom) / (bound.ymax - bound.ymin) * bound.yscale, this._canvas.width / 2, this._canvas.height / 2);
        //center为经纬度，转化为平面坐标
        const origin = this._projection.project(this._center);
        const bound = this._projection.bound;
        //已知：地理坐标origin，转换后屏幕坐标 即canvas的中心 [this._canvas.width / 2, this._canvas.height / 2]
        //求：平面坐标转换矩阵=Map初始矩阵:  地理坐标——屏幕坐标
        //解法如下：
        const a = 256 * Math.pow(2, this._zoom) / (bound.xmax - bound.xmin) * bound.xscale;
        const d = 256 * Math.pow(2, this._zoom) / (bound.ymax - bound.ymin) * bound.yscale;
        const e = this._canvas.width / 2 - a * origin[0];
        const f = this._canvas.height / 2 - d * origin[1];
        this._ctx.setTransform(a, 0, 0, d, e, f);
    }
    //设置视图级别及视图中心
    setView(center = [0, 0], zoom = 3) {
        this._center = center;
        this._zoom = Math.max(this.minZoom, Math.min(this.maxZoom, zoom));
        //center为经纬度，转化为平面坐标
        const origin = this._projection.project(center);
        const bound = this._projection.bound;
        //已知：地理坐标origin，转换后屏幕坐标 即canvas的中心 [this._canvas.width / 2, this._canvas.height / 2]
        //求：平面坐标转换矩阵=Map初始矩阵:  地理坐标——屏幕坐标
        //解法如下：
        const a = 256 * Math.pow(2, this._zoom) / (bound.xmax - bound.xmin) * bound.xscale;
        const d = 256 * Math.pow(2, this._zoom) / (bound.ymax - bound.ymin) * bound.yscale;
        const e = this._canvas.width / 2 - a * origin[0];
        const f = this._canvas.height / 2 - d * origin[1];
        this._ctx.setTransform(a, 0, 0, d, e, f);
        this.redraw();
    }
    //设置缩放到某一范围. 默认该范围2倍. 用于缩放到某一要素对应的bound
    fitBound(bound) {
        const origin = bound.getCenter();
        const center = this._projection.unproject(origin);
        bound.scale(2);
        const x_mpp = (bound.xmax - bound.xmin) / this._canvas.width; //x  meter per pixel
        const y_mpp = (bound.ymax - bound.ymin) / this._canvas.height; //y  meter per pixel
        //反算 zoom : x_mpp = (bound.xmax - bound.xmin) / (256 * Math.pow(2, this._zoom))
        if (x_mpp == 0 || y_mpp == 0) {
            this.setView(center, this.maxZoom);
        }
        else {
            const full_bound = this._projection.bound;
            const x_zoom = Math.log2((full_bound.xmax - full_bound.xmin) / x_mpp / 256);
            const y_zoom = Math.log2((full_bound.ymax - full_bound.ymin) / y_mpp / 256);
            const zoom = Math.floor(Math.min(x_zoom, y_zoom, this.maxZoom));
            this.setView(center, zoom);
        }
    }
    //viewer
    addLayer(layer) {
        this._viewer.addLayer(layer);
    }
    insertLayer(layer, index = -1) {
        this._viewer.insertLayer(layer, index);
    }
    removeLayer(layer) {
        this._viewer.removeLayer(layer);
    }
    clearLayers() {
        this._viewer.clearLayers();
    }
    //shortcut
    addGraphic(graphic) {
        this._defaultGraphicLayer.add(graphic);
        graphic.draw(this._ctx, this._projection, this._extent);
    }
    removeGraphic(graphic) {
        this._defaultGraphicLayer.remove(graphic);
        this._defaultGraphicLayer.draw(this._ctx, this._projection, this._extent, this._zoom);
    }
    clearGraphics() {
        this._defaultGraphicLayer.clear();
        this._defaultGraphicLayer.draw(this._ctx, this._projection, this._extent, this._zoom);
    }
    //更新地图视图范围以及中心点
    updateExtent() {
        const matrix = this._ctx.getTransform();
        const x1 = (0 - matrix.e) / matrix.a, y1 = (0 - matrix.f) / matrix.d, x2 = (this._canvas.width - matrix.e) / matrix.a, y2 = (this._canvas.height - matrix.f) / matrix.d;
        this._extent = new _util_bound__WEBPACK_IMPORTED_MODULE_1__["Bound"](Math.min(x1, x2), Math.min(y1, y2), Math.max(x1, x2), Math.max(y1, y2));
        this._center = this._projection.unproject([(x1 + x2) / 2, (y1 + y2) / 2]);
        this._handlers["extent"].forEach(handler => handler({ extent: this._extent, center: this._center, zoom: this._zoom, matrix: matrix }));
    }
    redraw() {
        this._ctx.save();
        this._ctx.setTransform(1, 0, 0, 1, 0, 0);
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._ctx.restore();
        this.updateExtent();
        this._defaultGraphicLayer.draw(this._ctx, this._projection, this._extent, this._zoom);
        this.hideTooltip();
    }
    clear() {
        this._ctx.save();
        this._ctx.setTransform(1, 0, 0, 1, 0, 0);
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._ctx.restore();
        this.updateExtent();
    }
    resize() {
        this._onResize(null);
    }
    _onResize(event) {
        this._canvas.width = this._container.clientWidth;
        this._canvas.height = this._container.clientHeight;
        this._handlers["resize"].forEach(handler => handler(event));
        this.setView(this._center, this._zoom);
    }
    _onClick(event) {
        const matrix = this._ctx.getTransform();
        const x = (event.offsetX - matrix.e) / matrix.a;
        const y = (event.offsetY - matrix.f) / matrix.d;
        [event.lng, event.lat] = this._projection.unproject([x, y]);
        if (this._editor && this._editor.editing) {
            this._editor._onClick(event);
            return;
        }
        this._handlers["click"].forEach(handler => handler(event));
    }
    _onDoubleClick(event) {
        if (this._editor.editing) {
            this._editor._onDoubleClick(event);
            return;
        }
        if (!this._option.disableDoubleClick) {
            if (this._zoom >= this.maxZoom)
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
        this._handlers["dblclick"].forEach(handler => handler(event));
    }
    _onMouseDown(event) {
        if (this._editor.editing && this._editor.editingFeature) {
            this._editor._onMouseDown(event);
            return;
        }
        this._drag.flag = true;
        this._drag.start.x = event.x;
        this._drag.start.y = event.y;
    }
    _onMouseMove(event) {
        if (this._editor.editing) {
            const matrix = this._ctx.getTransform();
            const x = (event.offsetX - matrix.e) / matrix.a;
            const y = (event.offsetY - matrix.f) / matrix.d;
            [event.lng, event.lat] = this._projection.unproject([x, y]);
            this._editor._onMouseMove(event);
            return;
        }
        if (!this._drag.flag) {
            this._handlers["mousemove"].forEach(handler => handler(event));
        }
    }
    _onMouseUp(event) {
        if (this._editor.editing && this._editor.editingFeature) {
            this._editor._onMouseUp(event);
            return;
        }
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
        event.preventDefault();
        //级别缩放
        const sensitivity = 5;
        if (Math.abs(event.deltaY) <= sensitivity)
            return;
        const delta = event.deltaY < 0 ? -1 : 1;
        let scale = 1;
        if (delta < 0) {
            // 放大
            scale *= delta * -2;
        }
        else {
            // 缩小
            scale /= delta * 2;
        }
        let zoom = Math.round(Math.log(scale));
        //无级缩放
        /*const sensitivity = 100;
        const delta = event.deltaY / sensitivity;
        if (Math.abs(delta) <= 0.05) return;
        let scale = 1;
        let zoom = -delta;*/
        //------------------------------------------------------------
        if (zoom > 0) {
            // 放大
            zoom = this._zoom + zoom >= this.maxZoom ? this.maxZoom - this._zoom : zoom;
        }
        else if (zoom < 0) {
            // 缩小
            zoom = this._zoom + zoom <= this.minZoom ? this.minZoom - this._zoom : zoom;
        }
        if (zoom == 0)
            return;
        this._zoom += zoom;
        scale = Math.pow(2, zoom);
        //交互表现为 鼠标当前位置 屏幕坐标不变 进行缩放 即x2 = x1，y2=y1
        //其它设定：变换前矩阵(a1,0,0,d1,e1,f1)   变换矩阵(a,0,0,d,e,f)  变换后矩阵(a2,0,0,d2,e2,f2)
        //scale已通过滚轮变化，换算得到，且a=d=scale，求e和f
        //1.将原屏幕坐标 x1 转成 地理坐标 x0 = (x1 - e1) / a1
        //2.地理坐标x0 转成 现屏幕坐标x2  a2 * x0 + e2 = x2 e2 = x2 - a2 * x0 代入1式 e2 = x2 - a2 * (x1 - e1) / a1
        //3.已知scale = a2 / a1 故 e2 = x2 - scale * (x1 - e1)
        //4.另矩阵变换 a1 * e + e1 = e2
        //5.联立3和4 求得 e = (x2 - scale * (x1 - e1) - e1) / a1
        const matrix = this._ctx.getTransform();
        const a1 = matrix.a, e1 = matrix.e, x1 = event.offsetX, x2 = x1; //放大到中心点 x2 = this._canvas.width / 2
        const e = (x2 - scale * (x1 - e1) - e1) / a1;
        const d1 = matrix.d, f1 = matrix.f, y1 = event.offsetY, y2 = y1; //放大到中心点 y2 = this._canvas.height / 2
        const f = (y2 - scale * (y1 - f1) - f1) / d1;
        this._ctx.transform(scale, 0, 0, scale, e, f);
        this.redraw();
    }
    _onTouchStart(event) {
        if (event.touches.length == 2) { // if multiple touches (pinch zooming)
            let diffX = event.touches[0].clientX - event.touches[1].clientX;
            let diffY = event.touches[0].clientY - event.touches[1].clientY;
            this._touch.finger_dist = Math.sqrt(diffX * diffX + diffY * diffY); // Save current finger distance
            this._touch.dragging = false;
            this._touch.zooming = true;
            //console.log("zoom start(cancel drag)");
        } // Else just moving around
        else if (event.touches.length == 1) {
            this._onMouseDown({ x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY });
            this._touch.dragging = true;
            //console.log("drag start");
        }
    }
    _onTouchMove(event) {
        event.preventDefault(); // Stop the window from moving
        if (event.touches.length == 2 && this._touch.zooming) { // If pinch-zooming
            let diffX = event.touches[0].clientX - event.touches[1].clientX;
            let diffY = event.touches[0].clientY - event.touches[1].clientY;
            let new_finger_dist = Math.sqrt(diffX * diffX + diffY * diffY); // Get current distance between fingers
            //let scale = Math.abs(new_finger_dist / this._touch.finger_dist); // Zoom is proportional to change
            /*let zoom = Math.round(Math.log(scale));
            if (zoom > 0) {
                // 放大
                zoom = this._zoom + zoom >= this.maxZoom ? this.maxZoom - this._zoom : zoom;
            } else if (zoom < 0) {
                // 缩小
                zoom = this._zoom + zoom <= this.minZoom ? this.minZoom - this._zoom : zoom;
            }*/
            let zoom = 0;
            let sensitivity = 50; //pixel
            if (new_finger_dist - this._touch.finger_dist > sensitivity) {
                // 放大
                zoom = this._zoom + 1 >= this.maxZoom ? this.maxZoom - this._zoom : 1;
            }
            else if (this._touch.finger_dist - new_finger_dist > sensitivity) {
                // 缩小
                zoom = this._zoom - 1 <= this.minZoom ? this.minZoom - this._zoom : -1;
            }
            else {
                return;
            }
            if (zoom == 0)
                return;
            let scale = Math.pow(2, zoom);
            this._zoom += zoom;
            //console.log("zoom:" + this._zoom + " dist:" + this._touch.finger_dist + "-" + new_finger_dist);
            this._touch.finger_dist = new_finger_dist; // Save current distance for next time
            const matrix = this._ctx.getTransform();
            const a1 = matrix.a, e1 = matrix.e, x1 = (event.touches[0].clientX + event.touches[1].clientX) / 2, x2 = x1; //放大到中心点 x2 = this._canvas.width / 2
            const e = (x2 - scale * (x1 - e1) - e1) / a1;
            const d1 = matrix.d, f1 = matrix.f, y1 = (event.touches[0].clientY + event.touches[1].clientY) / 2, y2 = y1; //放大到中心点 y2 = this._canvas.height / 2
            const f = (y2 - scale * (y1 - f1) - f1) / d1;
            this._ctx.transform(scale, 0, 0, scale, e, f);
            this.redraw();
        }
    }
    _onTouchEnd(event) {
        if (this._touch.zooming) {
            this._touch.zooming = false;
            //console.log("zoom end");
        }
        else if (this._touch.dragging) {
            this._touch.dragging = false;
            this._onMouseUp({ x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY });
            //console.log("drag end");
        }
    }
    //show tooltip
    showTooltip(feature, field) {
        const text = feature.properties[field.name];
        const center = feature.geometry.getCenter(_geometry_geometry__WEBPACK_IMPORTED_MODULE_0__["CoordinateType"].Projection, this.projection);
        const matrix = this._ctx.getTransform();
        const screenX = (matrix.a * center[0] + matrix.e);
        const screenY = (matrix.d * center[1] + matrix.f);
        this._tooltip.show(text, screenX, screenY);
    }
    hideTooltip() {
        this._tooltip.hide();
    }
    destroy() {
        window.removeEventListener("resize", this._onResize);
        this._canvas.removeEventListener("click", this._onClick);
        this._canvas.removeEventListener("dblclick", this._onDoubleClick);
        this._canvas.removeEventListener("mousedown", this._onMouseDown);
        this._canvas.removeEventListener("mousemove", this._onMouseMove);
        this._canvas.removeEventListener("mouseup", this._onMouseUp);
        this._canvas.removeEventListener("wheel", this._onWheel);
        this._canvas.removeEventListener("touchstart", this._onTouchStart);
        this._canvas.removeEventListener("touchmove", this._onTouchMove);
        this._canvas.removeEventListener("touchend", this._onTouchEnd);
        this._viewer = null;
        this._editor = null;
    }
}


/***/ }),

/***/ "../dist/projection/bd09.js":
/*!**********************************!*\
  !*** ../dist/projection/bd09.js ***!
  \**********************************/
/*! exports provided: BD09 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BD09", function() { return BD09; });
/* harmony import */ var _util_bound__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/bound */ "../dist/util/bound.js");
/* harmony import */ var _projection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projection */ "../dist/projection/projection.js");
/* harmony import */ var _gcj02__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gcj02 */ "../dist/projection/gcj02.js");



//just for china
class BD09 extends _projection__WEBPACK_IMPORTED_MODULE_1__["Projection"] {
    constructor(type = _projection__WEBPACK_IMPORTED_MODULE_1__["LatLngType"].GPS) {
        super();
        this._type = type;
    }
    //投影后的平面坐标范围
    get bound() {
        return new _util_bound__WEBPACK_IMPORTED_MODULE_0__["Bound"](-BD09.TOTAL_PIXELS / 2, BD09.TOTAL_PIXELS / 2, BD09.TOTAL_PIXELS / 2, -BD09.TOTAL_PIXELS / 2);
    }
    //经纬度转平面坐标
    project([lng, lat]) {
        //from leaflet & wiki
        if (this._type == _projection__WEBPACK_IMPORTED_MODULE_1__["LatLngType"].GPS) {
            [lng, lat] = _gcj02__WEBPACK_IMPORTED_MODULE_2__["GCJ02"].wgs84togcj02(lng, lat);
            [lng, lat] = BD09.gcj02tobd09(lng, lat);
        }
        else if (this._type == _projection__WEBPACK_IMPORTED_MODULE_1__["LatLngType"].GCJ02) {
            [lng, lat] = BD09.gcj02tobd09(lng, lat);
        }
        const projection = new BMap.MercatorProjection();
        const pixel = projection.lngLatToPoint(new BMap.Point(lng, lat));
        return [pixel.x, pixel.y];
        /*const d = Math.PI / 180, sin = Math.sin(lat * d);
        return [WebMercator.R * lng * d,  WebMercator.R * Math.log((1 + sin) / (1 - sin)) / 2];*/
    }
    //平面坐标转经纬度
    unproject([x, y]) {
        const projection = new BMap.MercatorProjection();
        const point = projection.pointToLngLat(new BMap.Pixel(x, y));
        return [point.lng, point.lat];
        /*const d = 180 / Math.PI;
        return  [x * d / WebMercator.R, (2 * Math.atan(Math.exp(y / WebMercator.R)) - (Math.PI / 2)) * d];*/
    }
    //from https://github.com/wandergis/coordtransform
    /**
     * 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02) 的转换
     * 即 百度 转 谷歌、高德
     * @param bd_lng
     * @param bd_lat
     * @returns {*[]}
     */
    static bd09togcj02(bd_lng, bd_lat) {
        var x = bd_lng - 0.0065;
        var y = bd_lat - 0.006;
        var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * Math.PI * 3000.0 / 180.0);
        var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * Math.PI * 3000.0 / 180.0);
        var gg_lng = z * Math.cos(theta);
        var gg_lat = z * Math.sin(theta);
        return [gg_lng, gg_lat];
    }
    ;
    /**
     * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
     * 即 谷歌、高德 转 百度
     * @param lng
     * @param lat
     * @returns {*[]}
     */
    static gcj02tobd09(lng, lat) {
        var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * Math.PI * 3000.0 / 180.0);
        var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * Math.PI * 3000.0 / 180.0);
        var bd_lng = z * Math.cos(theta) + 0.0065;
        var bd_lat = z * Math.sin(theta) + 0.006;
        return [bd_lng, bd_lat];
    }
    ;
}
//百度平面坐标系的坐标原点与百度瓦片坐标原点相同，以瓦片等级18级为基准，规定18级时百度平面坐标的一个单位等于屏幕上的一个像素
BD09.TOTAL_PIXELS = 256 * Math.pow(2, 18);


/***/ }),

/***/ "../dist/projection/gcj02.js":
/*!***********************************!*\
  !*** ../dist/projection/gcj02.js ***!
  \***********************************/
/*! exports provided: GCJ02 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GCJ02", function() { return GCJ02; });
/* harmony import */ var _util_bound__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/bound */ "../dist/util/bound.js");
/* harmony import */ var _projection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projection */ "../dist/projection/projection.js");


//just for china
class GCJ02 extends _projection__WEBPACK_IMPORTED_MODULE_1__["Projection"] {
    constructor(type = _projection__WEBPACK_IMPORTED_MODULE_1__["LatLngType"].GPS) {
        super();
        this._type = type;
    }
    //投影后的平面坐标范围
    get bound() {
        return new _util_bound__WEBPACK_IMPORTED_MODULE_0__["Bound"](-Math.PI * GCJ02.R, Math.PI * GCJ02.R, Math.PI * GCJ02.R, -Math.PI * GCJ02.R);
    }
    //经纬度转平面坐标
    project([lng, lat]) {
        if (this._type == _projection__WEBPACK_IMPORTED_MODULE_1__["LatLngType"].GPS) {
            [lng, lat] = GCJ02.wgs84togcj02(lng, lat);
        }
        //from leaflet & wiki
        const d = Math.PI / 180, sin = Math.sin(lat * d);
        return [GCJ02.R * lng * d, GCJ02.R * Math.log((1 + sin) / (1 - sin)) / 2];
    }
    //平面坐标转经纬度
    unproject([x, y]) {
        const d = 180 / Math.PI;
        return [x * d / GCJ02.R, (2 * Math.atan(Math.exp(y / GCJ02.R)) - (Math.PI / 2)) * d];
    }
    //from https://github.com/wandergis/coordtransform
    /**
     * WGS-84 转 GCJ-02
     * @param lng
     * @param lat
     * @returns {*[]}
     */
    static wgs84togcj02(lng, lat) {
        var dlat = this._transformlat(lng - 105.0, lat - 35.0);
        var dlng = this._transformlng(lng - 105.0, lat - 35.0);
        var radlat = lat / 180.0 * Math.PI;
        var magic = Math.sin(radlat);
        magic = 1 - GCJ02.ee * magic * magic;
        var sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / ((GCJ02.R * (1 - GCJ02.ee)) / (magic * sqrtmagic) * Math.PI);
        dlng = (dlng * 180.0) / (GCJ02.R / sqrtmagic * Math.cos(radlat) * Math.PI);
        var mglat = lat + dlat;
        var mglng = lng + dlng;
        return [mglng, mglat];
    }
    ;
    /**
     * GCJ-02 转换为 WGS-84
     * @param lng
     * @param lat
     * @returns {*[]}
     */
    static gcj02towgs84(lng, lat) {
        var dlat = this._transformlat(lng - 105.0, lat - 35.0);
        var dlng = this._transformlng(lng - 105.0, lat - 35.0);
        var radlat = lat / 180.0 * Math.PI;
        var magic = Math.sin(radlat);
        magic = 1 - GCJ02.ee * magic * magic;
        var sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / ((GCJ02.R * (1 - GCJ02.ee)) / (magic * sqrtmagic) * Math.PI);
        dlng = (dlng * 180.0) / (GCJ02.R / sqrtmagic * Math.cos(radlat) * Math.PI);
        var mglat = lat + dlat;
        var mglng = lng + dlng;
        return [lng * 2 - mglng, lat * 2 - mglat];
    }
    ;
    static _transformlat(lng, lat) {
        var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
        ret += (20.0 * Math.sin(6.0 * lng * Math.PI) + 20.0 * Math.sin(2.0 * lng * Math.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(lat * Math.PI) + 40.0 * Math.sin(lat / 3.0 * Math.PI)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(lat / 12.0 * Math.PI) + 320 * Math.sin(lat * Math.PI / 30.0)) * 2.0 / 3.0;
        return ret;
    }
    ;
    static _transformlng(lng, lat) {
        var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
        ret += (20.0 * Math.sin(6.0 * lng * Math.PI) + 20.0 * Math.sin(2.0 * lng * Math.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(lng * Math.PI) + 40.0 * Math.sin(lng / 3.0 * Math.PI)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(lng / 12.0 * Math.PI) + 300.0 * Math.sin(lng / 30.0 * Math.PI)) * 2.0 / 3.0;
        return ret;
    }
    ;
    //此判断欠妥，暂不采用！
    /**
     * 判断是否在国内，不在国内则不做偏移
     * @param lng
     * @param lat
     * @returns {boolean}
     */
    static out_of_china(lng, lat) {
        // 纬度 3.86~53.55, 经度 73.66~135.05
        return !(lng > 73.66 && lng < 135.05 && lat > 3.86 && lat < 53.55);
    }
    ;
}
GCJ02.R = 6378137.0;
GCJ02.ee = 0.00669342162296594323;


/***/ }),

/***/ "../dist/projection/projection.js":
/*!****************************************!*\
  !*** ../dist/projection/projection.js ***!
  \****************************************/
/*! exports provided: LatLngType, Projection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LatLngType", function() { return LatLngType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Projection", function() { return Projection; });
var LatLngType;
(function (LatLngType) {
    LatLngType[LatLngType["GPS"] = 1] = "GPS";
    LatLngType[LatLngType["GCJ02"] = 2] = "GCJ02";
    LatLngType[LatLngType["BD09"] = 3] = "BD09"; //Just For China, BaiduMap
})(LatLngType || (LatLngType = {}));
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

/***/ "../dist/projection/web-mercator.js":
/*!******************************************!*\
  !*** ../dist/projection/web-mercator.js ***!
  \******************************************/
/*! exports provided: WebMercator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebMercator", function() { return WebMercator; });
/* harmony import */ var _util_bound__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/bound */ "../dist/util/bound.js");
/* harmony import */ var _projection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projection */ "../dist/projection/projection.js");


class WebMercator extends _projection__WEBPACK_IMPORTED_MODULE_1__["Projection"] {
    //投影后的平面坐标范围
    get bound() {
        return new _util_bound__WEBPACK_IMPORTED_MODULE_0__["Bound"](-Math.PI * WebMercator.R, Math.PI * WebMercator.R, Math.PI * WebMercator.R, -Math.PI * WebMercator.R);
    }
    //经纬度转平面坐标
    project([lng, lat]) {
        //from leaflet & wiki
        const d = Math.PI / 180, sin = Math.sin(lat * d);
        return [WebMercator.R * lng * d, WebMercator.R * Math.log((1 + sin) / (1 - sin)) / 2];
    }
    //平面坐标转经纬度
    unproject([x, y]) {
        const d = 180 / Math.PI;
        return [x * d / WebMercator.R, (2 * Math.atan(Math.exp(y / WebMercator.R)) - (Math.PI / 2)) * d];
    }
}
WebMercator.R = 6378137;


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
/* harmony import */ var _util_color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/color */ "../dist/util/color.js");



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
                        symbol1.fillStyle = _util_color__WEBPACK_IMPORTED_MODULE_2__["Color"].random().toString();
                        symbol1.strokeStyle = _util_color__WEBPACK_IMPORTED_MODULE_2__["Color"].random().toString();
                        item.symbol = symbol1;
                        item.value = value;
                        this._items.push(item);
                        break;
                    case _geometry_geometry__WEBPACK_IMPORTED_MODULE_1__["GeometryType"].Polyline:
                        const symbol2 = new _symbol_symbol__WEBPACK_IMPORTED_MODULE_0__["SimpleLineSymbol"]();
                        symbol2.strokeStyle = _util_color__WEBPACK_IMPORTED_MODULE_2__["Color"].random().toString();
                        item.symbol = symbol2;
                        item.value = value;
                        this._items.push(item);
                        break;
                    case _geometry_geometry__WEBPACK_IMPORTED_MODULE_1__["GeometryType"].Polygon:
                        const symbol3 = new _symbol_symbol__WEBPACK_IMPORTED_MODULE_0__["SimpleFillSymbol"]();
                        symbol3.fillStyle = _util_color__WEBPACK_IMPORTED_MODULE_2__["Color"].random().toString();
                        symbol3.strokeStyle = _util_color__WEBPACK_IMPORTED_MODULE_2__["Color"].random().toString();
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
/* harmony import */ var _symbol_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../symbol/symbol */ "../dist/symbol/symbol.js");
/* harmony import */ var _geometry_geometry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../geometry/geometry */ "../dist/geometry/geometry.js");
/* harmony import */ var _util_color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/color */ "../dist/util/color.js");



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
    //均分
    generate(featureClass, field, breaks) {
        this._field = field;
        this._items = [];
        const stat = featureClass.features.map(feature => feature.properties[field.name]).reduce((stat, cur) => {
            stat.max = Math.max(cur, stat.max);
            stat.min = Math.min(cur, stat.max);
            return stat;
        }, { min: 0, max: 0 });
        for (let i = 0; i < breaks; i++) {
            const item = new ClassRendererItem();
            switch (featureClass.type) {
                case _geometry_geometry__WEBPACK_IMPORTED_MODULE_1__["GeometryType"].Point:
                    const symbol1 = new _symbol_symbol__WEBPACK_IMPORTED_MODULE_0__["SimplePointSymbol"]();
                    symbol1.fillStyle = _util_color__WEBPACK_IMPORTED_MODULE_2__["Color"].random().toString();
                    symbol1.strokeStyle = _util_color__WEBPACK_IMPORTED_MODULE_2__["Color"].random().toString();
                    item.symbol = symbol1;
                    item.low = stat.min + i * (stat.max - stat.min) / breaks;
                    item.high = stat.min + (i + 1) * (stat.max - stat.min) / breaks;
                    item.label = item.low + " - " + item.high;
                    this._items.push(item);
                    break;
                case _geometry_geometry__WEBPACK_IMPORTED_MODULE_1__["GeometryType"].Polyline:
                    const symbol2 = new _symbol_symbol__WEBPACK_IMPORTED_MODULE_0__["SimpleLineSymbol"]();
                    symbol2.strokeStyle = _util_color__WEBPACK_IMPORTED_MODULE_2__["Color"].random().toString();
                    item.symbol = symbol2;
                    item.low = stat.min + i * (stat.max - stat.min) / breaks;
                    item.high = stat.min + (i + 1) * (stat.max - stat.min) / breaks;
                    item.label = item.low + " - " + item.high;
                    this._items.push(item);
                    break;
                case _geometry_geometry__WEBPACK_IMPORTED_MODULE_1__["GeometryType"].Polygon:
                    const symbol3 = new _symbol_symbol__WEBPACK_IMPORTED_MODULE_0__["SimpleFillSymbol"]();
                    symbol3.fillStyle = _util_color__WEBPACK_IMPORTED_MODULE_2__["Color"].random().toString();
                    symbol3.strokeStyle = _util_color__WEBPACK_IMPORTED_MODULE_2__["Color"].random().toString();
                    item.symbol = symbol3;
                    item.low = stat.min + i * (stat.max - stat.min) / breaks;
                    item.high = stat.min + (i + 1) * (stat.max - stat.min) / breaks;
                    item.label = item.low + " - " + item.high;
                    this._items.push(item);
                    break;
            }
        }
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
/*! exports provided: Symbol, PointSymbol, LineSymbol, FillSymbol, SimplePointSymbol, GradientPointSymbol, SimpleLineSymbol, SimpleFillSymbol, SimpleMarkerSymbol, SimpleTextSymbol, LetterSymbol, ArrowSymbol, VertexSymbol, ClusterSymbol */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Symbol", function() { return Symbol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PointSymbol", function() { return PointSymbol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineSymbol", function() { return LineSymbol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FillSymbol", function() { return FillSymbol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimplePointSymbol", function() { return SimplePointSymbol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GradientPointSymbol", function() { return GradientPointSymbol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimpleLineSymbol", function() { return SimpleLineSymbol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimpleFillSymbol", function() { return SimpleFillSymbol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimpleMarkerSymbol", function() { return SimpleMarkerSymbol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimpleTextSymbol", function() { return SimpleTextSymbol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LetterSymbol", function() { return LetterSymbol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArrowSymbol", function() { return ArrowSymbol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VertexSymbol", function() { return VertexSymbol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClusterSymbol", function() { return ClusterSymbol; });
/* harmony import */ var _util_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/color */ "../dist/util/color.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class Symbol {
    constructor() {
        this.lineWidth = 1;
        this.strokeStyle = "#ff0000"; //#ff0000
        this.fillStyle = "#ff000088"; //#ff0000
    }
}
class PointSymbol extends Symbol {
    //渲染
    draw(ctx, screenX, screenY) { }
    //判断点是否在符号范围内
    contain(anchorX, anchorY, screenX, screenY) { return false; }
}
class LineSymbol extends Symbol {
    draw(ctx, screen) { }
}
class FillSymbol extends Symbol {
    draw(ctx, screen) { }
}
class SimplePointSymbol extends PointSymbol {
    constructor() {
        super(...arguments);
        //circle
        this.radius = 6;
    }
    draw(ctx, screenX, screenY) {
        ctx.save();
        ctx.strokeStyle = this.strokeStyle;
        ctx.fillStyle = this.fillStyle;
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath(); //Start path
        //keep size
        //地理坐标 转回 屏幕坐标
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.arc(screenX, screenY, this.radius, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
    contain(anchorX, anchorY, screenX, screenY) {
        return Math.sqrt((anchorX - screenX) * (anchorX - screenX) + (anchorY - screenY) * (anchorY - screenY)) <= this.radius;
    }
}
class GradientPointSymbol extends PointSymbol {
    constructor() {
        super(...arguments);
        //circle
        this.radius = 6;
        this.lineWidth = 0;
        this.startColor = "#ff0000"; //#ff0000
        this.endColor = "#ff0000"; //#ff0000
    }
    draw(ctx, screenX, screenY) {
        ctx.save();
        //keep size
        //地理坐标 转回 屏幕坐标
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.strokeStyle;
        const radgrad = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, this.radius);
        radgrad.addColorStop(0, this.startColor);
        radgrad.addColorStop(1, this.endColor);
        ctx.fillStyle = radgrad;
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath(); //Start path
        ctx.arc(screenX, screenY, this.radius, 0, Math.PI * 2, true);
        ctx.fill();
        //ctx.stroke();
        ctx.restore();
    }
    contain(anchorX, anchorY, screenX, screenY) {
        return Math.sqrt((anchorX - screenX) * (anchorX - screenX) + (anchorY - screenY) * (anchorY - screenY)) <= this.radius;
    }
}
class SimpleLineSymbol extends LineSymbol {
    draw(ctx, screen) {
        ctx.save();
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = this.lineWidth;
        //keep lineWidth
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.beginPath();
        screen.forEach((point, index) => {
            const screenX = point[0], screenY = point[1];
            if (index === 0) {
                ctx.moveTo(screenX, screenY);
            }
            else {
                ctx.lineTo(screenX, screenY);
            }
        });
        ctx.stroke();
        ctx.restore();
    }
}
class SimpleFillSymbol extends Symbol {
    constructor() {
        super(...arguments);
        this.lineWidth = 2;
    }
    draw(ctx, screen) {
        ctx.save();
        ctx.strokeStyle = this.strokeStyle;
        ctx.fillStyle = this.fillStyle;
        ctx.lineWidth = this.lineWidth;
        //keep lineWidth
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        //TODO:  exceeding the maximum extent(bound), best way is overlap by extent. find out: maximum is [-PI*R, PI*R]??
        ctx.beginPath();
        screen.forEach(ring => {
            ring.forEach((point, index) => {
                const screenX = point[0], screenY = point[1];
                if (index === 0) {
                    ctx.moveTo(screenX, screenY);
                }
                else {
                    ctx.lineTo(screenX, screenY);
                }
            });
        });
        ctx.closePath();
        ctx.fill("evenodd");
        ctx.stroke();
        ctx.restore();
    }
}
class SimpleMarkerSymbol extends PointSymbol {
    constructor() {
        super(...arguments);
        this.width = 16;
        this.height = 16;
        this.offsetX = -8;
        this.offsetY = -8;
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
    draw(ctx, screenX, screenY) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.loaded)
                yield this.load();
            if (this.icon) {
                ctx.save();
                const matrix = ctx.getTransform();
                //keep size
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.drawImage(this.icon, screenX + this.offsetX, screenY + this.offsetY, this.width, this.height);
                ctx.restore();
            }
        });
    }
    contain(anchorX, anchorY, screenX, screenY) {
        return screenX >= (anchorX + this.offsetX) && screenX <= (anchorX + this.offsetX + this.width) && screenY >= (anchorY + this.offsetY) && screenY <= (anchorY + this.offsetY + this.height);
    }
}
class SimpleTextSymbol extends Symbol {
    constructor() {
        super(...arguments);
        this.lineWidth = 3;
        this.strokeStyle = "#ff0000"; //#ffffff
        this.fillStyle = "#ffffff"; //#ffffff
        this.offsetX = 0;
        this.offsetY = 0;
        this.pointSymbolWidth = 0;
        this.pointSymbolHeight = 0;
        this.padding = 5;
        this.fontColor = "#ff0000";
        this.fontSize = 12;
        this.fontFamily = "YaHei";
        this.fontWeight = "Bold";
        this.placement = "BOTTOM"; //BOTTOM TOP LEFT RIGHT
        this.auto = false;
    }
    //counterclockwise
    replacement() {
        if (this.auto) {
            switch (this.placement) {
                case "BOTTOM":
                    this.placement = "RIGHT";
                    break;
                case "RIGHT":
                    this.placement = "TOP";
                    break;
                case "TOP":
                    this.placement = "LEFT";
                    break;
                case "LEFT":
                    this.placement = "BOTTOM";
                    break;
            }
        }
    }
    copy(symbol) {
        Object.keys(this).forEach(property => {
            this[property] = symbol[property];
        });
    }
}
class LetterSymbol extends PointSymbol {
    constructor() {
        super(...arguments);
        this.radius = 10;
        this.letter = "";
        this.fontColor = "#ff0000";
        this.fontSize = 12;
        this.fontFamily = "YaHei";
        this.fontWeight = "Bold";
    }
    draw(ctx, screenX, screenY) {
        ctx.save();
        ctx.strokeStyle = this.strokeStyle;
        ctx.fillStyle = this.fillStyle;
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath(); //Start path
        //keep size
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.arc(screenX, screenY, this.radius, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillStyle = this.fontColor;
        ctx.font = this.fontSize + "px/1 " + this.fontFamily + " " + this.fontWeight;
        ctx.fillText(this.letter, screenX, screenY);
        ctx.restore();
    }
    contain(anchorX, anchorY, screenX, screenY) {
        return Math.sqrt((anchorX - screenX) * (anchorX - screenX) + (anchorY - screenY) * (anchorY - screenY)) <= this.radius;
    }
}
class ArrowSymbol extends Symbol {
    constructor() {
        super(...arguments);
        this.lineWidth = 2;
        this.minLength = 50; //>50pixel will draw arrow
        this.arrowLength = 10;
        this.arrowAngle = Math.PI / 6; //angle 30
    }
    draw(ctx, screen) {
        ctx.save();
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = this.lineWidth;
        //keep lineWidth
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.beginPath();
        screen.forEach((point, index) => {
            const screenX = point[0], screenY = point[1];
            if (index === 0) {
                ctx.moveTo(screenX, screenY);
            }
            else {
                ctx.lineTo(screenX, screenY);
            }
        });
        ctx.stroke();
        screen.reduce((prev, cur) => {
            if (prev) {
                const length = Math.sqrt((cur[0] - prev[0]) * (cur[0] - prev[0]) + (cur[1] - prev[1]) * (cur[1] - prev[1]));
                if (length >= this.minLength) {
                    //中点 即箭头
                    const [middleX, middleY] = [(prev[0] + cur[0]) / 2, (prev[1] + cur[1]) / 2];
                    //箭尾垂线的垂足
                    const [footX, footY] = this._getPointAlongLine([middleX, middleY], prev, Math.cos(this.arrowAngle) * this.arrowLength);
                    const k = (cur[1] - prev[1]) / (cur[0] - prev[0]);
                    // 1/k 垂线
                    const points = this._getPointAlongLine2(-1 / k, footY - footX * -1 / k, [footX, footY], Math.sin(this.arrowAngle) * this.arrowLength);
                    //两点
                    points.forEach(point => {
                        ctx.beginPath();
                        ctx.moveTo(middleX, middleY);
                        ctx.lineTo(point[0], point[1]);
                        ctx.stroke();
                    });
                }
                return cur;
            }
            else {
                return cur;
            }
        });
        ctx.restore();
    }
    //已知 起点和终点  求沿线距起点定长的点
    _getPointAlongLine(p1, p2, d) {
        //line length
        let l = Math.sqrt((p2[0] - p1[0]) * (p2[0] - p1[0]) + (p2[1] - p1[1]) * (p2[1] - p1[1]));
        let t = d / l;
        return [(1 - t) * p1[0] + t * p2[0], (1 - t) * p1[1] + t * p2[1]];
    }
    //已知 起点 y = kx + b   求沿线距起点定长的点 两个点
    _getPointAlongLine2(k, b, p, d) {
        let x0 = p[0] + Math.sqrt((d * d) / (k * k + 1)), x1 = p[0] - Math.sqrt((d * d) / (k * k + 1));
        return [[x0, k * x0 + b], [x1, k * x1 + b]];
    }
}
class VertexSymbol extends PointSymbol {
    constructor() {
        super(...arguments);
        this.size = 10;
    }
    draw(ctx, screenX, screenY) {
        ctx.save();
        ctx.strokeStyle = this.strokeStyle;
        ctx.fillStyle = this.fillStyle;
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath(); //Start path
        //keep size
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        const size = this.size;
        ctx.rect(screenX - size / 2, screenY - size / 2, size, size);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
    contain(anchorX, anchorY, screenX, screenY) {
        return screenX >= (anchorX - this.size / 2) && screenX <= (anchorX + this.size / 2) && screenY >= (anchorY - this.size / 2) && screenY <= (anchorY + this.size / 2);
    }
}
class ClusterSymbol extends PointSymbol {
    constructor(count) {
        super();
        this._count = 2;
        this.radius = 10;
        this.strokeStyle = "#ffffff"; //#ff0000
        this.outerFillStyle = "#ffffff"; //#ff0000
        this.fontColor = "#ffffff";
        this.fontFamily = "YaHei";
        this.fontWeight = "Bold";
        this._count = count;
    }
    get text() {
        return this._count <= 99 ? this._count.toString() : "99+";
    }
    get inner() {
        return this._count <= 15 ? this.radius + this._count : this.radius + 15;
    }
    get outer() {
        return this.inner + 4;
    }
    get fontSize() {
        if (this._count < 10) {
            return 12;
        }
        else if (this._count >= 10 && this._count < 30) {
            return 14;
        }
        else if (this._count >= 30 && this._count < 50) {
            return 16;
        }
        else if (this._count >= 30 && this._count < 50) {
            return 18;
        }
        else if (this._count > 50) {
            return 20;
        }
    }
    get innerFillStyle() {
        //const colors = Color.ramp(new Color(0, 255, 0), new Color(255,0,0), 16);
        //const colors = Color.ramp(new Color(22,198,227), new Color(255, 0, 255), 16);
        const colors = _util_color__WEBPACK_IMPORTED_MODULE_0__["Color"].ramp(new _util_color__WEBPACK_IMPORTED_MODULE_0__["Color"](25, 202, 173), new _util_color__WEBPACK_IMPORTED_MODULE_0__["Color"](244, 96, 108), 16);
        return colors[this._count <= 15 ? this._count : 15].toString();
    }
    draw(ctx, screenX, screenY) {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.strokeStyle = this.strokeStyle;
        ctx.fillStyle = this.outerFillStyle;
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath(); //Start path
        //keep size
        ctx.arc(screenX, screenY, this.outer, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = this.innerFillStyle;
        ctx.beginPath(); //Start path
        //keep size
        ctx.arc(screenX, screenY, this.inner, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillStyle = this.fontColor;
        ctx.font = this.fontSize + "px/1 " + this.fontFamily + " " + this.fontWeight;
        ctx.fillText(this.text, screenX, screenY);
        ctx.restore();
    }
}


/***/ }),

/***/ "../dist/tooltip/tooltip.js":
/*!**********************************!*\
  !*** ../dist/tooltip/tooltip.js ***!
  \**********************************/
/*! exports provided: Tooltip */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tooltip", function() { return Tooltip; });
/* harmony import */ var _util_utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/utility */ "../dist/util/utility.js");

class Tooltip {
    constructor(map) {
        this._map = map;
        const container = this._map.container;
        this._tooltipContainer = document.createElement("div");
        _util_utility__WEBPACK_IMPORTED_MODULE_0__["Utility"].addClass(this._tooltipContainer, "green-tooltip");
        //Utility.addClass(this._tooltipContainer, "green-tooltip-placement-top");
        container.appendChild(this._tooltipContainer);
        this._tooltipArrow = document.createElement("div");
        _util_utility__WEBPACK_IMPORTED_MODULE_0__["Utility"].addClass(this._tooltipArrow, "green-tooltip-arrow");
        //Utility.addClass(this._tooltipArrow, "green-tooltip-arrow-placement-top");
        this._tooltipContainer.appendChild(this._tooltipArrow);
        this._tooltipText = document.createElement("div");
        _util_utility__WEBPACK_IMPORTED_MODULE_0__["Utility"].addClass(this._tooltipText, "green-tooltip-text");
        this._tooltipContainer.appendChild(this._tooltipText);
    }
    show(text, screenX, screenY, height) {
        if (typeof text === 'string') {
            this._tooltipText.innerHTML = text;
        }
        else {
            const node = this._tooltipText;
            while (node.hasChildNodes()) {
                node.removeChild(node.firstChild);
            }
            node.appendChild(text);
        }
        //this._tooltip.style.cssText = "display: block; left: " + (screenX - this._tooltip.offsetWidth / 2) + "px; top: " + (screenY - this._tooltip.offsetHeight) + "px;";
        _util_utility__WEBPACK_IMPORTED_MODULE_0__["Utility"].removeClass(this._tooltipContainer, "green-tooltip-placement-top");
        _util_utility__WEBPACK_IMPORTED_MODULE_0__["Utility"].removeClass(this._tooltipContainer, "green-tooltip-placement-bottom");
        _util_utility__WEBPACK_IMPORTED_MODULE_0__["Utility"].removeClass(this._tooltipArrow, "green-tooltip-arrow-placement-top");
        _util_utility__WEBPACK_IMPORTED_MODULE_0__["Utility"].removeClass(this._tooltipArrow, "green-tooltip-arrow-placement-bottom");
        if (screenY < (height || this._tooltipContainer.offsetHeight)) {
            _util_utility__WEBPACK_IMPORTED_MODULE_0__["Utility"].addClass(this._tooltipContainer, "green-tooltip-placement-bottom");
            _util_utility__WEBPACK_IMPORTED_MODULE_0__["Utility"].addClass(this._tooltipArrow, "green-tooltip-arrow-placement-bottom");
        }
        else {
            _util_utility__WEBPACK_IMPORTED_MODULE_0__["Utility"].addClass(this._tooltipContainer, "green-tooltip-placement-top");
            _util_utility__WEBPACK_IMPORTED_MODULE_0__["Utility"].addClass(this._tooltipArrow, "green-tooltip-arrow-placement-top");
        }
        this._tooltipContainer.style.cssText = "display: block; left: " + (screenX) + "px; top: " + (screenY) + "px;";
    }
    hide() {
        this._tooltipContainer.style.cssText = "display: none";
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
    getCenter() {
        return [(this._xmin + this._xmax) / 2, (this._ymin + this._ymax) / 2];
    }
    //是否交叉叠盖
    intersect(bound) {
        return (bound.xmax >= this._xmin) && (bound.xmin <= this._xmax) && (bound.ymax >= this._ymin) && (bound.ymin <= this._ymax);
    }
    scale(s) {
        this._xmin = this._xmin - (s - 1) * (this._xmax - this._xmin) / 2;
        this._xmax = this._xmax + (s - 1) * (this._xmax - this._xmin) / 2;
        this._ymin = this._ymin - (s - 1) * (this._ymax - this._ymin) / 2;
        this._ymax = this._ymax + (s - 1) * (this._ymax - this._ymin) / 2;
    }
    buffer(size) {
        this._xmin -= size;
        this._ymin -= size;
        this._xmax += size;
        this._ymax += size;
    }
}


/***/ }),

/***/ "../dist/util/color.js":
/*!*****************************!*\
  !*** ../dist/util/color.js ***!
  \*****************************/
/*! exports provided: Color */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Color", function() { return Color; });
class Color {
    constructor(r, g, b, a = 1) {
        this.a = 1;
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    toString() {
        return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
    }
    static fromHex(hex) {
        let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/;
        hex = hex.toLowerCase();
        if (hex && reg.test(hex)) {
            //处理三位的颜色值
            if (hex.length === 4) {
                var sColorNew = "#";
                for (var i = 1; i < 4; i += 1) {
                    sColorNew += hex.slice(i, i + 1).concat(hex.slice(i, i + 1));
                }
                hex = sColorNew;
            }
            //处理六位的颜色值
            if (hex.length === 4) {
                hex += "ff";
            }
            let sColorChange = [];
            for (let i = 1; i < 9; i += 2) {
                sColorChange.push(parseInt("0x" + hex.slice(i, i + 2)));
            }
            return new Color(sColorChange[0], sColorChange[1], sColorChange[2], sColorChange[3] / 255);
        }
    }
    static ramp(start, end, count = 10) {
        const colors = [];
        for (let i = 0; i < count; i += 1) {
            colors.push(new Color((end.r - start.r) * i / count + start.r, (end.g - start.g) * i / count + start.g, (end.b - start.b) * i / count + start.b, (end.a - start.a) * i / count + start.a));
        }
        return colors;
    }
    static random() {
        return new Color(Math.random() * 255, Math.random() * 255, Math.random() * 255);
    }
}


/***/ }),

/***/ "../dist/util/subject.js":
/*!*******************************!*\
  !*** ../dist/util/subject.js ***!
  \*******************************/
/*! exports provided: Subject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Subject", function() { return Subject; });
class Subject {
    constructor(events) {
        this._handlers = {};
        events.forEach(event => {
            this._handlers[event] = []; //handlers array
        });
    }
    //地图事件注册监听
    on(event, handler) {
        this._handlers[event].push(handler);
    }
    off(event, handler) {
        if (Array.isArray(this._handlers[event])) {
            const index = this._handlers[event].findIndex(item => item === handler);
            index != -1 && this._handlers[event].splice(index, 1);
        }
    }
    emit(event, param) {
        this._handlers[event].forEach(handler => handler(param));
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

/***/ "../dist/viewer.js":
/*!*************************!*\
  !*** ../dist/viewer.js ***!
  \*************************/
/*! exports provided: Viewer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Viewer", function() { return Viewer; });
/* harmony import */ var _util_subject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/subject */ "../dist/util/subject.js");

class Viewer extends _util_subject__WEBPACK_IMPORTED_MODULE_0__["Subject"] {
    constructor(map) {
        super(["mouseover", "mouseout"]); //when mouseover feature
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
        //图层列表
        this._layers = [];
        this._map = map;
        const container = map.container;
        //create canvas
        this._canvas = document.createElement("canvas");
        this._canvas.style.cssText = "position: absolute; height: 100%; width: 100%;";
        this._canvas.width = container.clientWidth;
        this._canvas.height = container.clientHeight;
        container.appendChild(this._canvas);
        this._onResize = this._onResize.bind(this);
        this._extentChange = this._extentChange.bind(this);
        this._onClick = this._onClick.bind(this);
        this._onDoubleClick = this._onDoubleClick.bind(this);
        this._onMouseMove = this._onMouseMove.bind(this);
        this._ctx = this._canvas.getContext("2d");
        this._map.on("resize", this._onResize);
        this._map.on("extent", this._extentChange);
        this._map.on("click", this._onClick);
        this._map.on("dblclick", this._onDoubleClick);
        this._map.on("mousemove", this._onMouseMove);
    }
    _onResize(event) {
        this._canvas.width = this._map.container.clientWidth;
        this._canvas.height = this._map.container.clientHeight;
    }
    _extentChange(event) {
        //const matrix = DOMMatrix.fromFloat64Array( new Float64Array([event.matrix.a, 0, 0, event.matrix.d, event.matrix.e, event.matrix.f] ) );
        //this._ctx.setTransform(matrix);
        this._ctx.setTransform(event.matrix.a, 0, 0, event.matrix.d, event.matrix.e, event.matrix.f);
        this.redraw();
    }
    _onClick(event) {
        const layers = [...this._layers];
        layers.filter(layer => layer.interactive && !layer.editing).reverse().some((layer) => layer.contain(event.offsetX, event.offsetY, this._map.projection, this._map.extent, this._map.zoom, "click"));
    }
    _onDoubleClick(event) {
        const layers = [...this._layers];
        layers.filter(layer => layer.interactive && !layer.editing).reverse().some((layer) => layer.contain(event.offsetX, event.offsetY, this._map.projection, this._map.extent, this._map.zoom, "dblclick"));
    }
    _onMouseMove(event) {
        //if call Array.some, maybe abort mouseout last feature which mouseover!!! but filter maybe cause slow!!!no choice
        //const flag = this._layers.filter(layer => (layer instanceof FeatureLayer) && layer.interactive).some((layer: FeatureLayer) => layer.contain(event.offsetX, event.offsetY, this._projection, this._extent, "mousemove"));
        const layers = this._layers.filter(layer => layer.interactive && !layer.editing).filter((layer) => layer.contain(event.offsetX, event.offsetY, this._map.projection, this._map.extent, this._map.zoom, "mousemove"));
        if (layers.length > 0) {
            this.emit("mouseover", event);
        }
        else {
            this.emit("mouseout", event);
        }
    }
    addLayer(layer) {
        this._layers.push(layer);
        layer.draw(this._ctx, this._map.projection, this._map.extent, this._map.zoom);
    }
    insertLayer(layer, index = -1) {
        index = index > this._layers.length ? -1 : index;
        if (index == -1) {
            this.addLayer(layer);
        }
        else {
            this._layers.splice(index, 0, layer);
            this.redraw();
        }
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
    redraw() {
        this._ctx.save();
        this._ctx.setTransform(1, 0, 0, 1, 0, 0);
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._ctx.restore();
        this._layers.sort((a, b) => a.index - b.index).filter(layer => !layer.editing).forEach(layer => {
            layer.draw(this._ctx, this._map.projection, this._map.extent, this._map.zoom);
        });
        this._layers.filter(layer => layer.labeled && !layer.editing).forEach((layer) => {
            layer.drawLabel(this._ctx, this._map.projection, this._map.extent, this._map.zoom);
        });
    }
    clear() {
        this._ctx.save();
        this._ctx.setTransform(1, 0, 0, 1, 0, 0);
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._ctx.restore();
    }
    destroy() {
        this._map.off("resize", this._onResize);
        this._map.off("extent", this._extentChange);
        this._map.off("click", this._onClick);
        this._map.off("dblclick", this._onDoubleClick);
        this._map.off("mousemove", this._onMouseMove);
    }
}


/***/ }),

/***/ "./large-than-20.js":
/*!**************************!*\
  !*** ./large-than-20.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dist */ "../dist/index.js");


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
    map.maxZoom = 22;
    const element = document.getElementById("amap");
    map.on("extent", (event) => {
        if (event.zoom <= 20) {
            element.style.setProperty("display", "block");
            amap.setZoomAndCenter(event.zoom, event.center);
        } else {
            element.style.setProperty("display", "none");
        }
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

    var req = new XMLHttpRequest();
    req.onload = (event) => {
        const featureClass = new _dist__WEBPACK_IMPORTED_MODULE_0__["FeatureClass"]();
        featureClass.loadGeoJSON(JSON.parse(req.responseText));
        const featureLayer = new _dist__WEBPACK_IMPORTED_MODULE_0__["FeatureLayer"]();
        featureLayer.featureClass = featureClass;
        const field2 = new _dist__WEBPACK_IMPORTED_MODULE_0__["Field"]();
        field2.name = "NAME";
        field2.type = _dist__WEBPACK_IMPORTED_MODULE_0__["FieldType"].String;
        const renderer = new _dist__WEBPACK_IMPORTED_MODULE_0__["CategoryRenderer"]();
        renderer.generate(featureClass, field2);
        featureLayer.renderer = renderer;
        const label = new _dist__WEBPACK_IMPORTED_MODULE_0__["Label"]();
        const symbol = new _dist__WEBPACK_IMPORTED_MODULE_0__["SimpleTextSymbol"]();
        symbol.pointSymbolWidth = 12;     //diameter
        symbol.pointSymbolHeight = 12;   //diameter
        symbol.auto = true;
        /*symbol.offsetX = 0;  //
        symbol.offsetY = 6;  //radius
        symbol.placement = "BOTTOM";*/
        /*symbol.offsetX = 0;  //
        symbol.offsetY = -6;  //-radius
        symbol.placement = "TOP";*/
        /*symbol.offsetX = 6;  //radius
        symbol.offsetY = 0;  //
        symbol.placement = "RIGHT";*/
        /*symbol.offsetX = -6;  //radius
        symbol.offsetY = 0;  //
        symbol.placement = "LEFT";*/
        label.field = field2;
        label.symbol = symbol;
        label.collision = new _dist__WEBPACK_IMPORTED_MODULE_0__["CoverCollision"]();
        featureLayer.label = label;
        featureLayer.labeled = true;
        featureLayer.zoom = [12, 22];
        map.addLayer(featureLayer);

        map.setView([109.519, 18.271], 13);
    };
    req.open("GET", "assets/geojson/junction.json", true);
    req.send(null);

    map.setProjection(new _dist__WEBPACK_IMPORTED_MODULE_0__["GCJ02"](_dist__WEBPACK_IMPORTED_MODULE_0__["LatLngType"].GCJ02));
    //beijing gugong
    const point = new _dist__WEBPACK_IMPORTED_MODULE_0__["Point"](116.397411,39.909186);
    const feature = new _dist__WEBPACK_IMPORTED_MODULE_0__["Feature"](point, {});
    const featureClass = new _dist__WEBPACK_IMPORTED_MODULE_0__["FeatureClass"]();
    featureClass.addFeature(feature);
    const marker = new _dist__WEBPACK_IMPORTED_MODULE_0__["SimpleMarkerSymbol"]();
    marker.width = 32;
    marker.height = 32;
    marker.offsetX = -16;
    marker.offsetY = -32;
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