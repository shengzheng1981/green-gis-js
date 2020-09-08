import {CoordinateType, Geometry} from "./geometry";
import {Bound} from "../util/bound";
import {Projection} from "../projection/projection";
import {
    PointSymbol,
    ClusterSymbol, LetterSymbol,
    SimpleMarkerSymbol,
    SimplePointSymbol,
    SimpleTextSymbol,
    Symbol,
    VertexSymbol
} from "../symbol/symbol";
import {WebMercator} from "../projection/web-mercator";
import {Animation} from "../animation/animation";

/**
 * 点
 */
export class Point extends Geometry{

    /**
     * 经纬度-经度
     */
    private _lng: number;
    /**
     * 经纬度-纬度
     */
    private _lat: number;
    /**
     * 平面坐标-X
     */
    private _x: number;
    /**
     * 平面坐标-Y
     */
    private _y: number;
    /**
     * 屏幕坐标-X
     */
    private _screenX: number;
    /**
     * 屏幕坐标-Y
     */
    private _screenY: number;
    /**
     * 记录用于判断鼠标是否进入交互范围
     */
    private _symbol: PointSymbol;
    /**
     * 经纬度-经度
     */
    get lng(): number {
        return this._lng;
    }
    /**
     * 经纬度-纬度
     */
    get lat(): number {
        return this._lat;
    }
    /**
     * 平面坐标-X
     */
    get x(): number {
        return this._x;
    }
    /**
     * 平面坐标-Y
     */
    get y(): number {
        return this._y;
    }

    /**
     * 创建点
     * @param {number} lng - 经度
     * @param {number} lat - 纬度
     */
    constructor(lng: number, lat: number) {
        super();
        this._lng = lng;
        this._lat = lat;
    };

    /**
     * 输出GeoJSON格式字符串
     */
    toGeoJSON() {
        return {
            "type": "Point",
            "coordinates": [this._lng, this._lat]
        }
    }

    /**
     * 投影变换
     * @param {Projection} projection - 坐标投影转换
     */
    project(projection: Projection) {
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
    move(ctx: CanvasRenderingContext2D, projection: Projection, screenX: number, screenY: number) {
        const matrix = (ctx as any).getTransform();
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
    async draw(ctx: CanvasRenderingContext2D, projection: Projection = new WebMercator(), extent: Bound = projection.bound, symbol: PointSymbol = new SimplePointSymbol()) {
        if (!this._projected) this.project(projection);
        if (!extent.intersect(this._bound)) return;
        const matrix = (ctx as any).getTransform();
        this._screenX = (matrix.a * this._x + matrix.e);
        this._screenY = (matrix.d * this._y + matrix.f);
        this._symbol = symbol;
        this._symbol.draw(ctx, this._screenX, this._screenY);
    };

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
    contain(screenX: number, screenY: number): boolean {
        return this._symbol ? this._symbol.contain(this._screenX, this._screenY, screenX, screenY) : false;
    }
    /**
     * 获取中心点
     * @param {CoordinateType} type - 坐标类型
     * @param {Projection} projection - 坐标投影转换
     * @return {number[]} 中心点坐标
     */
    getCenter(type: CoordinateType = CoordinateType.Latlng, projection: Projection = new WebMercator()) {
        if (!this._projected) this.project(projection);
        if (type === CoordinateType.Latlng) {
            return [this._lng, this._lat];
        } else {
            return [this._x, this._y];
        }
    }
}