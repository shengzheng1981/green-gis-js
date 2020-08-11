import { Layer } from "./layer";
import { WebMercator } from "../projection/web-mercator";
import { SimpleRenderer } from "../renderer/simple-renderer";
import { CategoryRenderer } from "../renderer/category-renderer";
import { ClassRenderer } from "../renderer/class-renderer";
import { GeometryType, CoordinateType } from "../geometry/geometry";
import { Point } from "../geometry/point";
import { ClusterSymbol } from "../symbol/symbol";
export class FeatureLayer extends Layer {
    constructor() {
        super(...arguments);
        //是否显示标注
        this.labeled = false;
        //是否聚合
        this.cluster = false;
        //是否正在编辑
        this.editing = false;
        this._zoom = [3, 20];
        this._interactive = true;
        this._index = 0; //z-index
    }
    get interactive() {
        return this._interactive;
    }
    set interactive(value) {
        this._interactive = value;
    }
    get featureClass() {
        return this._featureClass;
    }
    set featureClass(value) {
        this._featureClass = value;
    }
    set label(value) {
        this._label = value;
    }
    set renderer(value) {
        this._renderer = value;
    }
    set zoom(value) {
        this._zoom = value;
    }
    get index() {
        return this._index;
    }
    set index(value) {
        this._index = value;
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
            const features = this._featureClass.features.filter((feature) => feature.intersect(projection, extent));
            if (this._featureClass.type == GeometryType.Point && this.cluster) {
                const cluster = features.reduce((acc, cur) => {
                    if (cur.geometry instanceof Point) {
                        const point = cur.geometry;
                        const item = acc.find((item) => {
                            const distance = point.distance(item.feature.geometry, CoordinateType.Screen, ctx, projection);
                            return distance <= 50;
                        });
                        if (item) {
                            item.count += 1;
                        }
                        else {
                            acc.push({ feature: cur, count: 1 });
                        }
                        return acc;
                    }
                }, []); // [{feature, count}]
                cluster.forEach((item) => {
                    if (item.count == 1) {
                        item.feature.draw(ctx, projection, extent, this._getSymbol(item.feature));
                    }
                    else {
                        item.feature.draw(ctx, projection, extent, new ClusterSymbol(item.count));
                    }
                });
            }
            else {
                features.forEach((feature) => {
                    feature.draw(ctx, projection, extent, this._getSymbol(feature));
                });
            }
        }
    }
    drawLabel(ctx, projection = new WebMercator(), extent = projection.bound, zoom = 10) {
        if (this.visible && !this.cluster && this._zoom[0] <= zoom && this._zoom[1] >= zoom) {
            const features = this._featureClass.features.filter((feature) => feature.intersect(projection, extent));
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
    contain(screenX, screenY, projection = new WebMercator(), extent = projection.bound, zoom = 10, event = undefined) {
        if (this.visible && this._zoom[0] <= zoom && this._zoom[1] >= zoom) {
            //if call Array.some, maybe abort mouseout last feature which mouseover!!! but filter maybe cause slow!!!no choice
            //return this._featureClass.features.filter((feature: Feature) => feature.intersect(projection, extent)).some( (feature: Feature) => {
            const features = this._featureClass.features.filter((feature) => feature.intersect(projection, extent)).filter((feature) => {
                return feature.contain(screenX, screenY, event);
            });
            if (features.length > 0) {
                if (event == "dblclick") {
                    features[0].emit("dblclick", { feature: features[0], screenX: screenX, screenY: screenY });
                }
                else if (event == "click") {
                    features[0].emit("click", { feature: features[0], screenX: screenX, screenY: screenY });
                }
                return true;
            }
            else {
                return false;
            }
        }
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
