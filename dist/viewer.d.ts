import { Map } from "./map";
import { Subject } from "./util/subject";
export declare class Viewer extends Subject {
    private _canvas;
    private _ctx;
    private _map;
    private _layers;
    constructor(map: Map);
    _onResize(event: any): void;
    _extentChange(event: any): void;
    _onClick(event: any): void;
    _onDoubleClick(event: any): void;
    _onMouseMove(event: any): void;
    addLayer(layer: any): void;
    insertLayer(layer: any, index?: number): void;
    removeLayer(layer: any): void;
    clearLayers(): void;
    redraw(): void;
    clear(): void;
    destroy(): void;
}
