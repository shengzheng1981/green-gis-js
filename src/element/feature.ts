import {Bound} from "../util/bound";
import {Geometry} from "../geometry/geometry";
import {Symbol, SimplePointSymbol, SimpleTextSymbol} from "../symbol/symbol";
import {Projection} from "../projection/projection";
import {WebMercator} from "../projection/web-mercator";
import {Field} from "../data/field";

export class Feature {
    private _geometry: Geometry;
    private _properties: any;

    private _contained: boolean;
    //要素事件的handlers
    private _events: any = {
        "click": [],
        "mouseover": [],    //鼠标进入
        "mouseout": []      //鼠标退出
    };

    public visible: boolean = true;

    get geometry(): Geometry {
        return this._geometry;
    }

    get properties(): any {
        return this._properties;
    }

    get bound(): Bound {
        return this._geometry ? this._geometry.bound: null;
    }

    constructor(geometry, properties) {
        this._geometry = geometry;
        this._properties = properties;
    }

    //地图事件注册监听
    on(event, handler) {
        this._events[event].push(handler);
    }

    off(event, handler) {
        if (Array.isArray(this._events[event])) {
            const index = this._events[event].findIndex( item => item === handler );
            index != -1 && this._events[event].splice(index, 1);
        }
    }

    emit(event, param) {
        this._events[event].forEach(handler => handler(param));
    }

    draw(ctx: CanvasRenderingContext2D, projection: Projection = new WebMercator(), extent: Bound = projection.bound, symbol: Symbol = new SimplePointSymbol()) {
        if (this.visible) this._geometry.draw(ctx, projection, extent, symbol);
    }

    label(field:Field, ctx: CanvasRenderingContext2D, projection: Projection = new WebMercator(), extent: Bound = projection.bound, symbol: SimpleTextSymbol = new SimpleTextSymbol()) {
        if (this.visible) this._geometry.label(this._properties[field.name], ctx, projection, extent, symbol);
    }

    intersect(projection: Projection = new WebMercator(), extent: Bound = projection.bound): boolean {
        if (this.visible) return this._geometry.intersect(projection, extent);
    }

    contain(screenX: number, screenY: number, event: string = undefined): boolean {
        if (this.visible) {
            const flag = this._geometry.contain(screenX, screenY);
            if (event == "mousemove") {
                if (!this._contained && flag) {
                    this._events.mouseover.forEach(handler => handler({feature: this, screenX: screenX, screenY: screenY}));
                } else if(this._contained && !flag) {
                    this._events.mouseout.forEach(handler => handler({feature: this, screenX: screenX, screenY: screenY}));
                }
            } else if (event == "click") {
                if (flag) this._events.click.forEach(handler => handler({feature: this, screenX: screenX, screenY: screenY}));
            }
            this._contained = flag;
            return flag;
        }
    }

}