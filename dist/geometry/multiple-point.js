var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CoordinateType, Geometry } from "./geometry";
import { Bound } from "../util/bound";
import { SimpleMarkerSymbol, SimplePointSymbol } from "../symbol/symbol";
import { WebMercator } from "../projection/web-mercator";
/**
 * 多点
 * @remarks
 * 数据结构：such as [[1,1],[2,2]]
 */
export class MultiplePoint extends Geometry {
    /**
     * 创建多点
     * @param {number[][]} lnglats - 坐标集合，二维数组
     */
    constructor(lnglats) {
        super();
        this._lnglats = lnglats;
    }
    ;
    /**
     * 输出GeoJSON格式字符串
     */
    toGeoJSON() {
        return {
            "type": "MultiPoint",
            "coordinates": this._lnglats
        };
    }
    /**
     * 投影变换
     * @param {Projection} projection - 坐标投影转换
     */
    project(projection) {
        this._projection = projection;
        this._coordinates = this._lnglats.map((point) => this._projection.project(point));
        let xmin = Number.MAX_VALUE, ymin = Number.MAX_VALUE, xmax = -Number.MAX_VALUE, ymax = -Number.MAX_VALUE;
        this._coordinates.forEach(point => {
            xmin = Math.min(xmin, point[0]);
            ymin = Math.min(ymin, point[1]);
            xmax = Math.max(xmax, point[0]);
            ymax = Math.max(ymax, point[1]);
        });
        this._bound = new Bound(xmin, ymin, xmax, ymax);
    }
    /**
     * 绘制点
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {Projection} projection - 坐标投影转换
     * @param {Bound} extent - 当前可视范围
     * @param {Symbol} symbol - 渲染符号
     */
    draw(ctx, projection = new WebMercator(), extent = projection.bound, symbol = new SimplePointSymbol()) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._projected)
                this.project(projection);
            if (!extent.intersect(this._bound))
                return;
            const matrix = ctx.getTransform();
            this._screen = [];
            this._symbol = symbol;
            this._coordinates.forEach((point) => {
                const screenX = (matrix.a * point[0] + matrix.e), screenY = (matrix.d * point[1] + matrix.f);
                this._screen.push([screenX, screenY]);
                this._symbol.draw(ctx, screenX, screenY);
            });
        });
    }
    ;
    /**
     * 是否包含传入坐标
     * @remarks
     * 由于点是0维，主要根据渲染的符号大小来判断传入坐标是否落到点内
     * @param {number} screenX - 鼠标屏幕坐标X
     * @param {number} screenX - 鼠标屏幕坐标Y
     * @return {boolean} 是否落入
     */
    contain(screenX, screenY) {
        return this._screen.some((point) => {
            if (this._symbol instanceof SimplePointSymbol) {
                return Math.sqrt((point[0] - screenX) * (point[0] - screenX) + (point[1] - screenY) * (point[1] - screenY)) <= this._symbol.radius;
            }
            else if (this._symbol instanceof SimpleMarkerSymbol) {
                return screenX >= (point[0] - this._symbol.offsetX) && screenX <= (point[0] - this._symbol.offsetX + this._symbol.width) && screenY >= (point[1] - this._symbol.offsetY) && screenY <= (point[1] - this._symbol.offsetY + this._symbol.height);
            }
        });
    }
    /**
     * 获取中心点
     * TODO: now return first point center
     * @param {CoordinateType} type - 坐标类型
     * @param {Projection} projection - 坐标投影转换
     * @return {number[]} 中心点坐标
     */
    getCenter(type = CoordinateType.Latlng, projection = new WebMercator()) {
        if (!this._projected)
            this.project(projection);
        if (type = CoordinateType.Latlng) {
            return [this._lnglats[0][0], this._lnglats[0][1]];
        }
        else {
            return [this._coordinates[0][0], this._coordinates[0][1]];
        }
    }
}
