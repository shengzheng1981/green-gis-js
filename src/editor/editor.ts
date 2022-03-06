import {Geometry, GeometryType} from "../geometry/geometry";
import {Bound} from "../util/bound";
import {Projection} from "../projection/projection";
import {GraphicLayer} from "../layer/graphic-layer";
import {Layer} from "../layer/layer";
import {Graphic} from "../element/graphic";
import {Feature} from "../element/feature";
import {FeatureLayer} from "../layer/feature-layer";
import {Utility} from "../util/utility";
import {Map} from "../map";
import {Point} from "../geometry/point";
import {Symbol, SimpleFillSymbol, SimpleLineSymbol, SimplePointSymbol, VertexSymbol} from "../symbol/symbol";
import {Subject} from "../util/subject";
import {Polyline} from "../geometry/polyline";
import {Polygon} from "../geometry/polygon";

export enum EditorActionType {
    Select = 0,
    Create = 1,
    Edit = 2
}
/**
 * Editor
 * 相对于Viewer，管理所有编辑状态下的图层
 * 优化的产物
 */
export class Editor extends Subject{
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;

    private _map: Map;
    private _featureLayer: FeatureLayer;

    private _editing: boolean;
    private _editingFeature: Feature;
    private _vertexLayer: GraphicLayer;
    private _createLayer: GraphicLayer;

