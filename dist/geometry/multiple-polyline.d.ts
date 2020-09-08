import { CoordinateType, Geometry } from "./geometry";
import { Bound } from "../util/bound";
import { Projection } from "../projection/projection";
import { LineSymbol } from "../symbol/symbol";
/**
 * 多段线
 * @remarks
 * 数据结构：such as [[[1,1],[2,2]],[[3,3],[4,4]]]
 * [polyline[point[xy]]]
 */
export declare class MultiplePolyline extends Geometry {
    static TOLERANCE: number;
    private _tolerance;
    private _lnglats;
    private _coordinates;
    private _screen;
    /**
     * 创建多段线
     * @param {number[][][} lnglats - 坐标集合，三维数组
     */
    constructor(lnglats: number[][][]);
    /**
     * 输出GeoJSON格式字符串
     */
    toGeoJSON(): {
        type: string;
        coordinates: number[][][];
    };
    /**
     * 投影变换
     * @param {Projection} projection - 坐标投影转换
     */
    project(projection: Projection): void;
    /**
     * 绘制线
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {Projection} projection - 坐标投影转换
     * @param {Bound} extent - 当前可视范围
     * @param {Symbol} symbol - 渲染符号
     */
    draw(ctx: CanvasRenderingContext2D, projection?: Projection, extent?: Bound, symbol?: LineSymbol): void;
    /**
     * 是否包含传入坐标
     * @remarks
     * 线是1维，所以要设置一个tolerance容差，来判断坐标是否落到线上
     * @param {number} screenX - 鼠标屏幕坐标X
     * @param {number} screenX - 鼠标屏幕坐标Y
     * @return {boolean} 是否落入
     */
    contain(screenX: number, screenY: number): boolean;
    /**
     * 获取线的中心点
     * @remarks
     * from Leaflet
     * TODO: now return first polyline center
     * @param {CoordinateType} type - 坐标类型
     * @param {Projection} projection - 坐标投影转换
     * @return {number[]} 中心点坐标
     */
    getCenter(type?: CoordinateType, projection?: Projection): any;
}
