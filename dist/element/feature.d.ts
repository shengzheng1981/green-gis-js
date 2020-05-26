import { Bound } from "../util/bound";
import { Symbol, SimpleTextSymbol } from "../symbol/symbol";
import { Projection } from "../projection/projection";
import { Field } from "../data/field";
export declare class Feature {
    private _geometry;
    private _properties;
    private _contained;
    private _events;
    visible: boolean;
    get properties(): any;
    get bound(): Bound;
    constructor(geometry: any, properties: any);
    on(event: any, handler: any): void;
    off(event: any, handler: any): void;
    emit(event: any, param: any): void;
    draw(ctx: CanvasRenderingContext2D, projection?: Projection, extent?: Bound, symbol?: Symbol): void;
    label(field: Field, ctx: CanvasRenderingContext2D, projection?: Projection, extent?: Bound, symbol?: SimpleTextSymbol): void;
    intersect(projection?: Projection, extent?: Bound): boolean;
    contain(screenX: number, screenY: number, event?: string): boolean;
}
