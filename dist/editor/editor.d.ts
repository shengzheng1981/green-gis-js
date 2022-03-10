import { Graphic } from "../element/graphic";
import { Feature } from "../element/feature";
import { FeatureLayer } from "../layer/feature-layer";
import { Map } from "../map";
import { Symbol } from "../symbol/symbol";
import { Subject } from "../util/subject";
export declare enum EditorActionType {
    Select = 0,
    Create = 1,
    Edit = 2
}
/**
 * Editor
 * 相对于Viewer，管理所有编辑状态下的图层
 * 优化的产物
 */
export declare class Editor extends Subject {
    private _canvas;
    private _ctx;
    private _map;
    private _featureLayer;
    private _editing;
    private _editingFeature;
    private _editingVertex;
    private _vertexLayer;
    private _createLayer;
    private _middleLayer;
    private _drag;
    private _create;
    private _action;
    private _defaultPointSymbol;
    private _defaultLineSymbol;
    private _defaultPolygonSymbol;
    private _drawPointSymbol;
    private _container;
    private _contextMenu;
    private _menuFinishEditing;
    private _menuStopEditing;
    private _menuDeleteVertex;
    get editing(): boolean;
    get dragging(): boolean;
    get editingFeature(): Feature;
    get action(): EditorActionType;
    set action(value: EditorActionType);
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
    /****** 公共函数 外部调用 ******/
    setFeatureLayer(layer: FeatureLayer): void;
    addFeature(feature: Feature): void;
    removeFeature(feature: Feature): void;
    start(): void;
    stop(): void;
    create(): void;
    save(): void;
    redraw(): void;
    clear(): void;
    /*** 响应map事件 ***/
    _onResize(event: any): void;
    _extentChange(event: any): void;
    /*** 右键菜单 ***/
    _bindContextMenu(): void;
    _unbindContextMenu(): void;
    _showContextMenu(): void;
    _hideContextMenu(): void;
    _closeContextMenu(): void;
    _initContextMenu(items: any): void;
    _createContextMenuItem(name: any): HTMLLIElement;
    /*** 启停编辑 ***/
    _startEditing(): void;
    _stopEditing(): void;
    /*** 编辑状态切换 ***/
    _switchEditing(event: any): void;
    _finishEditing(): void;
    /*** 编辑状态统一处理 ***/
    _setSelectStatus(): void;
    _setEditStatus(): void;
    _setCreateStatus(): void;
    /*** 顶点处理 ***/
    _createVertex(point: any): Graphic;
    _deleteVertex(): void;
    _drawMiddlePoint(line: any, closed: any): void;
    /*** 编辑事件处理 ***/
    _onClick(event: any): void;
    _onDoubleClick(event: any): void;
    _onMouseDown(event: any): void;
    _onMouseMove(event: any): void;
    _onMouseUp(event: any): void;
    destroy(): void;
}
