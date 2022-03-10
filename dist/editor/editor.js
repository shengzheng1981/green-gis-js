import { GeometryType } from "../geometry/geometry";
import { GraphicLayer } from "../layer/graphic-layer";
import { Graphic } from "../element/graphic";
import { Feature } from "../element/feature";
import { Point } from "../geometry/point";
import { SimpleFillSymbol, SimpleLineSymbol, SimplePointSymbol, VertexSymbol } from "../symbol/symbol";
import { Subject } from "../util/subject";
import { Polyline } from "../geometry/polyline";
import { Polygon } from "../geometry/polygon";
export var EditorActionType;
(function (EditorActionType) {
    EditorActionType[EditorActionType["Select"] = 0] = "Select";
    EditorActionType[EditorActionType["Create"] = 1] = "Create";
    EditorActionType[EditorActionType["Edit"] = 2] = "Edit";
})(EditorActionType || (EditorActionType = {}));
/**
 * Editor
 * 相对于Viewer，管理所有编辑状态下的图层
 * 优化的产物
 */
export class Editor extends Subject {
    /**
     * 创建Editor
     * 不应自主创建，map内部创建
     * @param {Map} map - 地图容器
     */
    constructor(map) {
        super(["mouseover", "mouseout", "startedit", "stopedit", "click", "update", "commit", "create", "delete"]); //when mouseover feature or vertex
        this._drag = {
            flag: false,
            vertex: null,
            middle: null,
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
        this._defaultPointSymbol = new SimplePointSymbol();
        this._defaultLineSymbol = new SimpleLineSymbol();
        this._defaultPolygonSymbol = new SimpleFillSymbol();
        this._drawPointSymbol = new SimplePointSymbol();
        this._map = map;
        this._container = map.container;
        //create canvas
        this._canvas = document.createElement("canvas");
        this._canvas.style.cssText = "position: absolute; height: 100%; width: 100%; z-index: 90";
        this._canvas.width = this._container.clientWidth;
        this._canvas.height = this._container.clientHeight;
        this._container.appendChild(this._canvas);
        this._ctx = this._canvas.getContext("2d");
        this._onResize = this._onResize.bind(this);
        this._extentChange = this._extentChange.bind(this);
        this._switchEditing = this._switchEditing.bind(this);
        this._map.on("resize", this._onResize);
        this._map.on("extent", this._extentChange);
        this._contextMenu = document.createElement("ul");
        this._contextMenu.classList.add("green-context-menu");
        this._container.appendChild(this._contextMenu);
        this._menuFinishEditing = this._createContextMenuItem("完成编辑");
        this._menuStopEditing = this._createContextMenuItem("停止编辑");
        this._menuDeleteVertex = this._createContextMenuItem("删除顶点");
        this._closeContextMenu = this._closeContextMenu.bind(this);
        this._finishEditing = this._finishEditing.bind(this);
        this._stopEditing = this._stopEditing.bind(this);
        this._deleteVertex = this._deleteVertex.bind(this);
        this._menuFinishEditing.addEventListener("click", this._finishEditing);
        this._menuStopEditing.addEventListener("click", this._stopEditing);
        this._menuDeleteVertex.addEventListener("click", this._deleteVertex);
        this._drawPointSymbol.radius = 5;
        this._drawPointSymbol.fillStyle = "#ffffff80";
        this._drawPointSymbol.lineWidth = 1;
        this._drawPointSymbol.strokeStyle = "#ff0000";
    }
    get editing() {
        return this._editing;
    }
    get dragging() {
        return this._drag.flag;
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
    /****** 公共函数 外部调用 ******/
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
    start() {
        this._startEditing();
        //TODO: edit stack for undo/redo
    }
    stop() {
        this._stopEditing();
    }
    create() {
        this._setCreateStatus();
        this._vertexLayer.clear();
        this._middleLayer.clear();
        this._editingFeature = null;
        this.redraw();
    }
    save() {
    }
    redraw() {
        this._ctx.save();
        this._ctx.setTransform(1, 0, 0, 1, 0, 0);
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._ctx.restore();
        this._featureLayer && this._featureLayer.draw(this._ctx, this._map.projection, this._map.extent, this._map.zoom);
        this._vertexLayer && this._vertexLayer.draw(this._ctx, this._map.projection, this._map.extent, this._map.zoom);
        this._createLayer && this._createLayer.draw(this._ctx, this._map.projection, this._map.extent, this._map.zoom);
        this._middleLayer && this._middleLayer.draw(this._ctx, this._map.projection, this._map.extent, this._map.zoom);
    }
    clear() {
        this._ctx.save();
        this._ctx.setTransform(1, 0, 0, 1, 0, 0);
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._ctx.restore();
    }
    /*** 响应map事件 ***/
    _onResize(event) {
        this._canvas.width = this._map.container.clientWidth;
        this._canvas.height = this._map.container.clientHeight;
    }
    _extentChange(event) {
        this._ctx.setTransform(event.matrix.a, 0, 0, event.matrix.d, event.matrix.e, event.matrix.f);
        this.redraw();
    }
    /*** 右键菜单 ***/
    _bindContextMenu() {
        const menu = this._contextMenu;
        const container = this._container;
        this._container.addEventListener("click", this._closeContextMenu);
        this._container.oncontextmenu = function (e) {
            menu.style.display = 'block';
            // 获取鼠标坐标
            var mouseX = e.clientX;
            var mouseY = e.clientY;
            // 判断边界值，防止菜单栏溢出可视窗口
            if (mouseX >= (container.clientWidth - menu.offsetWidth)) {
                mouseX = container.clientWidth - menu.offsetWidth;
            }
            else {
                mouseX = mouseX;
            }
            if (mouseY > container.clientHeight - menu.offsetHeight) {
                mouseY = container.clientHeight - menu.offsetHeight;
            }
            else {
                mouseY = mouseY;
            }
            menu.style.left = mouseX + 'px';
            menu.style.top = mouseY + 'px';
            return false;
        };
    }
    _unbindContextMenu() {
        this._container.oncontextmenu = function (e) {
            return true;
        };
        this._container.removeEventListener("click", this._closeContextMenu);
        this._closeContextMenu();
    }
    _showContextMenu() {
        this._contextMenu.style.visibility = "visible";
    }
    _hideContextMenu() {
        this._contextMenu.style.visibility = "hidden";
    }
    _closeContextMenu() {
        this._contextMenu.style.display = "none";
    }
    _initContextMenu(items) {
        while (this._contextMenu.firstChild) {
            this._contextMenu.removeChild(this._contextMenu.lastChild);
        }
        items.forEach(item => {
            this._contextMenu.appendChild(item);
        });
    }
    _createContextMenuItem(name) {
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.innerText = name;
        li.appendChild(span);
        return li;
    }
    /*** 启停编辑 ***/
    _startEditing() {
        if (!this._editing) {
            this._editing = true;
            this._vertexLayer = new GraphicLayer();
            this._middleLayer = new GraphicLayer();
            this._createLayer = new GraphicLayer();
            this._handlers["startedit"].forEach(handler => handler());
            this._setSelectStatus();
            this._bindContextMenu();
        }
    }
    _stopEditing() {
        if (this._editing) {
            this._editing = false;
            this._editingFeature = null;
            this._editingVertex = null;
            this._featureLayer.editing = false;
            this._featureLayer.off("dblclick", this._switchEditing);
            this._featureLayer = null;
            this._vertexLayer = null;
            this._middleLayer = null;
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
            this._unbindContextMenu();
        }
    }
    /*** 编辑状态切换 ***/
    _switchEditing(event) {
        if (!this._editingFeature && this._action === EditorActionType.Select) {
            this._setEditStatus();
            this._editingFeature = event.feature;
            if (this._editingFeature.geometry instanceof Point) {
                const point = this._editingFeature.geometry;
                const vertex = new Graphic(point, new VertexSymbol());
                this._vertexLayer.add(vertex);
                this.redraw();
            }
            else if (this._editingFeature.geometry instanceof Polyline) {
                const polyline = this._editingFeature.geometry;
                polyline.lnglats.forEach(lnglat => {
                    const point = new Point(lnglat[0], lnglat[1]);
                    this._createVertex(point);
                });
                this._drawMiddlePoint(polyline.lnglats, false);
                this.redraw();
            }
            else if (this._editingFeature.geometry instanceof Polygon) {
                const polygon = this._editingFeature.geometry;
                polygon.lnglats.forEach(ring => {
                    ring.forEach(lnglat => {
                        const point = new Point(lnglat[0], lnglat[1]);
                        this._createVertex(point);
                    });
                    this._drawMiddlePoint(ring, true);
                });
                this.redraw();
            }
        }
        else if (this._editingFeature === event.feature && this._action === EditorActionType.Edit) {
            this._finishEditing();
        }
    }
    _finishEditing() {
        this._setSelectStatus();
        if (this._editingFeature.edited) {
            this._handlers["update"].forEach(handler => handler({ feature: this._editingFeature }));
            this._editingFeature.edited = false;
        }
        this._editingFeature = null;
        this._vertexLayer.clear();
        this._middleLayer.clear();
        this.redraw();
    }
    /*** 编辑状态统一处理 ***/
    _setSelectStatus() {
        this._action = EditorActionType.Select;
        this._showContextMenu();
        this._initContextMenu([this._menuStopEditing]);
    }
    _setEditStatus() {
        this._action = EditorActionType.Edit;
        this._showContextMenu();
        this._initContextMenu([this._menuFinishEditing]);
    }
    _setCreateStatus() {
        this._action = EditorActionType.Create;
        this._hideContextMenu();
        this._initContextMenu([]);
    }
    /*** 顶点处理 ***/
    _createVertex(point) {
        const vertex = new Graphic(point, new VertexSymbol());
        this._vertexLayer.add(vertex);
        vertex.on("dragstart", (event) => {
            this._drag.vertex = vertex;
        });
        vertex.on("rightclick", (event) => {
            this._editingVertex = vertex;
        });
        return vertex;
    }
    _deleteVertex() {
        if (!this._editingVertex)
            return;
        const vertex = this._editingVertex;
        const geometry = this._editingFeature.geometry;
        if (geometry instanceof Polygon) {
            if (this._vertexLayer.graphics.length == 3) {
                this._editingVertex = null;
                throw new Error("polygon need 3 vertex!");
                return;
            }
            this._vertexLayer.remove(vertex);
            this._editingFeature.edited = true;
            const polygon = geometry;
            const point = vertex.geometry;
            polygon.splice(this._ctx, this._map.projection, [point.lng, point.lat]);
            polygon.lnglats.forEach(ring => {
                this._drawMiddlePoint(ring, true);
            });
        }
        else if (geometry instanceof Polyline) {
            if (this._vertexLayer.graphics.length == 2) {
                this._editingVertex = null;
                throw new Error("polyline need 2 vertex!");
                return;
            }
            this._vertexLayer.remove(vertex);
            this._editingFeature.edited = true;
            const polyline = geometry;
            const point = vertex.geometry;
            polyline.splice(this._ctx, this._map.projection, [point.lng, point.lat]);
            this._drawMiddlePoint(polyline.lnglats, false);
        }
        this._editingVertex = null;
        this.redraw();
    }
    _drawMiddlePoint(line, closed) {
        this._middleLayer.clear();
        line.forEach((lnglat, index) => {
            if (closed || index < line.length - 1) {
                //middle point
                let p1, p2;
                if (index < line.length - 1) {
                    p1 = new Point(lnglat[0], lnglat[1]), p2 = new Point(line[index + 1][0], line[index + 1][1]);
                }
                else {
                    p1 = new Point(lnglat[0], lnglat[1]), p2 = new Point(line[0][0], line[0][1]);
                }
                //middle point
                p1.project(this._map.projection);
                p2.project(this._map.projection);
                const [x, y] = [(p1.x + p2.x) / 2, (p1.y + p2.y) / 2];
                const [lng, lat] = this._map.projection.unproject([x, y]);
                const p = new Point(lng, lat);
                const symbol = new VertexSymbol();
                symbol.strokeStyle = "#ff0000";
                symbol.fillStyle = "#ffffff80";
                symbol.size = 8;
                const middle = new Graphic(p, symbol);
                middle.index = index;
                middle.on("dragstart", (event) => {
                    this._drag.middle = middle;
                });
                this._middleLayer.add(middle);
            }
        });
    }
    /*** 编辑事件处理 ***/
    _onClick(event) {
        if (event.detail > 1)
            return;
        if (this._action === EditorActionType.Create) {
            if (this._featureLayer.featureClass.type == GeometryType.Point) {
                const point = new Point(event.lng, event.lat);
                const feature = new Feature(point, {}, this._defaultPointSymbol);
                this.addFeature(feature);
                this._setSelectStatus();
            }
            else if (this._featureLayer.featureClass.type == GeometryType.Polygon) {
                if (this._create.click == 0) {
                    this._createLayer.clear();
                    const point = new Point(event.lng, event.lat);
                    const graphic = new Graphic(point, this._drawPointSymbol);
                    this._createLayer.add(graphic);
                    this._create.click += 1;
                    this._create.lnglats.push([event.lng, event.lat]);
                }
                else if (this._create.click == 1) {
                    const second = new Point(event.lng, event.lat);
                    const graphic1 = new Graphic(second, this._drawPointSymbol);
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
                    const graphic1 = new Graphic(second, this._drawPointSymbol);
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
            else if (this._featureLayer.featureClass.type == GeometryType.Polyline) {
                if (this._create.click == 0) {
                    this._createLayer.clear();
                    const point = new Point(event.lng, event.lat);
                    const graphic = new Graphic(point, this._drawPointSymbol);
                    this._createLayer.add(graphic);
                    this._create.click += 1;
                    this._create.lnglats.push([event.lng, event.lat]);
                }
                else {
                    const second = new Point(event.lng, event.lat);
                    const graphic1 = new Graphic(second, this._drawPointSymbol);
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
            this._handlers["click"].forEach(handler => handler(event));
        }
        else if (this._action === EditorActionType.Edit) {
            if (this._editingFeature && !(this._editingFeature.geometry instanceof Point)) {
                const flag = this._vertexLayer.contain(event.offsetX, event.offsetY, this._map.projection, this._map.extent, this._map.zoom, "click");
                if (flag)
                    return;
            }
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
            if (this._featureLayer.featureClass.type == GeometryType.Polygon) {
                if (this._create.click > 1) {
                    if (this._create.graphic)
                        this._createLayer.remove(this._create.graphic);
                    const polygon = new Polygon([this._create.lnglats]);
                    const feature = new Feature(polygon, {}, this._defaultPolygonSymbol);
                    this._create = {
                        click: 0,
                        graphic: null,
                        lnglats: []
                    };
                    this._createLayer.clear();
                    this.addFeature(feature);
                    this._setSelectStatus();
                }
            }
            else if (this._featureLayer.featureClass.type == GeometryType.Polyline) {
                if (this._create.click > 0) {
                    if (this._create.graphic)
                        this._createLayer.remove(this._create.graphic);
                    const polyline = new Polyline(this._create.lnglats);
                    const feature = new Feature(polyline, {}, this._defaultLineSymbol);
                    this._create = {
                        click: 0,
                        graphic: null,
                        lnglats: []
                    };
                    this._createLayer.clear();
                    this.addFeature(feature);
                    this._setSelectStatus();
                }
            }
            return;
        }
        else if (this._action === EditorActionType.Edit) {
            if (this._featureLayer.featureClass.type == GeometryType.Point) {
                if (this._editingFeature) {
                    this._setSelectStatus();
                    if (this._editingFeature.edited) {
                        this._handlers["update"].forEach(handler => handler({ feature: this._editingFeature }));
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
            if (flag)
                return;
        }
        this._featureLayer.contain(event.offsetX, event.offsetY, this._map.projection, this._map.extent, this._map.zoom, "dblclick");
    }
    _onMouseDown(event) {
        if (this._action === EditorActionType.Create)
            return;
        if (event.button == 2) { //右键
            if (this._action === EditorActionType.Edit) {
                if (this._featureLayer.featureClass.type == GeometryType.Polyline || this._featureLayer.featureClass.type == GeometryType.Polygon) {
                    const flag = this._vertexLayer.contain(event.offsetX, event.offsetY, this._map.projection, this._map.extent, this._map.zoom, "rightclick");
                    if (flag) {
                        this._initContextMenu([this._menuFinishEditing, this._menuDeleteVertex]);
                    }
                    else {
                        this._initContextMenu([this._menuFinishEditing]);
                    }
                }
            }
            return;
        }
        if (this._editingFeature) {
            this._drag.flag = this._vertexLayer.contain(event.offsetX, event.offsetY, this._map.projection, this._map.extent, this._map.zoom, "dragstart");
            if (!this._drag.flag) {
                this._drag.flag = this._middleLayer.contain(event.offsetX, event.offsetY, this._map.projection, this._map.extent, this._map.zoom, "dragstart");
            }
            this._drag.start.x = event.x;
            this._drag.start.y = event.y;
        }
    }
    _onMouseMove(event) {
        if (this._action === EditorActionType.Create) {
            if (this._featureLayer.featureClass.type == GeometryType.Polygon) {
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
            else if (this._featureLayer.featureClass.type == GeometryType.Polyline) {
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
            if (this._editingFeature.geometry instanceof Point) {
                const point = this._editingFeature.geometry;
                point.move(this._ctx, this._map.projection, event.offsetX, event.offsetY);
                this.redraw();
            }
            else if (this._editingFeature.geometry instanceof Polyline) {
                if (this._drag.vertex) {
                    const polyline = this._editingFeature.geometry;
                    const point = this._drag.vertex.geometry;
                    polyline.splice(this._ctx, this._map.projection, [point.lng, point.lat], event.offsetX, event.offsetY, true);
                    point.move(this._ctx, this._map.projection, event.offsetX, event.offsetY);
                    this._drawMiddlePoint(polyline.lnglats, false);
                    this._drag.vertex = null;
                    this.redraw();
                }
                if (this._drag.middle) {
                    const polyline = this._editingFeature.geometry;
                    const point = this._drag.middle.geometry;
                    polyline.splice2(this._ctx, this._map.projection, this._drag.middle.index, event.offsetX, event.offsetY, false);
                    const shift = new Point(point.lng, point.lat);
                    shift.move(this._ctx, this._map.projection, event.offsetX, event.offsetY);
                    this._createVertex(shift);
                    this._drawMiddlePoint(polyline.lnglats, false);
                    this._drag.middle = null;
                    this.redraw();
                }
            }
            else if (this._editingFeature.geometry instanceof Polygon) {
                if (this._drag.vertex) {
                    const polygon = this._editingFeature.geometry;
                    const point = this._drag.vertex.geometry;
                    polygon.splice(this._ctx, this._map.projection, [point.lng, point.lat], event.offsetX, event.offsetY, true);
                    point.move(this._ctx, this._map.projection, event.offsetX, event.offsetY);
                    polygon.lnglats.forEach(ring => {
                        this._drawMiddlePoint(ring, true);
                    });
                    this._drag.vertex = null;
                    this.redraw();
                }
                if (this._drag.middle) {
                    const polygon = this._editingFeature.geometry;
                    const point = this._drag.middle.geometry;
                    polygon.splice2(this._ctx, this._map.projection, this._drag.middle.index, event.offsetX, event.offsetY, false);
                    const shift = new Point(point.lng, point.lat);
                    shift.move(this._ctx, this._map.projection, event.offsetX, event.offsetY);
                    this._createVertex(shift);
                    polygon.lnglats.forEach(ring => {
                        this._drawMiddlePoint(ring, true);
                    });
                    this._drag.middle = null;
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
