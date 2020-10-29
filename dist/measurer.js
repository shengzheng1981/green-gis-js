import { CoordinateType } from "./geometry/geometry";
import { GraphicLayer } from "./layer/graphic-layer";
import { Graphic } from "./element/graphic";
import { Point } from "./geometry/point";
import { SimpleFillSymbol, SimpleLineSymbol, SimplePointSymbol, SimpleTextSymbol } from "./symbol/symbol";
import { Subject } from "./util/subject";
import { Polyline } from "./geometry/polyline";
import { Polygon } from "./geometry/polygon";
export var MeasureActionType;
(function (MeasureActionType) {
    MeasureActionType[MeasureActionType["Default"] = 0] = "Default";
    MeasureActionType[MeasureActionType["Polyline"] = 1] = "Polyline";
    MeasureActionType[MeasureActionType["Polygon"] = 2] = "Polygon";
})(MeasureActionType || (MeasureActionType = {}));
/**
 * Measurer
 */
export class Measurer extends Subject {
    /**
     * 创建Editor
     * 不应自主创建，map内部创建
     * @param {Map} map - 地图容器
     */
    constructor(map) {
        super(["mouseover", "mouseout", "startedit", "stopedit", "click", "update", "commit", "create", "delete"]); //when mouseover feature or vertex
        this._create = {
            click: 0,
            graphic: null,
            lnglats: []
        };
        this._action = MeasureActionType.Default;
        this._defaultPointSymbol = new SimplePointSymbol();
        this._defaultLineSymbol = new SimpleLineSymbol();
        this._defaultPolygonSymbol = new SimpleFillSymbol();
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
        this._map.on("resize", this._onResize);
        this._map.on("extent", this._extentChange);
        this._measureLayer = new GraphicLayer();
    }
    get measuring() {
        return this._measuring;
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
    measurePolyLine() {
        this._measuring = true;
        this._action = MeasureActionType.Polyline;
        this._createLayer = new GraphicLayer();
    }
    measurePolygon() {
        this._measuring = true;
        this._action = MeasureActionType.Polygon;
        this._createLayer = new GraphicLayer();
    }
    clear() {
        this._measuring = false;
        this._action = MeasureActionType.Default;
        this._create = {
            click: 0,
            graphic: null,
            lnglats: []
        };
        this._measureLayer.clear();
        this._ctx.save();
        this._ctx.setTransform(1, 0, 0, 1, 0, 0);
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._ctx.restore();
    }
    addGraphic(g) {
        this._measureLayer.add(g);
        this.redraw();
    }
    removeGraphic(g) {
        this._measureLayer.remove(g);
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
    redraw() {
        this._ctx.save();
        this._ctx.setTransform(1, 0, 0, 1, 0, 0);
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._ctx.restore();
        this._createLayer && this._createLayer.draw(this._ctx, this._map.projection, this._map.extent, this._map.zoom);
        this._measureLayer && this._measureLayer.draw(this._ctx, this._map.projection, this._map.extent, this._map.zoom);
        this._measureLayer.graphics.forEach(graphic => this._label(graphic.geometry));
    }
    _onClick(event) {
        if (!this._measuring)
            return;
        if (event.detail > 1)
            return;
        if (this._action === MeasureActionType.Polygon) {
            if (this._create.click == 0) {
                this._createLayer.clear();
                const point = new Point(event.lng, event.lat);
                const graphic = new Graphic(point, this._defaultPointSymbol);
                this._createLayer.add(graphic);
                this._create.click += 1;
                this._create.lnglats.push([event.lng, event.lat]);
            }
            else if (this._create.click == 1) {
                const second = new Point(event.lng, event.lat);
                const graphic1 = new Graphic(second, this._defaultPointSymbol);
                this._createLayer.add(graphic1);
                if (this._create.graphic)
                    this._createLayer.remove(this._create.graphic);
                this._create.lnglats.push([event.lng, event.lat]);
                const line = new Polyline(this._create.lnglats);
                this._create.graphic = new Graphic(line, this._defaultLineSymbol);
                this._createLayer.add(this._create.graphic);
                this._create.click += 1;
            }
            else {
                const second = new Point(event.lng, event.lat);
                const graphic1 = new Graphic(second, this._defaultPointSymbol);
                this._createLayer.add(graphic1);
                if (this._create.graphic)
                    this._createLayer.remove(this._create.graphic);
                this._create.lnglats.push([event.lng, event.lat]);
                const polygon = new Polygon([this._create.lnglats]);
                this._create.graphic = new Graphic(polygon, this._defaultPolygonSymbol);
                this._createLayer.add(this._create.graphic);
                this._create.click += 1;
            }
        }
        else if (this._action === MeasureActionType.Polyline) {
            if (this._create.click == 0) {
                this._createLayer.clear();
                const point = new Point(event.lng, event.lat);
                const graphic = new Graphic(point, this._defaultPointSymbol);
                this._createLayer.add(graphic);
                this._create.click += 1;
                this._create.lnglats.push([event.lng, event.lat]);
            }
            else {
                const second = new Point(event.lng, event.lat);
                const graphic1 = new Graphic(second, this._defaultPointSymbol);
                this._createLayer.add(graphic1);
                if (this._create.graphic)
                    this._createLayer.remove(this._create.graphic);
                this._create.lnglats.push([event.lng, event.lat]);
                const line = new Polyline(this._create.lnglats);
                this._create.graphic = new Graphic(line, this._defaultLineSymbol);
                this._createLayer.add(this._create.graphic);
                this._create.click += 1;
            }
        }
    }
    _onDoubleClick(event) {
        if (!this._measuring)
            return;
        if (this._action === MeasureActionType.Polygon) {
            if (this._create.click > 1) {
                if (this._create.graphic)
                    this._createLayer.remove(this._create.graphic);
                const polygon = new Polygon([this._create.lnglats]);
                const graphic = new Graphic(polygon, this._defaultPolygonSymbol);
                this._create = {
                    click: 0,
                    graphic: null,
                    lnglats: []
                };
                this._createLayer.clear();
                this.addGraphic(graphic);
                //this._label(polygon);
            }
        }
        else if (this._action === MeasureActionType.Polyline) {
            if (this._create.click > 0) {
                if (this._create.graphic)
                    this._createLayer.remove(this._create.graphic);
                const polyline = new Polyline(this._create.lnglats);
                const graphic = new Graphic(polyline, this._defaultLineSymbol);
                this._create = {
                    click: 0,
                    graphic: null,
                    lnglats: []
                };
                this._createLayer.clear();
                this.addGraphic(graphic);
                //this._label(polyline);
            }
        }
    }
    _label(geometry) {
        let projection = this._map.projection;
        geometry.project(projection);
        let ctx = this._canvas.getContext("2d");
        ctx.save();
        let symbol = new SimpleTextSymbol();
        ctx.strokeStyle = symbol.strokeStyle;
        ctx.fillStyle = symbol.fillStyle;
        ctx.lineWidth = symbol.lineWidth;
        ctx.lineJoin = "round";
        ctx.font = symbol.fontSize + "px/1 " + symbol.fontFamily + " " + symbol.fontWeight;
        const matrix = ctx.getTransform();
        //keep pixel
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        let text = "";
        let center = geometry.getCenter(CoordinateType.Projection, projection);
        if (geometry instanceof Polyline) {
            const length = geometry.getLength(projection);
            text = length > 1000 ? Math.round(length / 1000 * 10) / 10 + "公里" : Math.round(length) + "米";
            center = geometry.coordinates[geometry.coordinates.length - 1];
        }
        else if (geometry instanceof Polygon) {
            const area = geometry.getArea(projection);
            text = area > 1000 ? Math.round(area / 10000 * 10) / 10 + "公顷" : Math.round(area) + "平方米";
        }
        else {
            return;
        }
        let width = ctx.measureText(text).width + symbol.padding * 2;
        let height = symbol.fontSize + symbol.padding * 2;
        const screenX = (matrix.a * center[0] + matrix.e);
        const screenY = (matrix.d * center[1] + matrix.f);
        let totalX, totalY;
        totalX = -width / 2;
        totalY = symbol.pointSymbolHeight / 2;
        ctx.strokeRect(screenX + totalX, screenY + totalY, width, height);
        ctx.fillRect(screenX + totalX, screenY + totalY, width, height);
        ctx.textBaseline = "top";
        ctx.fillStyle = symbol.fontColor;
        ctx.fillText(text, screenX + totalX + symbol.padding, screenY + totalY + symbol.padding);
        ctx.restore();
    }
    ;
    _onMouseDown(event) {
    }
    _onMouseMove(event) {
        if (!this._measuring)
            return;
        if (this._action === MeasureActionType.Polygon) {
            if (this._create.click == 1) {
                if (this._create.graphic)
                    this._createLayer.remove(this._create.graphic);
                const lnglats = [...this._create.lnglats];
                lnglats.push([event.lng, event.lat]);
                const line = new Polyline(lnglats);
                this._create.graphic = new Graphic(line, this._defaultLineSymbol);
                this._createLayer.add(this._create.graphic);
            }
            else if (this._create.click > 1) {
                if (this._create.graphic)
                    this._createLayer.remove(this._create.graphic);
                const lnglats = [...this._create.lnglats];
                lnglats.push([event.lng, event.lat]);
                const polygon = new Polygon([lnglats]);
                this._create.graphic = new Graphic(polygon, this._defaultPolygonSymbol);
                this._createLayer.add(this._create.graphic);
            }
        }
        else if (this._action === MeasureActionType.Polyline) {
            if (this._create.click > 0) {
                if (this._create.graphic)
                    this._createLayer.remove(this._create.graphic);
                const lnglats = [...this._create.lnglats];
                lnglats.push([event.lng, event.lat]);
                const line = new Polyline(lnglats);
                this._create.graphic = new Graphic(line, this._defaultLineSymbol);
                this._createLayer.add(this._create.graphic);
            }
        }
        this.redraw();
    }
    _onMouseUp(event) {
    }
    destroy() {
        this._measureLayer = null;
        this._map.off("resize", this._onResize);
        this._map.off("extent", this._extentChange);
    }
}
