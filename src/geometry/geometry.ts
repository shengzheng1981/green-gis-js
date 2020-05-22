import {Bound} from "../util/bound";
import {SimplePointSymbol, Symbol} from "../symbol/symbol";
import {Projection} from "../projection/projection";
import {WebMecator} from "../projection/web-mecator";

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

    draw(ctx: CanvasRenderingContext2D, projection: Projection = new WebMecator(), extent: Bound = projection.bound, symbol: Symbol = new SimplePointSymbol()) {};

    contain(screenX: number, screenY: number): boolean { return false; }

    intersect(projection: Projection = new WebMecator(), extent: Bound = projection.bound): boolean {
        if (!this._projected) this.project(projection);
        return extent.intersect(this._bound);
    }

}