import {CoordinateType, Geometry} from "./geometry";
import {Bound} from "../util/bound";
import {Projection} from "../projection/projection";
import {SimpleMarkerSymbol, SimplePointSymbol, Symbol, PointSymbol} from "../symbol/symbol";
import {WebMercator} from "../projection/web-mercator";

/**
 * 多点
 * @remarks
 * 数据结构：such as [[1,1],[2,2]]
 */
export class MultiplePoint extends Geometry{

    private _symbol: PointSymbol; //TOLERANCE + symbol.radius

    //经纬度
    private _lnglats: number[][];
    //平面坐标
    private _coordinates: number[][];
    //屏幕坐标
    private _screen: number[][];
    /**
     * 创建多点
     * @param {number[][]} lnglats - 坐标集合，二维数组
     */
    constructor(lnglats: number[][]) {
        super();
        this._lnglats = lnglats;
    };
    /**
     * 输出GeoJSON格式字符串
     */
    toGeoJSON() {
        return {
            "type": "MultiPoint",
            "coordinates": this._lnglats
        }
    }
    /**
     * 投影变换
     * @param {Projection} projection - 坐标投影转换
     */
    project(projection: Projection) {
        this._projection = projection;
        this._coordinates = this._lnglats.map( (point: any) => this._projection.project(point));

        let xmin = Number.MAX_VALUE, ymin = Number.MAX_VALUE, xmax = -Number.MAX_VALUE, ymax = -Number.MAX_VALUE;
        this._coordinates.forEach( point => {
            xmin = Math.min(xmin, point[0]);
            ymin = Math.min(ymin, point[1]);
            xmax = Math.max(xmax, point[0]);
            ymax = Math.max(ymax, point[1]);
        });
        this._bound = new Bound(xmin, ymin, xmax, ymax);
        this._projected = true;
    }
    /**
     * 绘制点
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {Projection} projection - 坐标投影转换
     * @param {Bound} extent - 当前可视范围
     * @param {Symbol} symbol - 渲染符号
     */
    async draw(ctx: CanvasRenderingContext2D, projection: Projection = new WebMercator(), extent: Bound = projection.bound, symbol: Symbol = new SimplePointSymbol()) {
        if (!this._projected) this.project(projection);
        if (!extent.intersect(this._bound)) return;
        const matrix = (ctx as any).getTransform();
        this._screen = [];
        this._symbol = symbol as PointSymbol;
        this._coordinates.forEach( (point: any) => {
            const screenX = (matrix.a * point[0] + matrix.e), screenY = (matrix.d * point[1] + matrix.f);
            this._screen.push([screenX, screenY]);
            this._symbol.draw(ctx, screenX, screenY);
        });
    };
    /**
     * 是否包含传入坐标
     * @remarks
     * 由于点是0维，主要根据渲染的符号大小来判断传入坐标是否落到点内
     * @param {number} screenX - 鼠标屏幕坐标X
     * @param {number} screenX - 鼠标屏幕坐标Y
     * @return {boolean} 是否落入
     */
    contain(screenX: number, screenY: number): boolean {
        return this._screen.some( (point: any) => {
            if (this._symbol instanceof SimplePointSymbol) {
                return Math.sqrt((point[0] - screenX) *  (point[0] - screenX) +  (point[1] - screenY) *  (point[1] - screenY)) <= (this._symbol as SimplePointSymbol).radius;
            } else if (this._symbol instanceof SimpleMarkerSymbol) {
                return screenX >= (point[0] - this._symbol.offsetX) &&  screenX <= (point[0] - this._symbol.offsetX + this._symbol.width) && screenY >= (point[1] - this._symbol.offsetY) &&  screenY <= (point[1] - this._symbol.offsetY + this._symbol.height);
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
    getCenter(type: CoordinateType = CoordinateType.Latlng, projection: Projection = new WebMercator()) {
        if (!this._projected) this.project(projection);
        if (type = CoordinateType.Latlng) {
            return [this._lnglats[0][0], this._lnglats[0][1]];
        } else {
            return [this._coordinates[0][0], this._coordinates[0][1]];
        }
    }

}