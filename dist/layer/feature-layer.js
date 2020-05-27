import { Layer } from "./layer";
import { WebMercator } from "../projection/web-mercator";
import { SimpleRenderer } from "../renderer/simple-renderer";
import { CategoryRenderer } from "../renderer/category-renderer";
import { ClassRenderer } from "../renderer/class-renderer";
export class FeatureLayer extends Layer {
    constructor() {
        super(...arguments);
        this.labeled = false;
        this._zoom = [3, 20];
        this._interactive = true;
    }
    get interactive() {
        return this._interactive;
    }
    set interactive(value) {
        this._interactive = value;
    }
    set featureClass(value) {
        this._featureClass = value;
    }
    set label(value) {
        this._label = value;
    }
    get tooltip() {
        return this._tooltip;
    }
    set tooltip(value) {
        this._tooltip = value;
    }
    set renderer(value) {
        this._renderer = value;
    }
    set zoom(value) {
        this._zoom = value;
    }
    //地图事件注册监听
    on(event, handler) {
        this._featureClass.features.forEach((feature) => {
            feature.on(event, handler);
        });
    }
    off(event, handler) {
        this._featureClass.features.forEach((feature) => {
            feature.off(event, handler);
        });
    }
    emit(event, param) {
        this._featureClass.features.forEach((feature) => {
            feature.emit(event, param);
        });
    }
    draw(ctx, projection = new WebMercator(), extent = projection.bound, zoom = 10) {
        if (this.visible && this._zoom[0] <= zoom && this._zoom[1] >= zoom) {
            this._featureClass.features.forEach((feature) => {
                feature.draw(ctx, projection, extent, this._getSymbol(feature));
            });
        }
    }
    drawLabel(ctx, projection = new WebMercator(), extent = projection.bound, zoom = 10) {
        if (this.visible && this._zoom[0] <= zoom && this._zoom[1] >= zoom) {
            this._featureClass.features.forEach((feature) => {
                feature.label(this._label.field, ctx, projection, extent, this._label.symbol);
            });
        }
    }
    contain(screenX, screenY, projection = new WebMercator(), extent = projection.bound, event = undefined) {
        if (this.visible) {
            //if call Array.some, maybe abort mouseout last feature which mouseover!!! but filter maybe cause slow!!!no choice
            //return this._featureClass.features.filter((feature: Feature) => feature.intersect(projection, extent)).some( (feature: Feature) => {
            const features = this._featureClass.features.filter((feature) => feature.intersect(projection, extent)).filter((feature) => {
                return feature.contain(screenX, screenY, event);
            });
            if (features.length > 0) {
                this._hoverFeature = features[0];
                return true;
            }
            else {
                this._hoverFeature = null;
                return false;
            }
        }
    }
    getTooltip() {
        return (this._hoverFeature && this._tooltip && this._tooltip.field) ? this._hoverFeature.properties[this._tooltip.field.name] : "";
    }
    _getSymbol(feature) {
        if (this._renderer instanceof SimpleRenderer) {
            return this._renderer.symbol;
        }
        else if (this._renderer instanceof CategoryRenderer) {
            const renderer = this._renderer;
            const item = renderer.items.find(item => item.value == feature.properties[renderer.field.name]);
            return item === null || item === void 0 ? void 0 : item.symbol;
        }
        else if (this._renderer instanceof ClassRenderer) {
            const renderer = this._renderer;
            const item = renderer.items.find(item => item.low <= feature.properties[renderer.field.name] && item.high >= feature.properties[renderer.field.name]);
            return item === null || item === void 0 ? void 0 : item.symbol;
        }
    }
}
