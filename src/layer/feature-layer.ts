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
import {GeometryType, CoordinateType} from "../geometry/geometry";
import {Point} from "../geometry/point";
import {ClusterSymbol} from "../symbol/symbol";
import {Animation} from "../animation/animation";

export class FeatureLayer extends Layer{
    //是否显示标注
    public labeled: boolean = false;
    //是否聚合
    public cluster: boolean = false;
    //是否正在编辑
    public editing: boolean = false;
    private _featureClass: FeatureClass;
    private _renderer: Renderer;
    private _label: Label;
    private _zoom: number[] = [3, 20];
    private _interactive: boolean = true;
    private _index: number = 0; //z-index

    get interactive(): boolean {
        return this._interactive;
    }

    set interactive(value: boolean) {
        this._interactive = value;
    }

    get featureClass(): FeatureClass {
        return this._featureClass;
    }
    set featureClass(value: FeatureClass) {
        this._featureClass = value;
    }

    set label(value: Label) {
        this._label = value;
    }

    set renderer(value: Renderer) {
        this._renderer = value;
    }

    set zoom(value: number[]) {
        this._zoom = value;
    }

    get index(): number {
        return this._index;
    }
    set index(value: number) {
        this._index = value;
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
            const features = this._featureClass.features.filter((feature: Feature) => feature.intersect(projection, extent));
            if (this._featureClass.type == GeometryType.Point && this.cluster) {
                const cluster = features.reduce( (acc, cur) => {
                    if (cur.geometry instanceof Point) {
                        const point: Point = cur.geometry;
                        const item: any = acc.find((item: any) => {
                            const distance = point.distance(item.feature.geometry, CoordinateType.Screen, ctx, projection);
                            return distance <= 50;
                        });
                        if (item) {
                            item.count += 1;
                        } else {
                            acc.push({feature: cur, count: 1});
                        }
                        return acc;
                    }
                }, []); // [{feature, count}]
                cluster.forEach( (item: any) => {
                    if (item.count == 1) {
                        item.feature.draw(ctx, projection, extent, this._getSymbol(item.feature));
                    } else {
                        item.feature.draw(ctx, projection, extent, new ClusterSymbol(item.count));
                    }
                });
            } else {
                features.forEach( (feature: Feature) => {
                    feature.draw(ctx, projection, extent, this._getSymbol(feature));
                });
            }
        }
    }

    /*animate(elapsed, ctx: CanvasRenderingContext2D, projection: Projection = new WebMercator(), extent: Bound = projection.bound, zoom: number = 10) {
        if (this.visible && this._zoom[0] <= zoom && this._zoom[1] >= zoom) {
            const features = this._featureClass.features.filter((feature: Feature) => feature.intersect(projection, extent));
            features.forEach( (feature: Feature) => {
                feature.animate(elapsed, ctx, projection, extent, new Animation());
            });
        }
    }*/

    drawLabel(ctx: CanvasRenderingContext2D, projection: Projection = new WebMercator(), extent: Bound = projection.bound, zoom: number = 10) {
        if (this.visible && !this.cluster && this._zoom[0] <= zoom && this._zoom[1] >= zoom) {
            const features = this._featureClass.features.filter((feature: Feature) => feature.intersect(projection, extent));
            this._label.draw(features, ctx, projection);
            /*features.forEach( feature => {
                feature.label(this._label.field, ctx, projection, extent, this._label.symbol);
            });*/
            /*const cluster = features.reduce( (acc, cur) => {
                const item: any = acc.find((item: any) => {
                    const distance = cur.geometry.distance(item.feature.geometry, CoordinateType.Screen, ctx, projection);
                    return distance <= 50;
                });
                if (item) {
                    item.count += 1;
                } else {
                    acc.push({feature: cur, count: 1});
                }
                return acc;
            }, []); // [{feature, count}]
            cluster.forEach( (item: any) => {
                item.feature.label(this._label.field, ctx, projection, extent, this._label.symbol);
            });*/
        }
    }

    contain(screenX: number, screenY: number, projection: Projection = new WebMercator(), extent: Bound = projection.bound, zoom: number = 10, event: string = undefined): boolean {
        if (this.visible && this._zoom[0] <= zoom && this._zoom[1] >= zoom) {
            //if call Array.some, maybe abort mouseout last feature which mouseover!!! but filter maybe cause slow!!!no choice
            //return this._featureClass.features.filter((feature: Feature) => feature.intersect(projection, extent)).some( (feature: Feature) => {
            const features = this._featureClass.features.filter((feature: Feature) => feature.intersect(projection, extent)).filter( (feature: Feature) => {
                return feature.contain(screenX, screenY, event);
            });
            if (features.length > 0) {
                if (event == "dblclick") {
                    features[0].emit("dblclick", {feature: features[0], screenX: screenX, screenY: screenY});
                } else if (event == "click") {
                    features[0].emit("click", {feature: features[0], screenX: screenX, screenY: screenY});
                }
                return true;
            } else {
                return false;
            }
        }
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