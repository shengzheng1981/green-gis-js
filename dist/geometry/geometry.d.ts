import { Bound } from "../util/bound";
import { Symbol } from "../symbol/symbol";
import { Projection } from "../projection/projection";
export declare enum GeometryType {
    Point = 0,
    Polyline = 1,
    Polygon = 2
}
export declare class Geometry {
    protected _projected: boolean;
    protected _projection: Projection;
    protected _bound: Bound;
    get bound(): Bound;
    project(projection: Projection): void;
    draw(ctx: CanvasRenderingContext2D, projection?: Projection, extent?: Bound, symbol?: Symbol): void;
    contain(screenX: number, screenY: number): boolean;
    intersect(projection?: Projection, extent?: Bound): boolean;
}
