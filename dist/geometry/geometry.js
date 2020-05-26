import { SimplePointSymbol, SimpleTextSymbol } from "../symbol/symbol";
import { WebMercator } from "../projection/web-mercator";
export var CoordinateType;
(function (CoordinateType) {
    CoordinateType[CoordinateType["Latlng"] = 0] = "Latlng";
    CoordinateType[CoordinateType["Projection"] = 1] = "Projection";
    CoordinateType[CoordinateType["Screen"] = 2] = "Screen";
})(CoordinateType || (CoordinateType = {}));
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
    draw(ctx, projection = new WebMercator(), extent = projection.bound, symbol = new SimplePointSymbol()) { }
    ;
    contain(screenX, screenY) { return false; }
    intersect(projection = new WebMercator(), extent = projection.bound) {
        if (!this._projected)
            this.project(projection);
        return extent.intersect(this._bound);
    }
    label(text, ctx, projection = new WebMercator(), extent = projection.bound, symbol = new SimpleTextSymbol()) {
        if (!this._projected)
            this.project(projection);
        if (!extent.intersect(this._bound))
            return;
        ctx.save();
        ctx.strokeStyle = symbol.strokeStyle;
        ctx.fillStyle = symbol.fillStyle;
        ctx.lineWidth = symbol.lineWidth;
        ctx.lineJoin = "round";
        ctx.font = symbol.fontSize + "px/1 " + symbol.fontFamily + " " + symbol.fontWeight;
        const center = this.getCenter(CoordinateType.Projection, projection);
        const matrix = ctx.getTransform();
        //keep pixel
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        const width = ctx.measureText(text).width + symbol.padding * 2;
        const height = symbol.fontSize + symbol.padding * 2;
        const screenX = (matrix.a * center[0] + matrix.e);
        const screenY = (matrix.d * center[1] + matrix.f);
        ctx.strokeRect(screenX + symbol.offsetX - symbol.padding, screenY + symbol.offsetY - symbol.padding, width, height);
        ctx.fillRect(screenX + symbol.offsetX - symbol.padding, screenY + symbol.offsetY - symbol.padding, width, height);
        ctx.textBaseline = "top";
        ctx.fillStyle = symbol.fontColor;
        ctx.fillText(text, screenX + symbol.offsetX, screenY + symbol.offsetY);
        ctx.restore();
    }
    ;
    getCenter(type = CoordinateType.Latlng, projection = new WebMercator()) { }
    ;
}
