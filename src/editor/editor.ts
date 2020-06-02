import {Geometry} from "../geometry/geometry";
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
import {VertexSymbol} from "../symbol/symbol";
import {Subject} from "../util/subject";
import {Polyline} from "../geometry/polyline";
import {Polygon} from "../geometry/polygon";

export class Editor extends Subject{
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;

    private _map: Map;
    private _featureLayer: FeatureLayer;

    private _editing: boolean;
    private _editingFeature: Feature;
    private _vertexLayer: GraphicLayer;

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

    get editing(): boolean {
        return this._editing;
    }

    constructor(map: Map) {
        super(["mouseover", "mouseout", "startedit", "stopedit"]); //when mouseover feature or vertex
        this._map = map;
        const container = map.container;
        //create canvas
        this._canvas = document.createElement("canvas");
        this._canvas.style.cssText = "position: absolute; height: 100%; width: 100%; z-index: 90";
        this._canvas.width = container.clientWidth ;
        this._canvas.height = container.clientHeight;
        container.appendChild(this._canvas);

        this._ctx = this._canvas.getContext("2d");

        this._extentChange = this._extentChange.bind(this);
        this._switchEditing = this._switchEditing.bind(this);

        this._map.on("extent", this._extentChange);

    }

    setFeatureLayer(layer: FeatureLayer) {
        if (this._editing) {
            this._featureLayer = layer;
            this._featureLayer.editing = true;
            this._featureLayer.on("dblclick", this._switchEditing);
            //layer.draw(this._ctx, this._map.projection, this._map.extent, this._map.zoom);
        } else {
            throw new Error("please start editing!");
        }
    }

    start() {
        if (!this._editing) {
            this._editing = true;
            this._vertexLayer = new GraphicLayer();
            this._handlers["startedit"].forEach(handler => handler());
        }
        //TODO: edit stack for undo/redo
    }

    save() {

    }

    stop() {
        if (this._editing) {
            this._editing = false;
            this._featureLayer.editing = false;
            this._featureLayer.off("dblclick", this._switchEditing);
            this._featureLayer = null;
            this._vertexLayer = null;
            this.clear();
            this._handlers["stopedit"].forEach(handler => handler());
        }
    }

    _extentChange(event) {
        this._ctx.setTransform(event.matrix.a, 0, 0, event.matrix.d, event.matrix.e, event.matrix.f);
        this.redraw();
    }

    _switchEditing(event) {
        if (!this._editingFeature) {
            this._editingFeature = event.feature;
            if (this._editingFeature.geometry instanceof Point) {
                const point: Point = this._editingFeature.geometry;
                const vertex: Graphic = new Graphic(point, new VertexSymbol());
                this._vertexLayer.add(vertex);
                this.redraw();
            } else if (this._editingFeature.geometry instanceof Polyline) {
                const polyline: Polyline = this._editingFeature.geometry;
                polyline.lnglats.forEach( lnglat => {
                    const point: Point = new Point(lnglat[0], lnglat[1]);
                    const vertex: Graphic = new Graphic(point, new VertexSymbol());
                    this._vertexLayer.add(vertex);
                    vertex.on("dragstart", (event) => {
                        this._drag.vertex = vertex;
                    });
                    vertex.on("dblclick", (event) => {
                        this._vertexLayer.remove(vertex);
                        polyline.splice(this._ctx, this._map.projection, [point.lng, point.lat]);
                        this.redraw();
                    });
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
                            polygon.splice(this._ctx, this._map.projection, [point.lng, point.lat]);
                            this.redraw();
                        });
                    })
                });
                this.redraw();
            }
        } else if (this._editingFeature === event.feature) {
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
    }

    clear() {
        this._ctx.save();
        this._ctx.setTransform(1, 0, 0, 1, 0, 0);
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._ctx.restore();
    }

    _onClick(event) {

    }

    _onDoubleClick(event) {
        if (this._editingFeature && !(this._editingFeature.geometry instanceof Point)) {
            const flag = this._vertexLayer.contain(event.offsetX, event.offsetY, this._map.projection, this._map.extent, this._map.zoom, "dblclick");
            if (flag) return;
        }
        this._featureLayer.contain(event.offsetX, event.offsetY, this._map.projection, this._map.extent, this._map.zoom, "dblclick");
    }

    _onMouseDown(event) {
        if (this._editingFeature) {
            this._drag.flag = this._vertexLayer.contain(event.offsetX, event.offsetY, this._map.projection, this._map.extent, this._map.zoom, "dragstart");
            this._drag.start.x = event.x;
            this._drag.start.y = event.y;
        }
    }

    _onMouseMove(event) {
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
        if (this._drag.flag) {
            this._drag.end.x = event.x;
            this._drag.end.y = event.y;
            this._drag.flag = false;
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
        this._map.off("extent", this._extentChange);
    }
}