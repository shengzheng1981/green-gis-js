import { Bound } from "../util/bound";
/**
 * 坐标投影转换
 * @remarks
 * TODO: only support web mecator
 */
export declare class NoopProjection {
    /**
     * 经纬度转平面坐标
     * @remarks 地理平面坐标 单位米
     * @param {number} lng - 经度
     * @param {number} lat - 纬度
     * @return {number[]} 地理平面坐标
     */
    project([lng, lat]: [any, any]): number[];
    /**
     * 平面坐标转经纬度
     * @remarks 地理平面坐标 单位米
     * @param {number} x - 地理平面坐标x
     * @param {number} y - 地理平面坐标y
     * @return {number[]} 经纬度
     */
    unproject([x, y]: [any, any], original?: boolean): number[];
    /**
     * 投影后的平面坐标范围
     */
    protected _bound: Bound;
    get bound(): Bound;
    set bound(value: Bound);
}
