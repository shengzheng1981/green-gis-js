import { Map } from "./map";
import { Subject } from "./util/subject";
/**
 * Viewer
 * 相对于Editor，管理所有非编辑状态下的图层
 * 优化的产物
 */
export declare class Viewer extends Subject {
    private _canvas;
    private _ctx;
    private _map;
    private _layers;
    /**
     * 创建Viewer
     * 不应自主创建，map内部创建
     * @param {Map} map - 地图容器
     */
    constructor(map: Map);
    _onResize(event: any): void;
    _extentChange(event: any): void;
    _onClick(event: any): void;
    _onDoubleClick(event: any): void;
    _onMouseMove(event: any): void;
    /**
     * 添加图层
     * @param {Layer} layer - 图层
     */
    addLayer(layer: any): void;
    /**
     * 插入图层
     * @param {Layer} layer - 图层
     * @param {number} index - 图层顺序
     */
    insertLayer(layer: any, index?: number): void;
    /**
     * 移除图层
     * @param {Layer} layer - 图层
     */
    removeLayer(layer: any): void;
    /**
     * 清空图层
     */
    clearLayers(): void;
    /**
     * 重绘
     */
    redraw(): void;
    /**
     * 清空画布
     */
    clear(): void;
    /**
     * 销毁
     */
    destroy(): void;
}
