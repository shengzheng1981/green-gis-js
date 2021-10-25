import { Feature } from "../element/feature";
import { Projection } from "../projection/projection";
import { Bound } from "../util/bound";
export declare class GridCluster {
    size: number;
    distance: number;
    generate(features: Feature[], ctx: CanvasRenderingContext2D, projection?: Projection, extent?: Bound): any;
}
