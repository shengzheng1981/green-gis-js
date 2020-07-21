import { CoordinateType } from "./geometry/geometry";
import { Bound } from "./util/bound";
import { WebMercator } from "./projection/web-mercator";
import { GraphicLayer } from "./layer/graphic-layer";
import { Utility } from "./util/utility";
import { Editor } from "./editor/editor";
import { Viewer } from "./viewer";
import { Subject } from "./util/subject";
import { Tooltip } from "./tooltip/tooltip";
export class Map extends Subject {
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
            flag: false,
            finger_dist: 0,
            mouse: {
                x: 0,
                y: 0
            }
        };
        //地图缩放等级
        this._zoom = 1;
        //地图视图中心
        this._center = [0, 0];
        //默认图形图层
        this._defaultGraphicLayer = new GraphicLayer();
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
        this._viewer = new Viewer(this);
        this._viewer.on("mouseover", () => { Utility.addClass(this._canvas, "green-hover"); });
        this._viewer.on("mouseout", () => { Utility.removeClass(this._canvas, "green-hover"); });
        //editor
        this._editor = new Editor(this);
        this._editor.on("mouseover", () => { Utility.addClass(this._canvas, "green-hover"); });
        this._editor.on("mouseout", () => { Utility.removeClass(this._canvas, "green-hover"); });
        this._editor.on("startedit", () => { this._viewer.redraw(); });
        this._editor.on("stopedit", () => { this._viewer.redraw(); });
        //tooltip
        this._tooltip = new Tooltip(this);
        this._projection = new WebMercator();
        this._center = [0, 0];
        this._zoom = 10;
        //Latlng [-180, 180] [-90, 90]
        //this._ctx.setTransform(256/180 * Math.pow(2, this._zoom - 1), 0, 0, -256/90 * Math.pow(2, this._zoom - 1), this._canvas.width/2, this._canvas.height/2);
        const bound = this._projection.bound;
        //设置初始矩阵，由于地图切片是256*256，Math.pow(2, this._zoom)代表在一定缩放级别下x与y轴的切片数量
        this._ctx.setTransform(256 * Math.pow(2, this._zoom) / (bound.xmax - bound.xmin) * bound.xscale, 0, 0, 256 * Math.pow(2, this._zoom) / (bound.ymax - bound.ymin) * bound.yscale, this._canvas.width / 2, this._canvas.height / 2);
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
        const bound = this._projection.bound;
        this._ctx.setTransform(256 * Math.pow(2, this._zoom) / (bound.xmax - bound.xmin) * bound.xscale, 0, 0, 256 * Math.pow(2, this._zoom) / (bound.ymax - bound.ymin) * bound.yscale, this._canvas.width / 2, this._canvas.height / 2);
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
    //设置缩放到某一范围. 默认该范围2倍. 用于缩放到某一要素对应的bound
    fitBound(bound) {
        const origin = bound.getCenter();
        const center = this._projection.unproject(origin);
        bound.scale(2);
        const x_mpp = (bound.xmax - bound.xmin) / this._canvas.width; //x  meter per pixel
        const y_mpp = (bound.ymax - bound.ymin) / this._canvas.height; //y  meter per pixel
        //反算 zoom : x_mpp = (bound.xmax - bound.xmin) / (256 * Math.pow(2, this._zoom))
        if (x_mpp == 0 || y_mpp == 0) {
            this.setView(center, 20);
        }
        else {
            const full_bound = this._projection.bound;
            const x_zoom = Math.log2((full_bound.xmax - full_bound.xmin) / x_mpp / 256);
            const y_zoom = Math.log2((full_bound.ymax - full_bound.ymin) / y_mpp / 256);
            const zoom = Math.floor(Math.min(x_zoom, y_zoom, 20));
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
        this._extent = new Bound(Math.min(x1, x2), Math.min(y1, y2), Math.max(x1, x2), Math.max(y1, y2));
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
        const sensitivity = 5;
        if (Math.abs(event.deltaY) <= sensitivity)
            return;
        //const sensitivity = 100;
        //const delta = event.deltaY / sensitivity;
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
        if (zoom > 0) {
            // 放大
            zoom = this._zoom + zoom >= 20 ? 20 - this._zoom : zoom;
        }
        else if (zoom < 0) {
            // 缩小
            zoom = this._zoom + zoom <= 3 ? 3 - this.zoom : zoom;
        }
        if (zoom == 0)
            return;
        this._zoom += zoom;
        scale = Math.pow(2, zoom);
        //交互表现为 鼠标当前位置 屏幕坐标不变 进行缩放 即x2 = x1
        //第一种方案，坐标系不变，变坐标值
        //1.将原屏幕坐标 x1 转成 初始坐标 x0 = (x1 - e1) / a1  初始矩阵 (1,0,0,1,0,0)
        //2.初始坐标x0 转成 现屏幕坐标x2  a2 * x0 + e2 = x2    e2 = x2 - a2 * x0  代入1式 e2 = x2 - a2 * (x1 - e1) / a1
        //3.已知scale = a2 / a1  故 e2 = x2 - scale * (x1 - e1)
        //4.另矩阵变换 a1 * e + e1 = e2
        //5.联立3和4  求得 e = (x2 - scale * (x1 - e1) - e1) / a1
        const matrix = this._ctx.getTransform();
        const a1 = matrix.a, e1 = matrix.e, x1 = event.offsetX, x2 = x1; //放大到中心点 x2 = this._canvas.width / 2
        const e = (x2 - scale * (x1 - e1) - e1) / a1;
        const d1 = matrix.d, f1 = matrix.f, y1 = event.offsetY, y2 = y1; //放大到中心点 y2 = this._canvas.height / 2
        const f = (y2 - scale * (y1 - f1) - f1) / d1;
        this._ctx.transform(scale, 0, 0, scale, e, f);
        this.redraw();
    }
    _onTouchStart(event) {
        if (event.touches.length > 1) { // if multiple touches (pinch zooming)
            let diffX = event.touches[0].clientX - event.touches[1].clientX;
            let diffY = event.touches[0].clientY - event.touches[1].clientY;
            this._touch.finger_dist = Math.sqrt(diffX * diffX + diffY * diffY); // Save current finger distance
        } // Else just moving around
        this._touch.mouse.x = event.touches[0].clientX; // Save finger position
        this._touch.mouse.y = event.touches[0].clientY; //
    }
    _onTouchMove(event) {
        event.preventDefault(); // Stop the window from moving
        if (event.touches.length > 1) { // If pinch-zooming
            let diffX = event.touches[0].clientX - event.touches[1].clientX;
            let diffY = event.touches[0].clientY - event.touches[1].clientY;
            let new_finger_dist = Math.sqrt(diffX * diffX + diffY * diffY); // Get current distance between fingers
            let scale = Math.abs(new_finger_dist / this._touch.finger_dist); // Zoom is proportional to change
            let zoom = Math.round(Math.log(scale));
            if (zoom > 0) {
                // 放大
                zoom = this._zoom + zoom >= 20 ? 20 - this._zoom : zoom;
            }
            else if (zoom < 0) {
                // 缩小
                zoom = this._zoom + zoom <= 3 ? 3 - this.zoom : zoom;
            }
            if (zoom == 0)
                return;
            scale = Math.pow(2, zoom);
            this._zoom += zoom;
            this._touch.finger_dist = new_finger_dist; // Save current distance for next time
            const matrix = this._ctx.getTransform();
            const a1 = matrix.a, e1 = matrix.e, x1 = event.offsetX, x2 = x1; //放大到中心点 x2 = this._canvas.width / 2
            const e = (x2 - scale * (x1 - e1) - e1) / a1;
            const d1 = matrix.d, f1 = matrix.f, y1 = event.offsetY, y2 = y1; //放大到中心点 y2 = this._canvas.height / 2
            const f = (y2 - scale * (y1 - f1) - f1) / d1;
            this._ctx.transform(scale, 0, 0, scale, e, f);
            this.redraw();
        }
    }
    _onTouchEnd(event) {
        this._touch.mouse.x = event.touches[0].clientX;
        this._touch.mouse.y = event.touches[0].clientY; // could be down to 1 finger, back to moving image
    }
    //show tooltip
    showTooltip(feature, field) {
        const text = feature.properties[field.name];
        const center = feature.geometry.getCenter(CoordinateType.Projection, this.projection);
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
