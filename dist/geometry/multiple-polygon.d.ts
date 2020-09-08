import { CoordinateType, Geometry } from "./geometry";
import { Bound } from "../util/bound";
import { Projection } from "../projection/projection";
import { FillSymbol } from "../symbol/symbol";
/**
 * 多个面
 * @remarks
 * 数据结构：[polygon[ring[point[xy]]]]：such as [[[[1,1],[2,2],[1,2]]], [[[3,3],[3,4],[4,4]]]]
 */
export declare class MultiplePolygon extends Geometry {
    private _lnglats;
    private _coordinates;
    private _screen;
    /**
     * 创建多个面
     * @param {number[][][][]} lnglats - 坐标集合，四维数组
     */
    constructor(lnglats: number[][][][]);
    /**
     * 输出GeoJSON格式字符串
     */
    toGeoJSON(): {
        type: string;
        coordinates: number[][][][];
    };
    /**
     * 投影变换
     * @param {Projection} projection - 坐标投影转换
     */
    project(projection: Projection): void;
    /**
     * 绘制面
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {Projection} projection - 坐标投影转换
     * @param {Bound} extent - 当前可视范围
     * @param {Symbol} symbol - 渲染符号
     */
    draw(ctx: CanvasRenderingContext2D, projection?: Projection, extent?: Bound, symbol?: FillSymbol): void;
    /**
     * 是否包含传入坐标
     * @remarks
     * 点是不是落在面内
     * from https://github.com/substack/point-in-polygon
     * ray-casting algorithm based on
     * http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
     * @param {number} screenX - 鼠标屏幕坐标X
     * @param {number} screenX - 鼠标屏幕坐标Y
     * @return {boolean} 是否落入
     */
    contain(screenX: number, screenY: number): boolean;
    /**
     * 获取面的中心点
     * @remarks
     * from Leaflet
     * TODO: now return first polygon center
     * @param {CoordinateType} type - 坐标类型
     * @param {Projection} projection - 坐标投影转换
     * @return {number[]} 中心点坐标
     */
    getCenter(type?: CoordinateType, projection?: Projection): any;
}
