import {Bound} from "../util/bound";

/**
 * 坐标投影转换
 * @remarks
 * TODO: only support web mecator
 */
export class NoopProjection {
    /**
     * 经纬度转平面坐标
     * @remarks 地理平面坐标 单位米
     * @param {number} lng - 经度
     * @param {number} lat - 纬度
     * @return {number[]} 地理平面坐标
     */
    project([lng, lat]): number[] { return [lng, lat] };
    /**
     * 平面坐标转经纬度
     * @remarks 地理平面坐标 单位米
     * @param {number} x - 地理平面坐标x
     * @param {number} y - 地理平面坐标y
     * @return {number[]} 经纬度
     */
    unproject([x, y], original = false): number[] { return [x, y]};
    /**
     * 投影后的平面坐标范围
     */
    get bound(): Bound { return new Bound( 0, 0, 256 * Math.pow(2, 3), 256 * Math.pow(2, 3) ); };
}
