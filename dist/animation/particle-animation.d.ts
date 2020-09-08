import { PointAnimation } from "./animation";
import { Projection } from "../projection/projection";
export declare class ParticleAnimation extends PointAnimation {
    private _orbit;
    radius: number;
    speed: number;
    color: string;
    count: number;
    alpha: number;
    composite: string;
    init(ctx: CanvasRenderingContext2D, projection?: Projection): void;
    animate(elapsed: any, ctx: CanvasRenderingContext2D): void;
}
