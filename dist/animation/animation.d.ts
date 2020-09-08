import { Point } from "../geometry/Point";
import { Projection } from "../projection/projection";
import { Polyline } from "../geometry/Polyline";
export declare class Animation {
    init(ctx: CanvasRenderingContext2D, projection?: Projection): void;
    animate(elapsed: any, ctx: CanvasRenderingContext2D): void;
}
export declare class PointAnimation extends Animation {
    protected _point: Point;
    protected _screenX: number;
    protected _screenY: number;
    lineWidth: number;
    color: string;
    velocity: number;
    limit: number;
    ring: number;
    constructor(geometry: Point);
    init(ctx: CanvasRenderingContext2D, projection?: Projection): void;
    animate(elapsed: any, ctx: CanvasRenderingContext2D): void;
}
export declare class LineAnimation extends Animation {
    protected _polyline: Polyline;
    protected _screen: number[][];
    private _start;
    private _end;
    private _control;
    private _percent;
    lineWidth: number;
    startColor: string;
    endColor: string;
    angle: number;
    constructor(geometry: Polyline);
    init(ctx: CanvasRenderingContext2D, projection?: Projection): void;
    animate(elapsed: any, ctx: CanvasRenderingContext2D): void;
    _drawCurvePath(ctx: any, start: any, point: any, end: any, percent: any): void;
    _quadraticBezier(p0: any, p1: any, p2: any, t: any): number;
}
