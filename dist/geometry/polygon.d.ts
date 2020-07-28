import { CoordinateType, Geometry } from "./geometry";
import { Bound } from "../util/bound";
import { Projection } from "../projection/projection";
import { FillSymbol } from "../symbol/symbol";
export declare class Polygon extends Geometry {
    private _lnglats;
    private _coordinates;
    private _screen;
    get lnglats(): number[][][];
    constructor(lnglats: number[][][]);
    toGeoJSON(): {
        type: string;
        coordinates: number[][][];
    };
    project(projection: Projection): void;
    splice(ctx: CanvasRenderingContext2D, projection: Projection, lnglat: number[], screenX?: any, screenY?: any, replaced?: boolean): void;
    draw(ctx: CanvasRenderingContext2D, projection?: Projection, extent?: Bound, symbol?: FillSymbol): void;
    contain(screenX: number, screenY: number): boolean;
    _pointInPolygon(point: any, vs: any): boolean;
    getCenter(type?: CoordinateType, projection?: Projection): any;
}
