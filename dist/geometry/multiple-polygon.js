import { CoordinateType, Geometry } from "./geometry";
import { Bound } from "../util/bound";
import { SimpleFillSymbol } from "../symbol/symbol";
import { WebMercator } from "../projection/web-mercator";
/**
 * 多个面
 * @remarks
 * 数据结构：[polygon[ring[point[xy]]]]：such as [[[[1,1],[2,2],[1,2]]], [[[3,3],[3,4],[4,4]]]]
 */
export class MultiplePolygon extends Geometry {
    /**
     * 创建多个面
     * @param {number[][][][]} lnglats - 坐标集合，四维数组
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
            "type": "MultiPolygon",
            "coordinates": this._lnglats
        };
    }
    /**
     * 投影变换
     * @param {Projection} projection - 坐标投影转换
     */
    project(projection) {
        this._projection = projection;
        this._coordinates = this._lnglats.map((polygon) => polygon.map((ring) => ring.map((point) => this._projection.project(point))));
        let xmin = Number.MAX_VALUE, ymin = Number.MAX_VALUE, xmax = -Number.MAX_VALUE, ymax = -Number.MAX_VALUE;
        this._coordinates.forEach(polygon => {
            polygon.forEach(ring => {
                ring.forEach(point => {
                    xmin = Math.min(xmin, point[0]);
                    ymin = Math.min(ymin, point[1]);
                    xmax = Math.max(xmax, point[0]);
                    ymax = Math.max(ymax, point[1]);
                });
            });
        });
        this._bound = new Bound(xmin, ymin, xmax, ymax);
    }
    /**
     * 绘制面
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {Projection} projection - 坐标投影转换
     * @param {Bound} extent - 当前可视范围
     * @param {Symbol} symbol - 渲染符号
     */
    draw(ctx, projection = new WebMercator(), extent = projection.bound, symbol = new SimpleFillSymbol()) {
        if (!this._projected)
            this.project(projection);
        if (!extent.intersect(this._bound))
            return;
        const matrix = ctx.getTransform();
        this._screen = this._coordinates.map(polygon => polygon.map(ring => ring.map((point, index) => {
            const screenX = (matrix.a * point[0] + matrix.e), screenY = (matrix.d * point[1] + matrix.f);
            return [screenX, screenY];
        })));
        this._screen.forEach(polygon => {
            symbol.draw(ctx, polygon);
        });
    }
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
    contain(screenX, screenY) {
        //first ring contained && others no contained
        const _pointInPolygon = (point, vs) => {
            let x = point[0], y = point[1];
            let inside = false;
            for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
                let xi = vs[i][0], yi = vs[i][1];
                let xj = vs[j][0], yj = vs[j][1];
                let intersect = ((yi > y) != (yj > y))
                    && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
                if (intersect)
                    inside = !inside;
            }
            return inside;
        };
        //TODO: only test first polygon, ring is not supported
        return this._screen.some(polygon => _pointInPolygon([screenX, screenY], polygon[0]));
    }
    /**
     * 获取面的中心点
     * @remarks
     * from Leaflet
     * TODO: now return first polygon center
     * @param {CoordinateType} type - 坐标类型
     * @param {Projection} projection - 坐标投影转换
     * @return {number[]} 中心点坐标
     */
    getCenter(type = CoordinateType.Latlng, projection = new WebMercator()) {
        if (!this._projected)
            this.project(projection);
        let i, j, p1, p2, f, area, x, y, center, points = this._coordinates[0], len = points.length;
        if (!len) {
            return null;
        }
        // polygon centroid algorithm; only uses the first ring if there are multiple
        area = x = y = 0;
        for (i = 0, j = len - 1; i < len; j = i++) {
            p1 = points[i];
            p2 = points[j];
            f = p1[1] * p2[0] - p2[1] * p1[0];
            x += (p1[0] + p2[0]) * f;
            y += (p1[1] + p2[1]) * f;
            area += f * 3;
        }
        if (area === 0) {
            // Polygon is so small that all points are on same pixel.
            center = points[0];
        }
        else {
            center = [x / area, y / area];
        }
        if (type = CoordinateType.Latlng) {
            return projection.unproject(center);
        }
        else {
            return center;
        }
    }
}
