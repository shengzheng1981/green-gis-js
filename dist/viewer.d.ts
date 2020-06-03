import { Map } from "./map";
import { FeatureLayer } from "./layer/feature-layer";
import { Subject } from "./util/subject";
export declare class Viewer extends Subject {
    private _canvas;
    private _ctx;
    private _drag;
    private _map;
    private _layers;
    constructor(map: Map);
    _onResize(event: any): void;
    _extentChange(event: any): void;
    _onClick(event: any): void;
    _onMouseMove(event: any): void;
    addLayer(layer: FeatureLayer): void;
    insertLayer(layer: FeatureLayer, index?: number): void;
    removeLayer(layer: FeatureLayer): void;
    clearLayers(): void;
    redraw(): void;
    clear(): void;
    destroy(): void;
}
