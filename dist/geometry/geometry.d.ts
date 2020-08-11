import { Bound } from "../util/bound";
import { SimpleTextSymbol, Symbol } from "../symbol/symbol";
import { Projection } from "../projection/projection";
export declare enum CoordinateType {
    Latlng = 1,
    Projection = 2,
    Screen = 3
}
export declare enum GeometryType {
    Point = 1,
    Polyline = 2,
    Polygon = 3
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
    label(text: string, ctx: CanvasRenderingContext2D, projection?: Projection, symbol?: SimpleTextSymbol): void;
    measure(text: string, ctx: CanvasRenderingContext2D, projection?: Projection, symbol?: SimpleTextSymbol): Bound;
    getCenter(type?: CoordinateType, projection?: Projection): void;
    getBound(projection?: Projection): Bound;
    distance(geometry: Geometry, type: CoordinateType, ctx: CanvasRenderingContext2D, projection?: Projection): number;
}
