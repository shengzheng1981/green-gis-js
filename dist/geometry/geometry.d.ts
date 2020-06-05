import { Bound } from "../util/bound";
import { SimpleTextSymbol, Symbol } from "../symbol/symbol";
import { Projection } from "../projection/projection";
export declare enum CoordinateType {
    Latlng = 0,
    Projection = 1,
    Screen = 2
}
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
    toGeoJSON(): void;
    project(projection: Projection): void;
    draw(ctx: CanvasRenderingContext2D, projection?: Projection, extent?: Bound, symbol?: Symbol): void;
    contain(screenX: number, screenY: number): boolean;
    intersect(projection?: Projection, extent?: Bound): boolean;
    label(text: string, ctx: CanvasRenderingContext2D, projection?: Projection, extent?: Bound, symbol?: SimpleTextSymbol): void;
    getCenter(type?: CoordinateType, projection?: Projection): void;
    distance(geometry: Geometry, type: CoordinateType, ctx: CanvasRenderingContext2D, projection?: Projection): number;
}
