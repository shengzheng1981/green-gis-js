import { Bound } from "../util/bound";
import { Geometry } from "../geometry/geometry";
import { Symbol } from "../symbol/symbol";
import { Projection } from "../projection/projection";
import { Subject } from "../util/subject";
/**
 * 图形要素
 * @remarks
 * 区别与Feature，单纯的图形
 */
export declare class Graphic extends Subject {
    /**
     * 空间图形
     */
    private _geometry;
    /**
     * 渲染符号
     */
    private _symbol;
    /**
     * 记录鼠标是否当前悬停在要素内
     */
    private _contained;
    /**
     * 是否可见
     */
    visible: boolean;
    /**
     * 包络矩形
     */
    get bound(): Bound;
    /**
     * 空间图形
     */
    get geometry(): Geometry;
    /**
     * 渲染符号
     */
    get symbol(): Symbol;
    /**
     * 渲染符号
     */
    set symbol(value: Symbol);
    /**
     * 创建图形要素
     * @param {Geometry} geometry - 空间图形
     * @param {Symbol} symbol - 渲染符号
     */
    constructor(geometry: any, symbol: any);
    /**
     * 绘制图形
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {Projection} projection - 坐标投影转换
     * @param {Bound} extent - 当前可视范围
     */
    draw(ctx: CanvasRenderingContext2D, projection?: Projection, extent?: Bound): void;
    /**
     * 判断是否在可视范围内
     * @param {Projection} projection - 坐标投影转换
     * @param {Bound} extent - 当前可视范围
     * @return {boolean} 是否在可视范围内
     */
    intersect(projection?: Projection, extent?: Bound): boolean;
    /**
     * 交互判断
     * @remarks 鼠标坐标是否落入图形
     * @param {number} screenX - 鼠标屏幕坐标X
     * @param {number} screenX - 鼠标屏幕坐标Y
     * @param {string} event - 当前事件名称
     * @return {boolean} 是否落入
     */
    contain(screenX: number, screenY: number, event?: string): boolean;
}
