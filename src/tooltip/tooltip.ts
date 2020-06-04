import {Field} from "../data/field";
import {Utility} from "../util/utility";
import {Map} from "../map";

export class Tooltip {

    private _map: Map;
    //提示框
    private _tooltipContainer: HTMLDivElement;
    private _tooltipArrow: HTMLDivElement;
    private _tooltipText: HTMLDivElement;

    constructor(map) {
        this._map = map;
        const container = this._map.container;
        this._tooltipContainer = document.createElement("div");
        Utility.addClass(this._tooltipContainer, "green-tooltip");
        Utility.addClass(this._tooltipContainer, "green-tooltip-placement-top");
        container.appendChild(this._tooltipContainer);
        this._tooltipArrow = document.createElement("div");
        Utility.addClass(this._tooltipArrow, "green-tooltip-arrow");
        Utility.addClass(this._tooltipArrow, "green-tooltip-arrow-placement-top");
        this._tooltipContainer.appendChild(this._tooltipArrow);
        this._tooltipText = document.createElement("div");
        Utility.addClass(this._tooltipText, "green-tooltip-text");
        this._tooltipContainer.appendChild(this._tooltipText);
    }

    show(text: string | HTMLElement, screenX, screenY){
        if (typeof text === 'string') {
            this._tooltipText.innerHTML = text;
        } else {
            const node = this._tooltipText;
            while (node.hasChildNodes()) {
                node.removeChild(node.firstChild);
            }
            node.appendChild(text);
        }
        //this._tooltip.style.cssText = "display: block; left: " + (screenX - this._tooltip.offsetWidth / 2) + "px; top: " + (screenY - this._tooltip.offsetHeight) + "px;";
        this._tooltipContainer.style.cssText = "display: block; left: " + (screenX) + "px; top: " + (screenY) + "px;";
    }

    hide() {
        this._tooltipContainer.style.cssText = "display: none";
    }
}