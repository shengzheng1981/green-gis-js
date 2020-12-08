import { CoordinateType, Geometry } from "./geometry";
import { Bound } from "../util/bound";
import { SimpleFillSymbol } from "../symbol/symbol";
import { WebMercator } from "../projection/web-mercator";
/**
 * 面
 * @remarks
 * 数据结构：[ring[point[x,y]]]：such as [[[1,1],[2,2],[1,2]], [[1.5,1.5],[1.9,1.9],[1.5,1.9]]]
 */
export class Polygon extends Geometry {
    /**
     * 创建面
     * @param {number[][][]} lnglats - 坐标集合，三维数组
     */
    constructor(lnglats) {
        super();
        this._lnglats = lnglats;
    }
    /**
     * 经纬度
     */
    get lnglats() {
        return this._lnglats;
    }
    /**
     * 平面坐标
     */
    get coordinates() {
        return this._coordinates;
    }
    ;
    /**
     * 输出GeoJSON格式字符串
     */
    toGeoJSON() {
        return {
            "type": "Polygon",
            "coordinates": this._lnglats
        };
    }
    /**
     * 投影变换
     * @param {Projection} projection - 坐标投影转换
     */
    project(projection) {
        this._projection = projection;
        this._coordinates = this._lnglats.map((ring) => ring.map((point) => this._projection.project(point)));
        let xmin = Number.MAX_VALUE, ymin = Number.MAX_VALUE, xmax = -Number.MAX_VALUE, ymax = -Number.MAX_VALUE;
        this._coordinates.forEach(ring => {
            ring.forEach(point => {
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
     * 编辑面
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {Projection} projection - 坐标投影转换
     * @param {number[]} lnglat - 边线上点坐标（被替换或删除的拐点）
     * @param {number} screenX - 替换的屏幕坐标X（拖动后）
     * @param {number} screenY - 替换的屏幕坐标Y（拖动后）
     * @param {boolean} replaced - true 替换 false 删除
     */
    splice(ctx, projection, lnglat, screenX = undefined, screenY = undefined, replaced = true) {
        if (screenX == undefined && screenY == undefined) {
            this._lnglats.forEach(ring => {
                const index = ring.findIndex(point => point[0] == lnglat[0] && point[1] == lnglat[1]);
                ring.length > 3 && index != -1 && ring.splice(index, 1);
            });
        }
        else {
            const matrix = ctx.getTransform();
            const x = (screenX - matrix.e) / matrix.a;
            const y = (screenY - matrix.f) / matrix.d;
            this._projection = projection;
            const [lng, lat] = this._projection.unproject([x, y]);
            this._lnglats.forEach(ring => {
                const index = ring.findIndex(point => point[0] == lnglat[0] && point[1] == lnglat[1]);
                index != -1 && ring.splice(index, replaced ? 1 : 0, [lng, lat]);
            });
        }
        this.project(projection);
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
        this._screen = this._coordinates.map(ring => {
            const points = ring.map((point, index) => {
                const screenX = (matrix.a * point[0] + matrix.e), screenY = (matrix.d * point[1] + matrix.f);
                return [screenX, screenY];
            });
            return this.simplify(points);
        });
        //减少一次循环的优化，效果并不显著，不如增加可读性，见上！
        /*this._screen = this._coordinates.map( ring => {
            const points = [];
            const reducedPoints = [];
            let prev = 0;
            for (let i = 0; i < ring.length; i++) {
                const screenX = (matrix.a * ring[i][0] + matrix.e), screenY = (matrix.d * ring[i][1] + matrix.f);
                points.push([screenX, screenY]);
                if (i == 0) {
                    reducedPoints.push([screenX, screenY]);
                }
                if ((points[i][0]-points[prev][0]) * (points[i][0]-points[prev][0]) + (points[i][1]-points[prev][1]) * (points[i][1]-points[prev][1])> 1.0) {
                    reducedPoints.push([screenX, screenY]);
                    prev = i;
                }
            }
            if (prev < points.length - 1) {
                reducedPoints.push(points[points.length - 1]);
            }
            return reducedPoints;
        });*/
        symbol.draw(ctx, this._screen);
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
        const first = this._screen[0];
        const others = this._screen.slice(1);
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
        return _pointInPolygon([screenX, screenY], first) && others.every(ring => !_pointInPolygon([screenX, screenY], ring));
        //return this._screen.some(ring => this._pointInPolygon([screenX, screenY], ring));
    }
    /**
     * 获取面的中心点
     * @remarks
     * from Leaflet
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
        if (type === CoordinateType.Latlng) {
            return projection.unproject(center);
        }
        else {
            return center;
        }
    }
    /**
     * 获取面的周长
     * @remarks
     * from Leaflet
     * @param {Projection} projection - 坐标投影转换
     * @return {number} 周长
     */
    getLength(projection = new WebMercator()) {
        if (!this._projected)
            this.project(projection);
        let sum = 0;
        this._coordinates.forEach((ring, index) => {
            if (index == 0) {
                ring.forEach((point, index) => {
                    if (index > 0) {
                        sum += Math.sqrt(Math.pow(point[0] - ring[index - 1][0], 2) + Math.pow(point[1] - ring[index - 1][1], 2));
                    }
                });
            }
        });
        return sum;
    }
    /**
     * 获取面的面积
     * @remarks
     * from Leaflet
     * @param {Projection} projection - 坐标投影转换
     * @return {number} 面积
     */
    getArea(projection = new WebMercator()) {
        if (!this._projected)
            this.project(projection);
        let sum = 0;
        this._coordinates.forEach((ring, index) => {
            if (index == 0) {
                ring.forEach((point, index) => {
                    if (index > 0) {
                        //梯形面积
                        sum += 1 / 2 * (point[0] - ring[index - 1][0]) * (point[1] + ring[index - 1][1]);
                    }
                });
                sum += 1 / 2 * (ring[0][0] - ring[ring.length - 1][0]) * (ring[ring.length - 1][1] + ring[0][1]);
            }
        });
        //顺时针为正，逆时针为负
        return Math.abs(sum);
    }
}
