import { SimplePointSymbol, SimpleTextSymbol, ClusterSymbol } from "../symbol/symbol";
import { WebMercator } from "../projection/web-mercator";
import { Subject } from "../util/subject";
/**
 * 矢量要素
 * @remarks
 * Graphic vs Feature：Graphic作为图形，可以一图形对应一渲染符号；而Feature作为矢量要素，常规应该根据图层设定的渲染方式Renderer来得到各个Feature的渲染符号，而非单一设置。
 * Graphic = Geometry + Symbol
 * Feature = Geometry + Properties
 * ArcGIS AO/AE: Feature = Geometry + Properties
 * ArcGIS JS API: Feature = Graphic = Geometry + Properties + Symbol
 */
export class Feature extends Subject {
    /*private _animation: Animation;
    get animation(): Animation {
        return this._animation;
    }
    set animation(value: Animation) {
        this._animation = value;
    }*/
    /**
     * 创建矢量要素
     * @param {Geometry} geometry - 空间图形
     * @param {Object} properties - 属性信息
     * @param {Symbol} symbol - 渲染符号
     */
    constructor(geometry, properties, symbol) {
        super(["click", "dblclick", "mouseover", "mouseout"]);
        /**
         * 是否可见
         */
        this.visible = true;
        this._geometry = geometry;
        this._properties = properties;
        this._symbol = symbol;
    }
    //****************重要说明***************
    //有关 getter setter
    //1.如按原先代码规则，private _variable
    //  只做为类内部函数服务：no getter no setter
    //  只读：getter no setter
    //  读写：getter + setter
    //2.后经 public 的定义扩展，可得到：
    //  public = private + getter + setter
    //  另：public 可省略
    //注：两种规则无差别，按习惯编写。
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
     * 空间图形
     */
    get geometry() {
        return this._geometry;
    }
    /**
     * 属性信息
     */
    get properties() {
        return this._properties;
    }
    /**
     * 标注符号
     */
    get text() {
        return this._text;
    }
    /**
     * 标注符号
     */
    set text(value) {
        this._text = value;
    }
    /**
     * 包络矩形
     */
    get bound() {
        return this._geometry ? this._geometry.bound : null;
    }
    /**
     * 是否处于编辑状态
     */
    get edited() {
        return this._edited;
    }
    /**
     * 是否处于编辑状态
     */
    set edited(value) {
        this._edited = value;
    }
    /**
     * 绘制要素
     * @remarks 调用空间坐标信息进行图形绘制
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {Projection} projection - 坐标投影转换
     * @param {Bound} extent - 当前可视范围
     * @param {Symbol} symbol - 渲染符号，一般来自于renderer
     */
    draw(ctx, projection = new WebMercator(), extent = projection.bound, symbol = new SimplePointSymbol()) {
        if (this.visible)
            this._geometry.draw(ctx, projection, extent, symbol instanceof ClusterSymbol ? symbol : (this._symbol || symbol));
    }
    /*animate(elapsed, ctx: CanvasRenderingContext2D, projection: Projection = new WebMercator(), extent: Bound = projection.bound, animation: Animation = new Animation()) {
        if (this.visible) this._geometry.animate(elapsed, ctx, projection, extent, this._animation || animation);
    }*/
    /**
     * 标注要素
     * @remarks 调用空间坐标信息进行标注绘制
     * @param {Field} field - 标注字段
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {Projection} projection - 坐标投影转换
     * @param {SimpleTextSymbol} symbol - 标注符号
     */
    label(field, ctx, projection = new WebMercator(), symbol = new SimpleTextSymbol()) {
        if (this.visible)
            this._geometry.label(this._properties[field.name], ctx, projection, this._text || symbol);
    }
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
     * @remarks 鼠标坐标是否落入要素
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
                    //this._handlers["mouseover"].forEach(handler => handler({feature: this, screenX: screenX, screenY: screenY}));
                    this.emit("mouseover", { feature: this, screenX: screenX, screenY: screenY });
                }
                else if (this._contained && !flag) {
                    //this._handlers["mouseout"].forEach(handler => handler({feature: this, screenX: screenX, screenY: screenY}));
                    this.emit("mouseout", { feature: this, screenX: screenX, screenY: screenY });
                }
            }
            this._contained = flag;
            return flag;
        }
    }
}
