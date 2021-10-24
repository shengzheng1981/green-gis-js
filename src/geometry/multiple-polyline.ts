import {CoordinateType, Geometry} from "./geometry";
import {Bound} from "../util/bound";
import {Projection} from "../projection/projection";
import {LineSymbol, SimpleLineSymbol, Symbol} from "../symbol/symbol";
import {WebMercator} from "../projection/web-mercator";
import {Polyline} from "./polyline";
/**
 * 多段线
 * @remarks
 * 数据结构：such as [[[1,1],[2,2]],[[3,3],[4,4]]]
 * [polyline[point[xy]]]
 */
export class MultiplePolyline extends Geometry{

    static TOLERANCE: number = 4; //screen pixel
    private _tolerance: number = 4; //TOLERANCE + symbol.lineWidth

    //经纬度
    private _lnglats: number[][][];
    //平面坐标
    private _coordinates: number[][][];
    //屏幕坐标
    private _screen: number[][][];
    /**
     * 创建多段线
     * @param {number[][][} lnglats - 坐标集合，三维数组
     */
    constructor(lnglats: number[][][]) {
        super();
        this._lnglats = lnglats;
    };
    /**
     * 输出GeoJSON格式字符串
     */
    toGeoJSON() {
        return {
            "type": "MultiPolyline",
            "coordinates": this._lnglats
        }
    }
    /**
     * 投影变换
     * @param {Projection} projection - 坐标投影转换
     */
    project(projection: Projection) {
        this._projection = projection;
        this._coordinates = this._lnglats.map((polyline: any) => polyline.map((point: any) => this._projection.project(point)));

        let xmin = Number.MAX_VALUE, ymin = Number.MAX_VALUE, xmax = -Number.MAX_VALUE, ymax = -Number.MAX_VALUE;
        this._coordinates.forEach( polyline => {
            polyline.forEach(point => {
                xmin = Math.min(xmin, point[0]);
                ymin = Math.min(ymin, point[1]);
                xmax = Math.max(xmax, point[0]);
                ymax = Math.max(ymax, point[1]);
            });
        });
        this._bound = new Bound(xmin, ymin, xmax, ymax);
        this._projected = true;
    }
    /**
     * 绘制线
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {Projection} projection - 坐标投影转换
     * @param {Bound} extent - 当前可视范围
     * @param {Symbol} symbol - 渲染符号
     */
    draw(ctx: CanvasRenderingContext2D, projection: Projection = new WebMercator(), extent: Bound = projection.bound, symbol: LineSymbol = new SimpleLineSymbol()) {
        if (!this._projected) this.project(projection);
        //if (!extent.intersect(this._bound)) return;
        this._tolerance = Polyline.TOLERANCE + symbol.lineWidth;
        const matrix = (ctx as any).getTransform();
        this._screen = this._coordinates.map( polyline => {
            const points = polyline.map( (point: any,index) => {
                const screenX = (matrix.a * point[0] + matrix.e), screenY = (matrix.d * point[1] + matrix.f);
                return [screenX, screenY];
            });
            return this.simplify(points);
        });
        this._screen.forEach( polyline => {
            symbol.draw(ctx, polyline);
        });
    }
    /**
     * 是否包含传入坐标
     * @remarks
     * 线是1维，所以要设置一个tolerance容差，来判断坐标是否落到线上
     * @param {number} screenX - 鼠标屏幕坐标X
     * @param {number} screenX - 鼠标屏幕坐标Y
     * @return {boolean} 是否落入
     */
    contain(screenX: number, screenY: number): boolean {
        let p2;
        const _distanceToSegment = (p, p1, p2) => {
            let x = p1[0],
                y = p1[1],
                dx = p2[0] - x,
                dy = p2[1] - y,
                dot = dx * dx + dy * dy,
                t;

            if (dot > 0) {
                t = ((p[0] - x) * dx + (p[1] - y) * dy) / dot;

                if (t > 1) {
                    x = p2[0];
                    y = p2[1];
                } else if (t > 0) {
                    x += dx * t;
                    y += dy * t;
                }
            }

            dx = p[0] - x;
            dy = p[1] - y;

            return Math.sqrt(dx * dx + dy * dy);
        };
        return this._screen.some(polyline => {
            const distance = polyline.reduce( (acc, cur) => {
                if (p2) {
                    const p1 = p2;
                    p2 = cur;
                    return Math.min(acc, _distanceToSegment([screenX, screenY], p1, p2));
                } else {
                    p2 = cur;
                    return acc;
                }
            }, Number.MAX_VALUE);
            return distance <= this._tolerance;
        });
    }

    /**
     * 获取线的中心点
     * @remarks
     * from Leaflet
     * TODO: now return first polyline center
     * @param {CoordinateType} type - 坐标类型
     * @param {Projection} projection - 坐标投影转换
     * @return {number[]} 中心点坐标
     */
    getCenter(type: CoordinateType = CoordinateType.Latlng, projection: Projection = new WebMercator()) {
        if (!this._projected) this.project(projection);
        let i, halfDist, segDist, dist, p1, p2, ratio,
            points = this._coordinates[0],
            len = points.length;

        if (!len) { return null; }

        // polyline centroid algorithm; only uses the first ring if there are multiple

        for (i = 0, halfDist = 0; i < len - 1; i++) {
            halfDist += Math.sqrt((points[i + 1][0] - points[i][0]) * (points[i + 1][0] - points[i][0]) + (points[i + 1][1] - points[i][1]) * (points[i + 1][1] - points[i][1])) / 2;
        }

        let center;
        // The line is so small in the current view that all points are on the same pixel.
        if (halfDist === 0) {
            center = points[0];
        }

        for (i = 0, dist = 0; i < len - 1; i++) {
            p1 = points[i];
            p2 = points[i + 1];
            segDist = Math.sqrt((p2[0] - p1[0]) * (p2[0] - p1[0]) + (p2[1] - p1[1]) * (p2[1] - p1[1]));
            dist += segDist;

            if (dist > halfDist) {
                ratio = (dist - halfDist) / segDist;
                center = [
                    p2[0] - ratio * (p2[0] - p1[0]),
                    p2[1] - ratio * (p2[1] - p1[1])
                ];
            }
        }

        if (type === CoordinateType.Latlng) {
            return projection.unproject(center);
        } else {
            return center;
        }
    }
}