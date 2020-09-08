import { Bound } from "../util/bound";
import { Geometry } from "../geometry/geometry";
import { Symbol, SimpleTextSymbol } from "../symbol/symbol";
import { Projection } from "../projection/projection";
import { Field } from "../data/field";
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
export declare class Feature extends Subject {
    /**
     * 空间图形
     */
    private _geometry;
    /**
     * 属性信息
     */
    private _properties;
    /**
     * 渲染符号
     * @remarks
     * 此处两个符号，本应不存在：
     * Graphic vs Feature：Graphic作为图形，可以一图形对应一渲染符号；而Feature作为矢量要素，常规应该根据图层设定的渲染方式Renderer来得到各个Feature的渲染符号，而非单一设置。
     * 此处加入的原因如下：
     * 由于一些特例需求的存在，例如要素被选中状态，要素需要高亮符号等等，因此该符号独立于图层的渲染方式，原本针对这些特例会做一些专门的解决模式（可参考ArcGIS，设定图层专有的选中符号），
     * 但此处为方便起见，暂保留该设置。
     */
    private _symbol;
    /**
     * 标注符号
     * @remarks
     * 参考渲染符号说明
     */
    private _text;
    /**
     * 记录鼠标是否当前悬停在要素内
     */
    private _contained;
    /**
     * 是否可见
     */
    visible: boolean;
    /**
     * 是否处于编辑状态
     */
    private _edited;
    /**
     * 渲染符号
     */
    get symbol(): Symbol;
    /**
     * 渲染符号
     */
    set symbol(value: Symbol);
    /**
     * 空间图形
     */
    get geometry(): Geometry;
    /**
     * 属性信息
     */
    get properties(): any;
    /**
     * 标注符号
     */
    get text(): SimpleTextSymbol;
    /**
     * 标注符号
     */
    set text(value: SimpleTextSymbol);
    /**
     * 包络矩形
     */
    get bound(): Bound;
    /**
     * 是否处于编辑状态
     */
    get edited(): boolean;
    /**
     * 是否处于编辑状态
     */
    set edited(value: boolean);
    /**
     * 创建矢量要素
     * @param {Geometry} geometry - 空间图形
     * @param {Object} properties - 属性信息
     * @param {Symbol} symbol - 渲染符号
     */
    constructor(geometry: any, properties: any, symbol?: any);
    /**
     * 绘制要素
     * @remarks 调用空间坐标信息进行图形绘制
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {Projection} projection - 坐标投影转换
     * @param {Bound} extent - 当前可视范围
     * @param {Symbol} symbol - 渲染符号，一般来自于renderer
     */
    draw(ctx: CanvasRenderingContext2D, projection?: Projection, extent?: Bound, symbol?: Symbol): void;
    /**
     * 标注要素
     * @remarks 调用空间坐标信息进行标注绘制
     * @param {Field} field - 标注字段
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {Projection} projection - 坐标投影转换
     * @param {SimpleTextSymbol} symbol - 标注符号
     */
    label(field: Field, ctx: CanvasRenderingContext2D, projection?: Projection, symbol?: SimpleTextSymbol): void;
    /**
     * 判断是否在可视范围内
     * @param {Projection} projection - 坐标投影转换
     * @param {Bound} extent - 当前可视范围
     * @return {boolean} 是否在可视范围内
     */
    intersect(projection?: Projection, extent?: Bound): boolean;
    /**
     * 交互判断
     * @remarks 鼠标坐标是否落入要素
     * @param {number} screenX - 鼠标屏幕坐标X
     * @param {number} screenX - 鼠标屏幕坐标Y
     * @param {string} event - 当前事件名称
     * @return {boolean} 是否落入
     */
    contain(screenX: number, screenY: number, event?: string): boolean;
}
