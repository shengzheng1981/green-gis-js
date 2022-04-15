import {Map} from "./map";
import {FeatureLayer} from "./layer/feature-layer";
import {Feature} from "./element/feature";
import {Graphic} from "./element/graphic";
import {Point} from "./geometry/point";
import {GraphicLayer} from "./layer/graphic-layer";
import {Utility} from "./util/utility";
import {Layer} from "./layer/layer";
import {Subject} from "./util/subject";

/**
 * Viewer
 * 相对于Editor，管理所有非编辑状态下的图层
 * 优化的产物
 */
export class Viewer extends Subject{
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;

    private _map: Map;
    //图层列表
    private _layers: Layer[] = [];
    /**
     * 创建Viewer
     * 不应自主创建，map内部创建
     * @param {Map} map - 地图容器
     */
    constructor(map: Map) {
        super(["mouseover", "mouseout"]); //when mouseover feature
        this._map = map;
        const container = map.container;
        //create canvas
        this._canvas = document.createElement("canvas");
        this._canvas.style.cssText = "position: absolute; height: 100%; width: 100%; z-index: 90";
        this._canvas.width = container.clientWidth ;
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
    //与主视图同步
    _onResize(event) {
        this._canvas.width = this._map.container.clientWidth ;
        this._canvas.height = this._map.container.clientHeight;
    }
    //与主视图同步
    _extentChange(event) {
        //const matrix = DOMMatrix.fromFloat64Array( new Float64Array([event.matrix.a, 0, 0, event.matrix.d, event.matrix.e, event.matrix.f] ) );
        //this._ctx.setTransform(matrix);
        this._ctx.setTransform(event.matrix.a, 0, 0, event.matrix.d, event.matrix.e, event.matrix.f);
        this.redraw();
    }
    //接管click事件
    _onClick(event) {
        const layers = [...this._layers];
        layers.filter(layer => layer instanceof FeatureLayer && layer.interactive && !layer.editing).reverse().some((layer: FeatureLayer) => layer.contain(event.offsetX, event.offsetY, this._map.projection, this._map.extent, this._map.zoom,"click"));
    }
    //接管doubleclick事件
    _onDoubleClick(event) {
        const layers = [...this._layers];
        layers.filter(layer => layer instanceof FeatureLayer && layer.interactive && !layer.editing).reverse().some((layer: FeatureLayer) => layer.contain(event.offsetX, event.offsetY, this._map.projection, this._map.extent, this._map.zoom,"dblclick"));
    }
    //接管mousemove事件
    _onMouseMove(event) {
        //if call Array.some, maybe abort mouseout last feature which mouseover!!! but filter maybe cause slow!!!no choice
        //const flag = this._layers.filter(layer => (layer instanceof FeatureLayer) && layer.interactive).some((layer: FeatureLayer) => layer.contain(event.offsetX, event.offsetY, this._projection, this._extent, "mousemove"));
        const layers = this._layers.filter(layer => layer instanceof FeatureLayer && layer.interactive && !layer.editing).filter((layer: FeatureLayer) => layer.contain(event.offsetX, event.offsetY, this._map.projection, this._map.extent, this._map.zoom, "mousemove"));
        if (layers.length > 0) {
            this.emit("mouseover", event);
        } else {
            this.emit("mouseout", event);
        }
    }
    /**
     * 添加图层
     * @param {Layer} layer - 图层
     */
    addLayer(layer) {
        this._layers.push(layer);
        this.redraw();
    }
    /**
     * 插入图层
     * @param {Layer} layer - 图层
     * @param {number} index - 图层顺序
     */
    insertLayer(layer, index: number = -1){
        index = index > this._layers.length ? -1 : index;
        if (index == -1) {
            this.addLayer(layer);
        } else {
            this._layers.splice(index, 0, layer);
            this.redraw();
        }
    }
    /**
     * 移除图层
     * @param {Layer} layer - 图层
     */
    removeLayer(layer) {
        const index = this._layers.findIndex(item => item === layer);
        index != -1 && this._layers.splice(index, 1);
        this.redraw();
    }
    /**
     * 清空图层
     */
    clearLayers() {
        this._layers = [];
        this.redraw();
    }
    /**
     * 重绘
     */
    redraw() {
        //const t0 = performance.now();

        this._ctx.save();
        this._ctx.setTransform(1, 0, 0, 1, 0, 0);
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._ctx.restore();

        this._layers.sort((a, b) => a.index - b.index).filter(layer => (layer instanceof FeatureLayer && !layer.editing) || !(layer instanceof FeatureLayer)).forEach(layer => {
            layer.draw(this._ctx, this._map.projection, this._map.extent, this._map.zoom);
        });
        this._layers.filter(layer => layer instanceof FeatureLayer && layer.labeled && !layer.editing).forEach((layer: FeatureLayer) => {
            layer.drawLabel(this._ctx, this._map.projection, this._map.extent, this._map.zoom);
        });

        //const t1 = performance.now();
        //console.log(`Call to redraw took ${t1 - t0} milliseconds.`);
    }
    /**
     * 清空画布
     */
    clear() {
        this._ctx.save();
        this._ctx.setTransform(1, 0, 0, 1, 0, 0);
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._ctx.restore();
    }
    /**
     * 销毁
     */
    destroy() {
        this._map.off("resize", this._onResize);
        this._map.off("extent", this._extentChange);

        this._map.off("click", this._onClick);
        this._map.off("dblclick", this._onDoubleClick);
        this._map.off("mousemove", this._onMouseMove);

    }
}