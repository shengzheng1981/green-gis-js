import { Bound } from "../util/bound";
import { SimplePointSymbol, SimpleTextSymbol } from "../symbol/symbol";
import { WebMercator } from "../projection/web-mercator";
//坐标类型
export var CoordinateType;
(function (CoordinateType) {
    //经纬度坐标
    CoordinateType[CoordinateType["Latlng"] = 1] = "Latlng";
    //地理平面坐标
    CoordinateType[CoordinateType["Projection"] = 2] = "Projection";
    //屏幕平面坐标
    CoordinateType[CoordinateType["Screen"] = 3] = "Screen";
})(CoordinateType || (CoordinateType = {}));
//图形类型
export var GeometryType;
(function (GeometryType) {
    //点
    GeometryType[GeometryType["Point"] = 1] = "Point";
    //线
    GeometryType[GeometryType["Polyline"] = 2] = "Polyline";
    //面
    GeometryType[GeometryType["Polygon"] = 3] = "Polygon";
})(GeometryType || (GeometryType = {}));
export class Geometry {
    get bound() {
        return this._bound;
    }
    toGeoJSON() { }
    project(projection) { }
    ;
    draw(ctx, projection = new WebMercator(), extent = projection.bound, symbol = new SimplePointSymbol()) { }
    ;
    //animate(elapsed, ctx: CanvasRenderingContext2D, projection: Projection = new WebMercator(), extent: Bound = projection.bound, animation: Animation) {};
    contain(screenX, screenY) { return false; }
    intersect(projection = new WebMercator(), extent = projection.bound) {
        if (!this._projected)
            this.project(projection);
        return extent.intersect(this._bound);
    }
    label(text, ctx, projection = new WebMercator(), symbol = new SimpleTextSymbol()) {
        if (!text)
            return;
        if (!this._projected)
            this.project(projection);
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
        const array = text.split("/r/n");
        let widths = array.map(str => ctx.measureText(str).width + symbol.padding * 2);
        let width = Math.max(...widths);
        let height = symbol.fontSize * array.length + symbol.padding * 2 + symbol.padding * (array.length - 1);
        const screenX = (matrix.a * center[0] + matrix.e);
        const screenY = (matrix.d * center[1] + matrix.f);
        let totalX, totalY;
        switch (symbol.placement) {
            case "TOP":
                totalX = -width / 2;
                totalY = -symbol.pointSymbolHeight / 2 - height;
                break;
            case "BOTTOM":
                totalX = -width / 2;
                totalY = symbol.pointSymbolHeight / 2;
                break;
            case "RIGHT":
                totalX = symbol.pointSymbolWidth / 2;
                totalY = -height / 2;
                break;
            case "LEFT":
                totalX = -symbol.pointSymbolWidth / 2 - width;
                totalY = -height / 2;
                break;
        }
        ctx.strokeRect(screenX + totalX, screenY + totalY, width, height);
        ctx.fillRect(screenX + totalX, screenY + totalY, width, height);
        ctx.textBaseline = "top";
        ctx.fillStyle = symbol.fontColor;
        array.forEach((str, index) => {
            ctx.fillText(str, screenX + totalX + symbol.padding + (width - widths[index]) / 2, screenY + totalY + symbol.padding + index * (symbol.fontSize + symbol.padding));
        });
        ctx.restore();
    }
    ;
    measure(text, ctx, projection = new WebMercator(), symbol = new SimpleTextSymbol()) {
        if (!text)
            return;
        ctx.save();
        ctx.font = symbol.fontSize + "px/1 " + symbol.fontFamily + " " + symbol.fontWeight;
        const center = this.getCenter(CoordinateType.Projection, projection);
        const matrix = ctx.getTransform();
        //keep pixel
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        const array = text.split("/r/n");
        let widths = array.map(str => ctx.measureText(str).width + symbol.padding * 2);
        let width = Math.max(...widths);
        let height = symbol.fontSize * array.length + symbol.padding * 2 + symbol.padding * (array.length - 1);
        const screenX = (matrix.a * center[0] + matrix.e);
        const screenY = (matrix.d * center[1] + matrix.f);
        ctx.restore();
        let totalX, totalY;
        switch (symbol.placement) {
            case "TOP":
                totalX = -width / 2;
                totalY = -symbol.pointSymbolHeight / 2 - height;
                break;
            case "BOTTOM":
                totalX = -width / 2;
                totalY = symbol.pointSymbolHeight / 2;
                break;
            case "RIGHT":
                totalX = symbol.pointSymbolWidth / 2;
                totalY = -height / 2;
                break;
            case "LEFT":
                totalX = -symbol.pointSymbolWidth / 2 - width;
                totalY = -height / 2;
                break;
        }
        return new Bound(screenX + totalX, screenY + totalY, screenX + totalX + width, screenY + totalY + height);
    }
    ;
    getCenter(type = CoordinateType.Latlng, projection = new WebMercator()) { }
    ;
    getBound(projection = new WebMercator()) {
        if (!this._projected)
            this.project(projection);
        return this._bound;
    }
    ;
    distance(geometry, type, ctx, projection = new WebMercator()) {
        const center = this.getCenter(type == CoordinateType.Screen ? CoordinateType.Projection : type, projection);
        const point = geometry.getCenter(type == CoordinateType.Screen ? CoordinateType.Projection : type, projection);
        if (type == CoordinateType.Screen) {
            const matrix = ctx.getTransform();
            const screenX1 = (matrix.a * center[0] + matrix.e), screenY1 = (matrix.d * center[1] + matrix.f);
            const screenX2 = (matrix.a * point[0] + matrix.e), screenY2 = (matrix.d * point[1] + matrix.f);
            return Math.sqrt((screenX2 - screenX1) * (screenX2 - screenX1) + (screenY2 - screenY1) * (screenY2 - screenY1));
        }
        else {
            return Math.sqrt((point[0] - center[0]) * (point[0] - center[0]) + (point[1] - center[1]) * (point[1] - center[1]));
        }
    }
}
