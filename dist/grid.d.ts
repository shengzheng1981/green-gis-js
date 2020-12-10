import { Map } from "./map";
import { Subject } from "./util/subject";
/**
 * 矢量切片管理器
 * 已内置于map，可通过map的接口进行添加删除的维护操作
 */
export declare class Grid extends Subject {
    private _canvas;
    private _ctx;
    private _map;
    private _layers;
    /**
     * server url
     */
    protected _url: string;
    /**
     * server url
     */
    get url(): string;
    /**
     * server url
     */
    set url(value: string);
    /**
     * 创建Grid
     * 不应自主创建，map内部创建
     * @param {Map} map - 地图容器
     */
    constructor(map: Map);
    _onResize(event: any): void;
    _extentChange(event: any): void;
    addLayer(layer: any): void;
    removeLayer(layer: any): void;
    clearLayers(): void;
    /**
     * 重绘
     */
    redraw(): void;
    /**
     * 销毁
     */
    destroy(): void;
}
