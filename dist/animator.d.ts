import { Map } from "./map";
import { Subject } from "./util/subject";
export declare class Animator extends Subject {
    private _canvas;
    private _ctx;
    private _map;
    private _animations;
    constructor(map: Map);
    _onResize(event: any): void;
    _extentChange(event: any): void;
    addAnimation(animation: any): void;
    removeAnimation(animation: any): void;
    clearAnimations(): void;
    private _frame;
    private _start;
    redraw(): void;
    animate(timestamp: any): void;
    clear(): void;
    destroy(): void;
}
