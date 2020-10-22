import { Geometry } from "./geometry/geometry";
import { Bound } from "./util/bound";
import { Projection } from "./projection/projection";
import { Layer } from "./layer/layer";
import { Graphic } from "./element/graphic";
import { Editor } from "./editor/editor";
import { Viewer } from "./viewer";
import { Subject } from "./util/subject";
import { Tooltip } from "./tooltip/tooltip";
import { SimpleFillSymbol, SimpleLineSymbol, SimplePointSymbol } from "./symbol/symbol";
/**
 * 地图
 * 容器: 1 viewer 1 editor 1 animator 1 tooltip
 */
export declare class Map extends Subject {
    private _container;
    private _canvas;
    private _ctx;
    private _option;
    private _drag;
    private _touch;
    private _zoom;
    minZoom: number;
    maxZoom: number;
    private _center;
    private _extent;
    private _projection;
    private _defaultGraphicLayer;
    private _selectionLayer;
    private _selectionPointSymbol;
    private _selectionLineSymbol;
    private _selectionPolygonSymbol;
    private _viewer;
    private _editor;
    private _animator;
    private _grid;
    private _tooltip;
    /**
     * DIV容器
     */
    get container(): HTMLDivElement;
    /**
     * Viewer
     */
    get viewer(): Viewer;
    /**
     * Tooltip
     */
    get tooltip(): Tooltip;
    /**
     * Editor
     */
    get editor(): Editor;
    set editor(value: Editor);
    /**
     * 视图中心
     */
    get center(): number[];
    /**
     * 可视范围
     */
    get extent(): Bound;
    /**
     * 缩放级别
     */
    get zoom(): number;
    /**
     * 坐标投影变换
     */
    get projection(): Projection;
    /**
     * 点选中符号
     */
    get selectionPointSymbol(): SimplePointSymbol;
    /**
     * 线选中符号
     */
    get selectionLineSymbol(): SimpleLineSymbol;
    /**
     * 面选中符号
     */
    get selectionPolygonSymbol(): SimpleFillSymbol;
    /**
     * 创建地图
     * @param {string | HTMLDivElement} id - HTMLDivElement | id
     * @param {Object} option - 选项配置
     */
    constructor(id: string | HTMLDivElement, option?: any);
    /**
     * 禁用双击交互
     */
    disableDoubleClick(): void;
    /**
     * 启用双击交互
     */
    enableDoubleClick(): void;
    /**
     * 设置坐标投影变换
     * @param {Projection} projection - 坐标投影变换
     */
    setProjection(projection: any): void;
    /**
     * 设置视图级别及视图中心
     * @param {number[]} center - 视图中心
     * @param {number} zoom - 视图级别
     */
    setView(center?: number[], zoom?: number): void;
    /**
     * 设置缩放到某一范围
     * 默认该范围2倍. 用于缩放到某一要素对应的bound
     * @param {Bound} bound - 视图范围
     */
    fitBound(bound: Bound): void;
    /**
     * 添加图层
     * @param {Layer} layer - 图层
     */
    addLayer(layer: Layer): void;
    /**
     * 插入图层
     * @param {Layer} layer - 图层
     * @param {number} index - 图层顺序
     */
    insertLayer(layer: Layer, index?: number): void;
    /**
     * 移除图层
     * @param {Layer} layer - 图层
     */
    removeLayer(layer: Layer): void;
    /**
     * 清空图层
     */
    clearLayers(): void;
    /**
     * 添加动画
     * @param {Animation} animation - 动画
     */
    addAnimation(animation: any): void;
    /**
     * 删除动画
     * @param {Animation} animation - 动画
     */
    removeAnimation(animation: any): void;
    /**
     * 清除动画
     */
    clearAnimations(): void;
    setTileUrl(url: any): void;
    /**
     * 添加图形
     * 参考_defaultGraphicLayer定义处的说明
     * shortcut
     * @param {Graphic} graphic - 图形
     */
    addGraphic(graphic: Graphic): void;
    /**
     * 删除图形
     * 参考_defaultGraphicLayer定义处的说明
     * shortcut
     * @param {Graphic} graphic - 图形
     */
    removeGraphic(graphic: Graphic): void;
    /**
     * 清除图形
     * 参考_defaultGraphicLayer定义处的说明
     * shortcut
     */
    clearGraphics(): void;
    /**
     * 添加选中
     * @param {Geometry} geometry - 图形
     */
    addSelection(geometry: Geometry): void;
    /**
     * 清除选中
     */
    clearSelection(): void;
    /**
     * 更新地图视图范围以及中心点
     */
    updateExtent(): void;
    /**
     * 重绘
     */
    redraw(): void;
    /**
     * 清空视图
     */
    clear(): void;
    /**
     * 响应窗体resize
     */
    resize(): void;
    _onResize(event: any): void;
    _onClick(event: any): void;
    _onDoubleClick(event: any): void;
    _onMouseDown(event: any): void;
    _onMouseMove(event: any): void;
    _onMouseUp(event: any): void;
    _onWheel(event: any): void;
    _onTouchStart(event: any): void;
    _onTouchMove(event: any): void;
    _onTouchEnd(event: any): void;
    /**
     * 显示Tooltip
     * shortcut
     * @param {Feature} feature - 要素
     * @param {Field} field - 字段
     */
    showTooltip(feature: any, field: any): void;
    /**
     * 隐藏Tooltip
     * shortcut
     */
    hideTooltip(): void;
    /**
     * 销毁
     */
    destroy(): void;
}
