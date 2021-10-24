import { CoordinateType, Geometry } from "./geometry";
import { Bound } from "../util/bound";
import { Projection } from "../projection/projection";
import { Symbol } from "../symbol/symbol";
/**
 * 多点
 * @remarks
 * 数据结构：such as [[1,1],[2,2]]
 */
export declare class MultiplePoint extends Geometry {
    private _symbol;
    private _lnglats;
    private _coordinates;
    private _screen;
    /**
     * 创建多点
     * @param {number[][]} lnglats - 坐标集合，二维数组
     */
    constructor(lnglats: number[][]);
    /**
     * 输出GeoJSON格式字符串
     */
    toGeoJSON(): {
        type: string;
        coordinates: number[][];
    };
    /**
     * 投影变换
     * @param {Projection} projection - 坐标投影转换
     */
    project(projection: Projection): void;
    /**
     * 绘制点
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {Projection} projection - 坐标投影转换
     * @param {Bound} extent - 当前可视范围
     * @param {Symbol} symbol - 渲染符号
     */
    draw(ctx: CanvasRenderingContext2D, projection?: Projection, extent?: Bound, symbol?: Symbol): void;
    /**
     * 是否包含传入坐标
     * @remarks
     * 由于点是0维，主要根据渲染的符号大小来判断传入坐标是否落到点内
     * @param {number} screenX - 鼠标屏幕坐标X
     * @param {number} screenX - 鼠标屏幕坐标Y
     * @return {boolean} 是否落入
     */
    contain(screenX: number, screenY: number): boolean;
    /**
     * 获取中心点
     * TODO: now return first point center
     * @param {CoordinateType} type - 坐标类型
     * @param {Projection} projection - 坐标投影转换
     * @return {number[]} 中心点坐标
     */
    getCenter(type?: CoordinateType, projection?: Projection): number[];
}
