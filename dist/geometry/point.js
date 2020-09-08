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
import { SimplePointSymbol } from "../symbol/symbol";
import { WebMercator } from "../projection/web-mercator";
/**
 * 点
 */
export class Point extends Geometry {
    /**
     * 创建点
     * @param {number} lng - 经度
     * @param {number} lat - 纬度
     */
    constructor(lng, lat) {
        super();
        this._lng = lng;
        this._lat = lat;
    }
    /**
     * 经纬度-经度
     */
    get lng() {
        return this._lng;
    }
    /**
     * 经纬度-纬度
     */
    get lat() {
        return this._lat;
    }
    /**
     * 平面坐标-X
     */
    get x() {
        return this._x;
    }
    /**
     * 平面坐标-Y
     */
    get y() {
        return this._y;
    }
    ;
    /**
     * 输出GeoJSON格式字符串
     */
    toGeoJSON() {
        return {
            "type": "Point",
            "coordinates": [this._lng, this._lat]
        };
    }
    /**
     * 投影变换
     * @param {Projection} projection - 坐标投影转换
     */
    project(projection) {
        this._projection = projection;
        [this._x, this._y] = this._projection.project([this._lng, this._lat]);
        //TODO: bound tolerance
        this._bound = new Bound(this._x, this._y, this._x, this._y);
        this._projected = true;
    }
    /**
     * 移动点（用于编辑）
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {Projection} projection - 坐标投影转换
     * @param {number} screenX - 屏幕坐标X
     * @param {number} screenY - 屏幕坐标Y
     */
    move(ctx, projection, screenX, screenY) {
        const matrix = ctx.getTransform();
        this._screenX = screenX;
        this._screenY = screenY;
        this._x = (this._screenX - matrix.e) / matrix.a;
        this._y = (this._screenY - matrix.f) / matrix.d;
        this._bound = new Bound(this._x, this._y, this._x, this._y);
        this._projection = projection;
        [this._lng, this._lat] = this._projection.unproject([this._x, this._y]);
        this._projected = true;
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
            this._screenX = (matrix.a * this._x + matrix.e);
            this._screenY = (matrix.d * this._y + matrix.f);
            this._symbol = symbol;
            this._symbol.draw(ctx, this._screenX, this._screenY);
        });
    }
    ;
    /*animate(elapsed, ctx: CanvasRenderingContext2D, projection: Projection = new WebMercator(), extent: Bound = projection.bound, animation: Animation) {
        if (!this._projected) this.project(projection);
        if (!extent.intersect(this._bound)) return;
        const matrix = (ctx as any).getTransform();
        this._screenX = (matrix.a * this._x + matrix.e);
        this._screenY = (matrix.d * this._y + matrix.f);
        animation.animate(elapsed, ctx, this._screenX, this._screenY);
    };*/
    /**
     * 是否包含传入坐标
     * @remarks
     * 由于点是0维，主要根据渲染的符号大小来判断传入坐标是否落到点内
     * @param {number} screenX - 鼠标屏幕坐标X
     * @param {number} screenX - 鼠标屏幕坐标Y
     * @return {boolean} 是否落入
     */
    contain(screenX, screenY) {
        return this._symbol ? this._symbol.contain(this._screenX, this._screenY, screenX, screenY) : false;
    }
    /**
     * 获取中心点
     * @param {CoordinateType} type - 坐标类型
     * @param {Projection} projection - 坐标投影转换
     * @return {number[]} 中心点坐标
     */
    getCenter(type = CoordinateType.Latlng, projection = new WebMercator()) {
        if (!this._projected)
            this.project(projection);
        if (type === CoordinateType.Latlng) {
            return [this._lng, this._lat];
        }
        else {
            return [this._x, this._y];
        }
    }
}
