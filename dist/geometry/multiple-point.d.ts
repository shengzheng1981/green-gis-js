import { CoordinateType, Geometry } from "./geometry";
import { Bound } from "../util/bound";
import { Projection } from "../projection/projection";
import { Symbol } from "../symbol/symbol";
export declare class MultiplePoint extends Geometry {
    static TOLERANCE: number;
    private _symbol;
    private _lnglats;
    private _coordinates;
    private _screen;
    constructor(lnglats: number[][]);
    project(projection: Projection): void;
    draw(ctx: CanvasRenderingContext2D, projection?: Projection, extent?: Bound, symbol?: Symbol): Promise<void>;
    contain(screenX: number, screenY: number): boolean;
    getCenter(type?: CoordinateType, projection?: Projection): number[];
}