    private _drag: any = {
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
    private _create: any = {
        click: 0,
        graphic: null,
        lnglats: []
    };
    private _action: EditorActionType = EditorActionType.Select;

    private _defaultPointSymbol: Symbol = new SimplePointSymbol();
    private _defaultLineSymbol: Symbol = new SimpleLineSymbol();
    private _defaultPolygonSymbol: Symbol = new SimpleFillSymbol();

    get editing(): boolean {
        return this._editing;
    }
    get editingFeature(): Feature {
        return this._editingFeature;
    }
    get action(): EditorActionType {
        return this._action;
    }
    set action(value) {
        this._action = value;
    }
    get defaultPointSymbol(): Symbol {
        return this._defaultPointSymbol;
    }
    set defaultPointSymbol(value: Symbol) {
        this._defaultPointSymbol = value;
    }
    get defaultLineSymbol(): Symbol {
        return this._defaultLineSymbol;
    }
    set defaultLineSymbol(value: Symbol) {
        this._defaultLineSymbol = value;
    }
    get defaultPolygonSymbol(): Symbol {
        return this._defaultPolygonSymbol;
    }
    set defaultPolygonSymbol(value: Symbol) {
        this._defaultPolygonSymbol = value;
    }
    /**
     * 创建Editor
     * 不应自主创建，map内部创建
     * @param {Map} map - 地图容器
     */
    constructor(map: Map) {
        super(["mouseover", "mouseout", "startedit", "stopedit", "click", "update", "commit", "create", "delete"]); //when mouseover feature or vertex
        this._map = map;
        const container = map.container;
        //create canvas
        this._canvas = document.createElement("canvas");
        this._canvas.style.cssText = "position: absolute; height: 100%; width: 100%; z-index: 90";
        this._canvas.width = container.clientWidth ;
        this._canvas.height = container.clientHeight;
        container.appendChild(this._canvas);

        this._ctx = this._canvas.getContext("2d");

        this._onResize = this._onResize.bind(this);
        this._extentChange = this._extentChange.bind(this);
        this._switchEditing = this._switchEditing.bind(this);

        this._map.on("resize", this._onResize);
        this._map.on("extent", this._extentChange);

    }

    setFeatureLayer(layer: FeatureLayer) {
        if (this._editing) {
            this._featureLayer = layer;
            this._featureLayer.editing = true;
            this._featureLayer.on("dblclick", this._switchEditing);
            this._map.redraw();
            //layer.draw(this._ctx, this._map.projection, this._map.extent, this._map.zoom);
        } else {
            throw new Error("please start editing!");
        }
    }

    start() {
        if (!this._editing) {
            this._editing = true;
            this._vertexLayer = new GraphicLayer();
            this._action = EditorActionType.Select;
            this._createLayer = new GraphicLayer();
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

    addFeature(feature: Feature) {
        this._featureLayer.featureClass.addFeature(feature);
        feature.on("dblclick", this._switchEditing);
        this._handlers["create"].forEach(handler => handler({feature: feature}));
        this.redraw();
    }

    removeFeature(feature: Feature) {
        this._featureLayer.featureClass.removeFeature(feature);
        feature.off("dblclick", this._switchEditing);
        this._handlers["delete"].forEach(handler => handler({feature: feature}));
        this.redraw();
    }

    _onResize(event) {
        this._canvas.width = this._map.container.clientWidth ;
        this._canvas.height = this._map.container.clientHeight;
    }

    _extentChange(event) {
        this._ctx.setTransform(event.matrix.a, 0, 0, event.matrix.d, event.matrix.e, event.matrix.f);
        this.redraw();
    }

    _getMiddlePoint(point1: Point, point2: Point): Point {
        point1.project(this._map.projection);
        point2.project(this._map.projection);
        const [x, y] = [(point1.x + point2.x) / 2, (point1.y + point2.y) / 2];
        const [lng, lat] = this._map.projection.unproject([x, y]);
        return new Point(lng, lat);
    }

    _switchEditing(event) {
        if (!this._editingFeature && this._action === EditorActionType.Select) {
            this._action = EditorActionType.Edit;
            this._editingFeature = event.feature;
            if (this._editingFeature.geometry instanceof Point) {
                const point: Point = this._editingFeature.geometry;
                const vertex: Graphic = new Graphic(point, new VertexSymbol());
                this._vertexLayer.add(vertex);
                this.redraw();
            } else if (this._editingFeature.geometry instanceof Polyline) {
                const polyline: Polyline = this._editingFeature.geometry;
                polyline.lnglats.forEach( (lnglat, index) => {
                    const point: Point = new Point(lnglat[0], lnglat[1]);
                    const vertex: Graphic = new Graphic(point, new VertexSymbol());
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
            } else if (this._editingFeature.geometry instanceof Polygon) {
                const polygon: Polygon = this._editingFeature.geometry;
                polygon.lnglats.forEach( ring => {
                    ring.forEach(lnglat => {
                        const point: Point = new Point(lnglat[0], lnglat[1]);
                        const vertex: Graphic = new Graphic(point, new VertexSymbol());
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
                    })
                });
                this.redraw();
            }
        } else if (this._editingFeature === event.feature && this._action === EditorActionType.Edit) {
            this._action = EditorActionType.Select;
            if (this._editingFeature.edited) {
                this._handlers["update"].forEach(handler => handler({feature: this._editingFeature}));
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
        this._vertexLayer  && this._vertexLayer.draw(this._ctx, this._map.projection, this._map.extent, this._map.zoom);
        this._createLayer  && this._createLayer.draw(this._ctx, this._map.projection, this._map.extent, this._map.zoom);
    }

    clear() {
        this._ctx.save();
        this._ctx.setTransform(1, 0, 0, 1, 0, 0);
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._ctx.restore();
    }

    _onClick(event) {
        if (event.detail > 1) return;
        if (this._action === EditorActionType.Create) {
            if (this._featureLayer.featureClass.type == GeometryType.Point) {
                const point: Point = new Point(event.lng, event.lat);
                const feature = new Feature(point, {}, this._defaultPointSymbol);
                this.addFeature(feature);
                this._action = EditorActionType.Select;
            } else if (this._featureLayer.featureClass.type == GeometryType.Polygon) {
                if (this._create.click == 0) {
                    this._createLayer.clear();
                    const point = new Point(event.lng, event.lat);
                    const graphic = new Graphic(point, this._defaultPointSymbol);
                    this._createLayer.add(graphic);
                    this._create.click += 1;
                    this._create.lnglats.push([event.lng, event.lat]);
                } else if (this._create.click == 1) {
                    const second = new Point(event.lng, event.lat);
                    const graphic1 = new Graphic(second, this._defaultPointSymbol);
                    this._createLayer.add(graphic1);
                    if (this._create.graphic) this._createLayer.remove(this._create.graphic);
                    this._create.lnglats.push([event.lng, event.lat]);
                    const line = new Polyline(this._create.lnglats);
                    this._create.graphic = new Graphic(line, this._defaultLineSymbol);
                    this._createLayer.add(this._create.graphic);
                    this._create.click += 1;
                } else {
                    const second = new Point(event.lng, event.lat);
                    const graphic1 = new Graphic(second, this._defaultPointSymbol);
                    this._createLayer.add(graphic1);
                    if (this._create.graphic) this._createLayer.remove(this._create.graphic);
                    this._create.lnglats.push([event.lng, event.lat]);
                    const polygon = new Polygon([this._create.lnglats]);
                    this._create.graphic = new Graphic(polygon, this._defaultPolygonSymbol);
                    this._createLayer.add(this._create.graphic);
                    this._create.click += 1;
                }
            } else if (this._featureLayer.featureClass.type == GeometryType.Polyline) {
                if (this._create.click == 0) {
                    this._createLayer.clear();
                    const point = new Point(event.lng, event.lat);
                    const graphic = new Graphic(point, this._defaultPointSymbol);
                    this._createLayer.add(graphic);
                    this._create.click += 1;
                    this._create.lnglats.push([event.lng, event.lat]);
                } else {
                    const second = new Point(event.lng, event.lat);
                    const graphic1 = new Graphic(second, this._defaultPointSymbol);
                    this._createLayer.add(graphic1);
                    if (this._create.graphic) this._createLayer.remove(this._create.graphic);
                    this._create.lnglats.push([event.lng, event.lat]);
                    const line = new Polyline(this._create.lnglats);
                    this._create.graphic = new Graphic(line, this._defaultLineSymbol);
                    this._createLayer.add(this._create.graphic);
                    this._create.click += 1;
                }
            }
            this._handlers["click"].forEach(handler => handler(event));

        } else if (this._action === EditorActionType.Edit) {
            
        } else {
            /*if (!this._editingFeature) {
                this._featureLayer.contain(event.offsetX, event.offsetY, this._map.projection, this._map.extent, this._map.zoom, "click");
            }*/
        }
    }

    _onDoubleClick(event) {
        if (!this._editing) return;
        if (this._action === EditorActionType.Create) {
            if (this._featureLayer.featureClass.type == GeometryType.Polygon) {
                if (this._create.click > 1){
                    if (this._create.graphic) this._createLayer.remove(this._create.graphic);
                    const polygon = new Polygon([this._create.lnglats]);
                    const feature = new Feature(polygon, {}, this._defaultPolygonSymbol);
                    this._create = {
                        click: 0,
                        graphic: null,
                        lnglats: []
                    };
                    this._createLayer.clear();
                    this.addFeature(feature);
                    this._action = EditorActionType.Select;
                }
            } else if (this._featureLayer.featureClass.type == GeometryType.Polyline) {
                if (this._create.click > 0){
                    if (this._create.graphic) this._createLayer.remove(this._create.graphic);
                    const polyline = new Polyline(this._create.lnglats);
                    const feature = new Feature(polyline, {}, this._defaultLineSymbol);
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
        } else if (this._action === EditorActionType.Edit) {
            if (this._featureLayer.featureClass.type == GeometryType.Point) {
                if (this._editingFeature) {
                    this._action = EditorActionType.Select;
                    if (this._editingFeature.edited) {
                        this._handlers["update"].forEach(handler => handler({feature: this._editingFeature}));
                        this._editingFeature.edited = false;
                    }
                    this._editingFeature = null;
                    this._vertexLayer.clear();
                    this.redraw();
                }
            }
        } 
        if (this._editingFeature && !(this._editingFeature.geometry instanceof Point)) {
            const flag = this._vertexLayer.contain(event.offsetX, event.offsetY, this._map.projection, this._map.extent, this._map.zoom, "dblclick");
            if (flag) return;
        }
        this._featureLayer.contain(event.offsetX, event.offsetY, this._map.projection, this._map.extent, this._map.zoom, "dblclick");
    }

    _onMouseDown(event) {
        if (this._action === EditorActionType.Create) return;
        if (this._editingFeature) {
            this._drag.flag = this._vertexLayer.contain(event.offsetX, event.offsetY, this._map.projection, this._map.extent, this._map.zoom, "dragstart");
            this._drag.start.x = event.x;
            this._drag.start.y = event.y;
        }
    }

    _onMouseMove(event) {
        if (this._action === EditorActionType.Create) {
            if (this._featureLayer.featureClass.type == GeometryType.Polygon) {
                if (this._create.click == 1) {
                    if (this._create.graphic) this._createLayer.remove(this._create.graphic);
                    const lnglats: any = [...this._create.lnglats];
                    lnglats.push([event.lng, event.lat]);
                    const line = new Polyline(lnglats);
                    this._create.graphic = new Graphic(line, this._defaultLineSymbol);
                    this._createLayer.add(this._create.graphic);
                } else if (this._create.click > 1){
                    if (this._create.graphic) this._createLayer.remove(this._create.graphic);
                    const lnglats: any = [...this._create.lnglats];
                    lnglats.push([event.lng, event.lat]);
                    const polygon = new Polygon([lnglats]);
                    this._create.graphic = new Graphic(polygon, this._defaultPolygonSymbol);
                    this._createLayer.add(this._create.graphic);
                }
            } else if (this._featureLayer.featureClass.type == GeometryType.Polyline) {
                if (this._create.click > 0) {
                    if (this._create.graphic) this._createLayer.remove(this._create.graphic);
                    const lnglats: any = [...this._create.lnglats];
                    lnglats.push([event.lng, event.lat]);
                    const line = new Polyline(lnglats);
                    this._create.graphic = new Graphic(line, this._defaultLineSymbol);
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
            } else {
                this.emit("mouseout", event);
            }
        }
    }

    _onMouseUp(event) {
        if (this._action === EditorActionType.Create) return;
        if (this._drag.flag) {
            this._drag.end.x = event.x;
            this._drag.end.y = event.y;
            this._drag.flag = false;
            this._editingFeature.edited = true;
            if (this._editingFeature.geometry instanceof Point) {
                const point: Point = this._editingFeature.geometry;
                point.move(this._ctx, this._map.projection, event.offsetX, event.offsetY);
                this.redraw();
            } else if (this._editingFeature.geometry instanceof Polyline) {
                if (this._drag.vertex) {
                    const polyline: Polyline = this._editingFeature.geometry;
                    const point: Point = this._drag.vertex.geometry;
                    polyline.splice(this._ctx, this._map.projection, [point.lng, point.lat], event.offsetX, event.offsetY, !event.shiftKey);
                    if (event.shiftKey) {
                        const shift: Point = new Point(point.lng, point.lat);
                        shift.move(this._ctx, this._map.projection, event.offsetX, event.offsetY);
                        const vertex: Graphic = new Graphic(shift, new VertexSymbol());
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
                    } else {
                        point.move(this._ctx, this._map.projection, event.offsetX, event.offsetY);
                    }
                    this._drag.vertex = null;
                    this.redraw();
                }
            } else if (this._editingFeature.geometry instanceof Polygon) {
                if (this._drag.vertex) {
                    const polygon: Polygon = this._editingFeature.geometry;
                    const point: Point = this._drag.vertex.geometry;
                    polygon.splice(this._ctx, this._map.projection, [point.lng, point.lat], event.offsetX, event.offsetY, !event.shiftKey);
                    if (event.shiftKey) {
                        const shift: Point = new Point(point.lng, point.lat);
                        shift.move(this._ctx, this._map.projection, event.offsetX, event.offsetY);
                        const vertex: Graphic = new Graphic(shift, new VertexSymbol());
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
                    } else {
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