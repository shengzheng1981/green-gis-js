/**
 * Tooltip
 */
export declare class Tooltip {
    private _map;
    private _tooltipContainer;
    private _tooltipArrow;
    private _tooltipText;
    /**
     * 创建Tooltip
     * @param {Map} map - 地图容器
     */
    constructor(map: any);
    /**
     * 显示Tooltip
     * 设置限高
     * 小于限高，显示在上方
     * 超出限高，显示在下方
     * @param {string | HTMLElement} text - HTMLElement | string
     * @param {number} screenX - 屏幕坐标X
     * @param {number} screenY - 屏幕坐标Y
     * @param {number} height - 设置限高
     */
    show(text: string | HTMLElement, screenX: any, screenY: any, height?: any): void;
    /**
     * 隐藏Tooltip
     */
    hide(): void;
}
