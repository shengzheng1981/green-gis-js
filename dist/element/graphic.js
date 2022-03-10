import { WebMercator } from "../projection/web-mercator";
import { Subject } from "../util/subject";
/**
 * 图形要素
 * @remarks
 * 区别与Feature，单纯的图形
 */
export class Graphic extends Subject {
    /*private _animation: Animation;
    get animation(): Animation {
        return this._animation;
    }
    set animation(value: Animation) {
        this._animation = value;
    }*/
    /**
     * 创建图形要素
     * @param {Geometry} geometry - 空间图形
     * @param {Symbol} symbol - 渲染符号
     */
    constructor(geometry, symbol) {
        super(["click", "dblclick", "mouseover", "mouseout", "dragstart", "rightclick"]);
        /**
         * 是否可见
         */
        this.visible = true;
        this._geometry = geometry;
        this._symbol = symbol;
    }
    /**
     * 包络矩形
     */
    get bound() {
        return this._geometry ? this._geometry.bound : null;
    }
    /**
     * 空间图形
     */
    get geometry() {
        return this._geometry;
    }
    /**
     * 渲染符号
     */
    get symbol() {
        return this._symbol;
    }
    /**
     * 渲染符号
     */
    set symbol(value) {
        this._symbol = value;
    }
    /**
     * 绘制图形
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {Projection} projection - 坐标投影转换
     * @param {Bound} extent - 当前可视范围
     */
    draw(ctx, projection = new WebMercator(), extent = projection.bound) {
        if (this.visible)
            this._geometry.draw(ctx, projection, extent, this._symbol);
    }
    /*animate(elapsed, ctx: CanvasRenderingContext2D, projection: Projection = new WebMercator(), extent: Bound = projection.bound) {
        if (this.visible) this._geometry.animate(elapsed, ctx, projection, extent, this._animation);
    }*/
    /**
     * 判断是否在可视范围内
     * @param {Projection} projection - 坐标投影转换
     * @param {Bound} extent - 当前可视范围
     * @return {boolean} 是否在可视范围内
     */
    intersect(projection = new WebMercator(), extent = projection.bound) {
        if (this.visible)
            return this._geometry.intersect(projection, extent);
    }
    /**
     * 交互判断
     * @remarks 鼠标坐标是否落入图形
     * @param {number} screenX - 鼠标屏幕坐标X
     * @param {number} screenX - 鼠标屏幕坐标Y
     * @param {string} event - 当前事件名称
     * @return {boolean} 是否落入
     */
    contain(screenX, screenY, event = undefined) {
        if (this.visible) {
            const flag = this._geometry.contain(screenX, screenY);
            if (event == "mousemove") {
                if (!this._contained && flag) {
                    this.emit("mouseover", { feature: this, screenX: screenX, screenY: screenY });
                }
                else if (this._contained && !flag) {
                    this.emit("mouseout", { feature: this, screenX: screenX, screenY: screenY });
                }
            }
            this._contained = flag;
            return flag;
        }
    }
}
