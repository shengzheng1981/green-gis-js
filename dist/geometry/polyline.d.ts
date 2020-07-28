import { CoordinateType, Geometry } from "./geometry";
import { Bound } from "../util/bound";
import { Projection } from "../projection/projection";
import { LineSymbol } from "../symbol/symbol";
export declare class Polyline extends Geometry {
    static TOLERANCE: number;
    private _tolerance;
    private _lnglats;
    private _coordinates;
    private _screen;
    get lnglats(): number[][];
    constructor(lnglats: number[][]);
    toGeoJSON(): {
        type: string;
        coordinates: number[][];
    };
    project(projection: Projection): void;
    splice(ctx: CanvasRenderingContext2D, projection: Projection, lnglat: number[], screenX?: any, screenY?: any, replaced?: boolean): void;
    draw(ctx: CanvasRenderingContext2D, projection?: Projection, extent?: Bound, symbol?: LineSymbol): void;
    contain(screenX: number, screenY: number): boolean;
    _distanceToSegment(p: any, p1: any, p2: any): number;
    getCenter(type?: CoordinateType, projection?: Projection): any;
}
