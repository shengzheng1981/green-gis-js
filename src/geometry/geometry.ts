import {Bound} from "../util/bound";
import {SimplePointSymbol, SimpleTextSymbol, Symbol} from "../symbol/symbol";
import {Projection} from "../projection/projection";
import {WebMercator} from "../projection/web-mercator";

export enum CoordinateType {
    Latlng = 0,
    Projection = 1,
    Screen = 2
}


export enum GeometryType {
    Point = 0,
    Polyline = 1,
    Polygon = 2
}


export class Geometry {

    protected _projected: boolean;
    protected _projection: Projection;
    protected _bound: Bound;

    get bound(): Bound {
        return this._bound;
    }

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
        const width = ctx.measureText(text).width + (symbol as SimpleTextSymbol).padding * 2;
        const height = (symbol as SimpleTextSymbol).fontSize + (symbol as SimpleTextSymbol).padding * 2;
        const screenX = (matrix.a * center[0] + matrix.e);
        const screenY = (matrix.d * center[1] + matrix.f);
        ctx.strokeRect(screenX + (symbol as SimpleTextSymbol).offsetX - (symbol as SimpleTextSymbol).padding, screenY + (symbol as SimpleTextSymbol).offsetY - (symbol as SimpleTextSymbol).padding, width, height);
        ctx.fillRect(screenX + (symbol as SimpleTextSymbol).offsetX - (symbol as SimpleTextSymbol).padding, screenY + (symbol as SimpleTextSymbol).offsetY - (symbol as SimpleTextSymbol).padding, width, height);
        ctx.textBaseline = "top";
        ctx.fillStyle = (symbol as SimpleTextSymbol).fontColor;
        ctx.fillText(text, screenX + (symbol as SimpleTextSymbol).offsetX, screenY + (symbol as SimpleTextSymbol).offsetY);
        ctx.restore();
    };

    getCenter(type: CoordinateType = CoordinateType.Latlng, projection: Projection = new WebMercator()) {};

}