import { Geometry } from "./geometry/geometry";
import { Graphic } from "./element/graphic";
import { Map } from "./map";
import { Symbol } from "./symbol/symbol";
import { Subject } from "./util/subject";
export declare enum MeasureActionType {
    Default = 0,
    Polyline = 1,
    Polygon = 2
}
/**
 * Measurer
 */
export declare class Measurer extends Subject {
    private _canvas;
    private _ctx;
    private _map;
    private _measureLayer;
    private _measuring;
    private _createLayer;
    private _create;
    private _action;
    private _defaultPointSymbol;
    private _defaultLineSymbol;
    private _defaultPolygonSymbol;
    get measuring(): boolean;
    get action(): MeasureActionType;
    set action(value: MeasureActionType);
    get defaultPointSymbol(): Symbol;
    set defaultPointSymbol(value: Symbol);
    get defaultLineSymbol(): Symbol;
    set defaultLineSymbol(value: Symbol);
    get defaultPolygonSymbol(): Symbol;
    set defaultPolygonSymbol(value: Symbol);
    /**
     * 创建Editor
     * 不应自主创建，map内部创建
     * @param {Map} map - 地图容器
     */
    constructor(map: Map);
    measurePolyLine(): void;
    measurePolygon(): void;
    clear(): void;
    addGraphic(g: Graphic): void;
    removeGraphic(g: Graphic): void;
    _onResize(event: any): void;
    _extentChange(event: any): void;
    redraw(): void;
    _onClick(event: any): void;
    _onDoubleClick(event: any): void;
    _label(geometry: Geometry): void;
    _onMouseDown(event: any): void;
    _onMouseMove(event: any): void;
    _onMouseUp(event: any): void;
    destroy(): void;
}
