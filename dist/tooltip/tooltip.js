import { Utility } from "../util/utility";
/**
 * Tooltip
 */
export class Tooltip {
    /**
     * 创建Tooltip
     * @param {Map} map - 地图容器
     */
    constructor(map) {
        this._map = map;
        const container = this._map.container;
        this._tooltipContainer = document.createElement("div");
        Utility.addClass(this._tooltipContainer, "green-tooltip");
        //Utility.addClass(this._tooltipContainer, "green-tooltip-placement-top");
        container.appendChild(this._tooltipContainer);
        this._tooltipArrow = document.createElement("div");
        Utility.addClass(this._tooltipArrow, "green-tooltip-arrow");
        //Utility.addClass(this._tooltipArrow, "green-tooltip-arrow-placement-top");
        this._tooltipContainer.appendChild(this._tooltipArrow);
        this._tooltipText = document.createElement("div");
        Utility.addClass(this._tooltipText, "green-tooltip-text");
        this._tooltipContainer.appendChild(this._tooltipText);
    }
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
    show(text, screenX, screenY, height) {
        if (typeof text === 'string') {
            this._tooltipText.innerHTML = text;
        }
        else {
            const node = this._tooltipText;
            while (node.hasChildNodes()) {
                node.removeChild(node.firstChild);
            }
            node.appendChild(text);
        }
        //this._tooltip.style.cssText = "display: block; left: " + (screenX - this._tooltip.offsetWidth / 2) + "px; top: " + (screenY - this._tooltip.offsetHeight) + "px;";
        Utility.removeClass(this._tooltipContainer, "green-tooltip-placement-top");
        Utility.removeClass(this._tooltipContainer, "green-tooltip-placement-bottom");
        Utility.removeClass(this._tooltipArrow, "green-tooltip-arrow-placement-top");
        Utility.removeClass(this._tooltipArrow, "green-tooltip-arrow-placement-bottom");
        if (screenY < (height || this._tooltipContainer.offsetHeight)) {
            Utility.addClass(this._tooltipContainer, "green-tooltip-placement-bottom");
            Utility.addClass(this._tooltipArrow, "green-tooltip-arrow-placement-bottom");
        }
        else {
            Utility.addClass(this._tooltipContainer, "green-tooltip-placement-top");
            Utility.addClass(this._tooltipArrow, "green-tooltip-arrow-placement-top");
        }
        this._tooltipContainer.style.cssText = "display: block; left: " + (screenX) + "px; top: " + (screenY) + "px;";
    }
    /**
     * 隐藏Tooltip
     */
    hide() {
        this._tooltipContainer.style.cssText = "display: none";
    }
}
