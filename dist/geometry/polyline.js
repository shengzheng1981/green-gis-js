import { CoordinateType, Geometry } from "./geometry";
import { Bound } from "../util/bound";
import { SimpleLineSymbol } from "../symbol/symbol";
import { WebMercator } from "../projection/web-mercator";
//线
export class Polyline extends Geometry {
    constructor(lnglats) {
        super();
        this._tolerance = 4; //TOLERANCE + symbol.lineWidth
        this._lnglats = lnglats;
    }
    get lnglats() {
        return this._lnglats;
    }
    get coordinates() {
        return this._coordinates;
    }
    ;
    toGeoJSON() {
        return {
            "type": "LineString",
            "coordinates": this._lnglats
        };
    }
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
    splice(ctx, projection, lnglat, screenX = undefined, screenY = undefined, replaced = true) {
        if (screenX == undefined && screenY == undefined) {
            const index = this._lnglats.findIndex(point => point[0] == lnglat[0] && point[1] == lnglat[1]);
            this._lnglats.length > 2 && index != -1 && this._lnglats.splice(index, 1);
        }
        else {
            const matrix = ctx.getTransform();
            const x = (screenX - matrix.e) / matrix.a;
            const y = (screenY - matrix.f) / matrix.d;
            this._projection = projection;
            const [lng, lat] = this._projection.unproject([x, y]);
            const index = this._lnglats.findIndex(point => point[0] == lnglat[0] && point[1] == lnglat[1]);
            index != -1 && this._lnglats.splice(index, replaced ? 1 : 0, [lng, lat]);
        }
        this.project(projection);
    }
    draw(ctx, projection = new WebMercator(), extent = projection.bound, symbol = new SimpleLineSymbol()) {
        if (!this._projected)
            this.project(projection);
        if (!extent.intersect(this._bound))
            return;
        this._tolerance = Polyline.TOLERANCE + symbol.lineWidth;
        const matrix = ctx.getTransform();
        this._screen = this._coordinates.map((point, index) => {
            const screenX = (matrix.a * point[0] + matrix.e), screenY = (matrix.d * point[1] + matrix.f);
            return [screenX, screenY];
        });
        symbol.draw(ctx, this._screen);
    }
    /*//已知 起点和终点  求沿线距起点定长的点
    _getPointAlongLine(p1, p2, d) {
        //line length
        let l = Math.sqrt((p2[0] - p1[0]) * (p2[0] - p1[0]) + (p2[1] - p1[1]) * (p2[1] - p1[1]));
        let t = d / l;
        return [(1 - t) * p1[0] + t * p2[0], (1 - t) * p1[1] + t * p2[1]];
    }

    //已知 起点 y = kx + b   求沿线距起点定长的点 两个点
    _getPointAlongLine2(k, b, p, d) {
        let x0 = p[0] + Math.sqrt( (d * d) / (k * k + 1)), x1 = p[0] - Math.sqrt( (d * d) / (k * k + 1));
        return [[x0, k * x0 + b], [x1, k * x1 + b]];
    }*/
    contain(screenX, screenY) {
        let p2;
        const distance = this._screen.reduce((acc, cur) => {
            if (p2) {
                const p1 = p2;
                p2 = cur;
                return Math.min(acc, this._distanceToSegment([screenX, screenY], p1, p2));
            }
            else {
                p2 = cur;
                return acc;
            }
        }, Number.MAX_VALUE);
        return distance <= this._tolerance;
    }
    //from Leaflet
    _distanceToSegment(p, p1, p2) {
        let x = p1[0], y = p1[1], dx = p2[0] - x, dy = p2[1] - y, dot = dx * dx + dy * dy, t;
        if (dot > 0) {
            t = ((p[0] - x) * dx + (p[1] - y) * dy) / dot;
            if (t > 1) {
                x = p2[0];
                y = p2[1];
            }
            else if (t > 0) {
                x += dx * t;
                y += dy * t;
            }
        }
        dx = p[0] - x;
        dy = p[1] - y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    //from Leaflet
    getCenter(type = CoordinateType.Latlng, projection = new WebMercator()) {
        if (!this._projected)
            this.project(projection);
        let i, halfDist, segDist, dist, p1, p2, ratio, points = this._coordinates, len = points.length;
        if (!len) {
            return null;
        }
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
        }
        else {
            return center;
        }
    }
}
//[point[xy]]
//such as [[1,1],[2,2]]
//interaction: hover && identify
Polyline.TOLERANCE = 4; //screen pixel
