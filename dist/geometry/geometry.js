import { SimplePointSymbol } from "../symbol/symbol";
import { WebMecator } from "../projection/web-mecator";
export var GeometryType;
(function (GeometryType) {
    GeometryType[GeometryType["Point"] = 0] = "Point";
    GeometryType[GeometryType["Polyline"] = 1] = "Polyline";
    GeometryType[GeometryType["Polygon"] = 2] = "Polygon";
})(GeometryType || (GeometryType = {}));
export class Geometry {
    get bound() {
        return this._bound;
    }
    project(projection) { }
    ;
    draw(ctx, projection = new WebMecator(), extent = projection.bound, symbol = new SimplePointSymbol()) { }
    ;
    contain(screenX, screenY) { return false; }
    intersect(projection = new WebMecator(), extent = projection.bound) {
        if (!this._projected)
            this.project(projection);
        return extent.intersect(this._bound);
    }
}
