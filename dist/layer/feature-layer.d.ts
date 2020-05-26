import { Layer } from "./layer";
import { Bound } from "../util/bound";
import { Projection } from "../projection/projection";
import { FeatureClass } from "../data/feature-class";
import { Renderer } from "../renderer/renderer";
import { Label } from "../label/label";
export declare class FeatureLayer extends Layer {
    labeled: boolean;
    private _featureClass;
    private _renderer;
    private _label;
    private _zoom;
    private _interactive;
    get interactive(): boolean;
    set interactive(value: boolean);
    set featureClass(value: FeatureClass);
    set label(value: Label);
    set renderer(value: Renderer);
    set zoom(value: number[]);
    on(event: any, handler: any): void;
    off(event: any, handler: any): void;
    emit(event: any, param: any): void;
    draw(ctx: CanvasRenderingContext2D, projection?: Projection, extent?: Bound, zoom?: number): void;
    drawLabel(ctx: CanvasRenderingContext2D, projection?: Projection, extent?: Bound, zoom?: number): void;
    contain(screenX: number, screenY: number, projection?: Projection, extent?: Bound, event?: string): boolean;
    _getSymbol(feature: any): import("..").Symbol;
}
