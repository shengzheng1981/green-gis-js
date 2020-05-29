import { SimplePointSymbol, SimpleTextSymbol } from "../symbol/symbol";
import { WebMercator } from "../projection/web-mercator";
export class Feature {
    constructor(geometry, properties) {
        //要素事件的handlers
        this._events = {
            "click": [],
            "mouseover": [],
            "mouseout": [] //鼠标退出
        };
        this.visible = true;
        this._geometry = geometry;
        this._properties = properties;
    }
    get geometry() {
        return this._geometry;
    }
    get properties() {
        return this._properties;
    }
    get bound() {
        return this._geometry ? this._geometry.bound : null;
    }
    //地图事件注册监听
    on(event, handler) {
        this._events[event].push(handler);
    }
    off(event, handler) {
        if (Array.isArray(this._events[event])) {
            const index = this._events[event].findIndex(item => item === handler);
            index != -1 && this._events[event].splice(index, 1);
        }
    }
    emit(event, param) {
        this._events[event].forEach(handler => handler(param));
    }
    draw(ctx, projection = new WebMercator(), extent = projection.bound, symbol = new SimplePointSymbol()) {
        if (this.visible)
            this._geometry.draw(ctx, projection, extent, symbol);
    }
    label(field, ctx, projection = new WebMercator(), extent = projection.bound, symbol = new SimpleTextSymbol()) {
        if (this.visible)
            this._geometry.label(this._properties[field.name], ctx, projection, extent, symbol);
    }
    intersect(projection = new WebMercator(), extent = projection.bound) {
        if (this.visible)
            return this._geometry.intersect(projection, extent);
    }
    contain(screenX, screenY, event = undefined) {
        if (this.visible) {
            const flag = this._geometry.contain(screenX, screenY);
            if (event == "mousemove") {
                if (!this._contained && flag) {
                    this._events.mouseover.forEach(handler => handler({ feature: this, screenX: screenX, screenY: screenY }));
                }
                else if (this._contained && !flag) {
                    this._events.mouseout.forEach(handler => handler({ feature: this, screenX: screenX, screenY: screenY }));
                }
            }
            else if (event == "click") {
                if (flag)
                    this._events.click.forEach(handler => handler({ feature: this, screenX: screenX, screenY: screenY }));
            }
            this._contained = flag;
            return flag;
        }
    }
}
