import { Bound } from "./util/bound";
import { WebMercator } from "./projection/web-mercator";
import { GraphicLayer } from "./layer/graphic-layer";
import { FeatureLayer } from "./layer/feature-layer";
import { Utility } from "./util/utility";
export class Map {
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
        //图层列表
        this._defaultGraphicLayer = new GraphicLayer();
        this._layers = [];
        this._container = document.getElementById(id);
        //create canvas
        this._canvas = document.createElement("canvas");
        this._canvas.style.cssText = "height: 100%; width: 100%";
        this._canvas.width = this._container.clientWidth;
        this._canvas.height = this._container.clientHeight;
        this._container.appendChild(this._canvas);
        //create tooltip
        this._tooltip = document.createElement("div");
        Utility.addClass(this._tooltip, "green-tooltip");
        Utility.addClass(this._tooltip, "green-tooltip-placement-top");
        this._container.appendChild(this._tooltip);
        this._tooltipBody = document.createElement("div");
        Utility.addClass(this._tooltipBody, "green-tooltip-body");
        this._tooltip.appendChild(this._tooltipBody);
        this._tooltipArrow = document.createElement("div");
        Utility.addClass(this._tooltipArrow, "green-tooltip-arrow");
        Utility.addClass(this._tooltipArrow, "green-tooltip-arrow-placement-top");
        this._tooltipBody.appendChild(this._tooltipArrow);
        this._tooltipText = document.createElement("div");
        Utility.addClass(this._tooltipText, "green-tooltip-text");
        this._tooltipBody.appendChild(this._tooltipText);
        this._ctx = this._canvas.getContext("2d");
        this._canvas.addEventListener("click", this._onClick.bind(this));
        this._canvas.addEventListener("dblclick", this._onDoubleClick.bind(this));
        this._canvas.addEventListener("mousedown", this._onMouseDown.bind(this));
        this._canvas.addEventListener("mousemove", this._onMouseMove.bind(this));
        this._canvas.addEventListener("mouseup", this._onMouseUp.bind(this));
        this._canvas.addEventListener("wheel", this._onWheel.bind(this));
        this._projection = new WebMercator();
        this._center = [0, 0];
        this._zoom = 10;
        //Latlng [-180, 180] [-90, 90]
        //this._ctx.setTransform(256/180 * Math.pow(2, this._zoom - 1), 0, 0, -256/90 * Math.pow(2, this._zoom - 1), this._canvas.width/2, this._canvas.height/2);
        const bound = this._projection.bound;
        //设置初始矩阵，由于地图切片是256*256，Math.pow(2, this._zoom)代表在一定缩放级别下x与y轴的切片数量
        this._ctx.setTransform(256 * Math.pow(2, this._zoom) / (bound.xmax - bound.xmin) * bound.xscale, 0, 0, 256 * Math.pow(2, this._zoom) / (bound.ymax - bound.ymin) * bound.yscale, this._canvas.width / 2, this._canvas.height / 2);
    }
    get projection() {
        return this._projection;
    }
    //show tooltip
    _showTooltip(text, screenX, screenY) {
        this._tooltipText.innerHTML = text;
        //TODO: timeout is useless
        this._tooltip.style.cssText = "display: block; left: " + (screenX - this._tooltip.offsetWidth / 2) + "px; top: " + (screenY - this._tooltip.offsetHeight) + "px;";
    }
    _hideTooltip() {
        this._tooltip.style.cssText = "display: none";
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
        this._extent = new Bound(Math.min(x1, x2), Math.min(y1, y2), Math.max(x1, x2), Math.max(y1, y2));
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
        this._layers.filter(layer => (layer instanceof FeatureLayer) && layer.labeled).forEach((layer) => {
            layer.drawLabel(this._ctx, this._projection, this._extent, this._zoom);
        });
    }
    clear() {
        this._ctx.setTransform(1, 0, 0, 1, 0, 0);
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this.updateExtent();
    }
    _onClick(event) {
        const flag = this._layers.filter(layer => (layer instanceof FeatureLayer) && layer.interactive).some((layer) => layer.contain(event.offsetX, event.offsetY, this._projection, this._extent, "click"));
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
            //if call Array.some, maybe abort mouseout last feature which mouseover!!! but filter maybe cause slow!!!no choice
            //const flag = this._layers.filter(layer => (layer instanceof FeatureLayer) && layer.interactive).some((layer: FeatureLayer) => layer.contain(event.offsetX, event.offsetY, this._projection, this._extent, "mousemove"));
            const layers = this._layers.filter(layer => (layer instanceof FeatureLayer) && layer.interactive).filter((layer) => layer.contain(event.offsetX, event.offsetY, this._projection, this._extent, "mousemove"));
            if (layers.length > 0) {
                Utility.addClass(this._canvas, "green-hover");
                const layer = layers.find((layer) => layer.getTooltip());
                layer && this._showTooltip(layer.getTooltip(), event.offsetX, event.offsetY);
            }
            else {
                this._hideTooltip();
                Utility.removeClass(this._canvas, "green-hover");
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
