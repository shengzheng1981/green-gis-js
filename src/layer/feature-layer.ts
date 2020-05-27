import {Layer} from "./layer";
import {Bound} from "../util/bound";
import {Feature} from "../element/feature";
import {Projection} from "../projection/projection";
import {WebMercator} from "../projection/web-mercator";
import {FeatureClass} from "../data/feature-class";
import {Renderer} from "../renderer/renderer";
import {SimpleRenderer} from "../renderer/simple-renderer";
import {CategoryRenderer} from "../renderer/category-renderer";
import {ClassRenderer} from "../renderer/class-renderer";
import {Label} from "../label/label";
import {Tooltip} from "../tooltip/tooltip";

export class FeatureLayer extends Layer{
    public labeled: boolean = false;
    private _featureClass: FeatureClass;
    private _renderer: Renderer;
    private _label: Label;
    private _tooltip: Tooltip;
    private _zoom: number[] = [3, 20];
    private _interactive: boolean = true;
    private _hoverFeature: Feature;

    get interactive(): boolean {
        return this._interactive;
    }

    set interactive(value: boolean) {
        this._interactive = value;
    }

    set featureClass(value: FeatureClass) {
        this._featureClass = value;
    }

    set label(value: Label) {
        this._label = value;
    }

    get tooltip(): Tooltip {
        return this._tooltip;
    }
    set tooltip(value: Tooltip) {
        this._tooltip = value;
    }

    set renderer(value: Renderer) {
        this._renderer = value;
    }

    set zoom(value: number[]) {
        this._zoom = value;
    }

    //地图事件注册监听
    on(event, handler) {
        this._featureClass.features.forEach( (feature: Feature) => {
            feature.on(event, handler);
        });
    }

    off(event, handler) {
        this._featureClass.features.forEach( (feature: Feature) => {
            feature.off(event, handler);
        });
    }

    emit(event, param) {
        this._featureClass.features.forEach( (feature: Feature) => {
            feature.emit(event, param);
        });
    }

    draw(ctx: CanvasRenderingContext2D, projection: Projection = new WebMercator(), extent: Bound = projection.bound, zoom: number = 10) {
        if (this.visible && this._zoom[0] <= zoom && this._zoom[1] >= zoom) {
            this._featureClass.features.forEach( (feature: Feature) => {
                feature.draw(ctx, projection, extent, this._getSymbol(feature));
            });
        }
    }

    drawLabel(ctx: CanvasRenderingContext2D, projection: Projection = new WebMercator(), extent: Bound = projection.bound, zoom: number = 10) {
        if (this.visible && this._zoom[0] <= zoom && this._zoom[1] >= zoom) {
            this._featureClass.features.forEach( (feature: Feature) => {
                feature.label(this._label.field, ctx, projection, extent, this._label.symbol);
            });
        }
    }

    contain(screenX: number, screenY: number, projection: Projection = new WebMercator(), extent: Bound = projection.bound, event: string = undefined): boolean {
        if (this.visible) {
            //if call Array.some, maybe abort mouseout last feature which mouseover!!! but filter maybe cause slow!!!no choice
            //return this._featureClass.features.filter((feature: Feature) => feature.intersect(projection, extent)).some( (feature: Feature) => {
            const features = this._featureClass.features.filter((feature: Feature) => feature.intersect(projection, extent)).filter( (feature: Feature) => {
                return feature.contain(screenX, screenY, event);
            });
            if (features.length > 0) {
                this._hoverFeature = features[0];
                return true;
            } else {
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
            return (this._renderer as SimpleRenderer).symbol;
        } else if (this._renderer instanceof CategoryRenderer) {
            const renderer: CategoryRenderer = this._renderer;
            const item = renderer.items.find( item => item.value == feature.properties[renderer.field.name]);
            return item?.symbol;
        } else if (this._renderer instanceof ClassRenderer) {
            const renderer: ClassRenderer = this._renderer;
            const item = renderer.items.find( item => item.low <= feature.properties[renderer.field.name] && item.high >= feature.properties[renderer.field.name]);
            return item?.symbol;
        }
    }

}