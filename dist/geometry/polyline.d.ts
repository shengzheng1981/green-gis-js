import { Geometry } from "./geometry";
import { Bound } from "../util/bound";
import { Projection } from "../projection/projection";
import { Symbol } from "../symbol/symbol";
export declare class Polyline extends Geometry {
    static TOLERANCE: number;
    private _tolerance;
    private _lnglats;
    private _coordinates;
    private _screen;
    constructor(lnglats: number[][]);
    project(projection: Projection): void;
    draw(ctx: CanvasRenderingContext2D, projection?: Projection, extent?: Bound, symbol?: Symbol): void;
    contain(screenX: number, screenY: number): boolean;
    _distanceToSegment(p: any, p1: any, p2: any): number;
}
