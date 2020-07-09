import {Bound} from "../util/bound";
import {SimplePointSymbol, SimpleTextSymbol, Symbol} from "../symbol/symbol";
import {Projection} from "../projection/projection";
import {WebMercator} from "../projection/web-mercator";
import {Point} from "./point";

export enum CoordinateType {
    Latlng = 1,
    Projection = 2,
    Screen = 3
}


export enum GeometryType {
    Point = 1,
    Polyline = 2,
    Polygon = 3
}


export class Geometry {

    protected _projected: boolean;
    protected _projection: Projection;
    protected _bound: Bound;

    get bound(): Bound {
        return this._bound;
    }

    toGeoJSON() {}

    project(projection: Projection) {};

    draw(ctx: CanvasRenderingContext2D, projection: Projection = new WebMercator(), extent: Bound = projection.bound, symbol: Symbol = new SimplePointSymbol()) {};

    contain(screenX: number, screenY: number): boolean { return false; }

    intersect(projection: Projection = new WebMercator(), extent: Bound = projection.bound): boolean {
        if (!this._projected) this.project(projection);
        return extent.intersect(this._bound);
    }

    label(text: string, ctx: CanvasRenderingContext2D, projection: Projection = new WebMercator(), extent: Bound = projection.bound, symbol: SimpleTextSymbol = new SimpleTextSymbol()) {
        if (!this._projected) this.project(projection);
        if (!extent.intersect(this._bound)) return;
        ctx.save();
        ctx.strokeStyle = (symbol as SimpleTextSymbol).strokeStyle;
        ctx.fillStyle = (symbol as SimpleTextSymbol).fillStyle;
        ctx.lineWidth = (symbol as SimpleTextSymbol).lineWidth;
        ctx.lineJoin = "round";
        ctx.font =  (symbol as SimpleTextSymbol).fontSize + "px/1 " + (symbol as SimpleTextSymbol).fontFamily +  " " + (symbol as SimpleTextSymbol).fontWeight;
        const center = this.getCenter(CoordinateType.Projection, projection);
        const matrix = (ctx as any).getTransform();
        //keep pixel
        ctx.setTransform(1,0,0,1,0,0);
        const array = text.split("/r/n");
        let widths = array.map(str => ctx.measureText(str).width + symbol.padding * 2);
        let width = Math.max(...widths);
        let height = symbol.fontSize * array.length + symbol.padding * 2 + symbol.padding * (array.length - 1);
        const screenX = (matrix.a * center[0] + matrix.e);
        const screenY = (matrix.d * center[1] + matrix.f);
        ctx.strokeRect(screenX + (symbol as SimpleTextSymbol).offsetX - (symbol as SimpleTextSymbol).padding, screenY + (symbol as SimpleTextSymbol).offsetY - (symbol as SimpleTextSymbol).padding, width, height);
        ctx.fillRect(screenX + (symbol as SimpleTextSymbol).offsetX - (symbol as SimpleTextSymbol).padding, screenY + (symbol as SimpleTextSymbol).offsetY - (symbol as SimpleTextSymbol).padding, width, height);
        ctx.textBaseline = "top";
        ctx.fillStyle = (symbol as SimpleTextSymbol).fontColor;
        array.forEach((str,index) => {
            ctx.fillText(str, screenX + (symbol as SimpleTextSymbol).offsetX + (width - widths[index]) / 2, screenY + (symbol as SimpleTextSymbol).offsetY + index * (symbol.fontSize + symbol.padding));
        });
        ctx.restore();
    };

    getCenter(type: CoordinateType = CoordinateType.Latlng, projection: Projection = new WebMercator()) {};

    getBound(projection: Projection = new WebMercator()) {
        if (!this._projected) this.project(projection);
        return this._bound;
    };

    distance(geometry: Geometry, type: CoordinateType, ctx: CanvasRenderingContext2D, projection: Projection = new WebMercator()) {
        const center = this.getCenter(type == CoordinateType.Screen ? CoordinateType.Projection : type, projection);
        const point = geometry.getCenter(type == CoordinateType.Screen ? CoordinateType.Projection : type, projection);
        if (type == CoordinateType.Screen) {
            const matrix = (ctx as any).getTransform();
            const screenX1 = (matrix.a * center[0] + matrix.e), screenY1 = (matrix.d * center[1] + matrix.f);
            const screenX2 = (matrix.a * point[0] + matrix.e), screenY2 = (matrix.d * point[1] + matrix.f);
            return Math.sqrt((screenX2-screenX1) * (screenX2-screenX1) + (screenY2-screenY1) * (screenY2-screenY1));
        } else {
            return Math.sqrt((point[0]-center[0]) * (point[0]-center[0]) + (point[1]-center[1]) * (point[1]-center[1]));

        }
    }

}