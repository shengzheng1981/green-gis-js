import { Layer } from "./layer";
import { WebMercator } from "../projection/web-mercator";
import { SimpleRenderer } from "../renderer/simple-renderer";
import { GeometryType } from "../geometry/geometry";
import { ClusterSymbol } from "../symbol/symbol";
import { DistanceCluster } from "../cluster/distance-cluster";
//import RBush from "rbush";
/**
 * 聚合类型
 * @enum {number}
 */
export var ClusterType;
(function (ClusterType) {
    //聚合
    ClusterType[ClusterType["Default"] = 0] = "Default";
    //抽稀
    ClusterType[ClusterType["Thinning"] = 1] = "Thinning";
})(ClusterType || (ClusterType = {}));
export class FeatureLayer extends Layer {
    constructor() {
        super(...arguments);
        /**
         * 图层渲染方式
         */
        this._renderer = new SimpleRenderer();
        /**
         * 图层可见缩放级别
         */
        this._zoom = [3, 20];
        /**
         * 是否显示标注
         */
        this.labeled = false;
        /**
         * 是否聚合
         */
        this.cluster = false;
        /**
         * 聚合类型
         */
        this.clusterType = ClusterType.Default;
        /**
         * 聚合方法
         */
        this.clusterMethod = new DistanceCluster();
        /**
         * 是否正在编辑
         */
        this.editing = false;
    }
    //private _tree: RBush<Feature> = new RBush(16);
    //private _inited: boolean = false;
    /**
     * 矢量要素类（数据源）
     */
    get featureClass() {
        return this._featureClass;
    }
    /**
     * 矢量要素类（数据源）
     */
    set featureClass(value) {
        this._featureClass = value;
    }
    /**
     * 图层标注设置
     */
    get label() {
        return this._label;
    }
    set label(value) {
        this._label = value;
    }
    /**
     * 图层渲染方式设置
     */
    get renderer() {
        return this._renderer;
    }
    set renderer(value) {
        this._renderer = value;
    }
    /**
     * 图层可见缩放级别设置
     */
    get minZoom() {
        return this._zoom[0];
    }
    get maxZoom() {
        return this._zoom[1];
    }
    set minZoom(value) {
        this._zoom[0] = value;
    }
    set maxZoom(value) {
        this._zoom[1] = value;
    }
    set zoom(value) {
        this._zoom = value;
    }
    /**
     * 重写事件注册监听
     * @remarks
     * 对图层的监听，重写为遍历对该图层下所有要素的监听
     * 该写法只是一种简写，无他。
     * @param {string} event - 事件名称
     * @param {Function} handler - 回调函数
     */
    on(event, handler) {
        this._featureClass.features.forEach((feature) => {
            feature.on(event, handler);
        });
    }
    /**
     * 重写事件取消监听
     * @param {string} event - 事件名称
     * @param {Function} handler - 回调函数
     */
    off(event, handler) {
        this._featureClass.features.forEach((feature) => {
            feature.off(event, handler);
        });
    }
    /**
     * 重写事件激发
     * @param {string} event - 事件名称
     * @param {Object} param - 事件参数
     */
    emit(event, param) {
        this._featureClass.features.forEach((feature) => {
            feature.emit(event, param);
        });
    }
    /* initTree(projection: Projection = new WebMercator()) {
        if (!this._inited) {
            this._featureClass.features.forEach(feature => {
                feature.geometry.project(projection);
            });
            this._tree.load(this._featureClass.features);
            this._inited = true;
        }
    } */
    /**
     * 绘制图层
     * @remarks
     * 遍历图形集合进行绘制
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {Projection} projection - 坐标投影转换
     * @param {Bound} extent - 当前可视范围
     * @param {number} zoom - 当前缩放级别
     */
    draw(ctx, projection = new WebMercator(), extent = projection.bound, zoom = 10) {
        console.time("draw");
        if (this.visible && this._zoom[0] <= zoom && this._zoom[1] >= zoom) {
            //过滤可见视图范围内的要素
            const features = this._featureClass.features.filter((feature) => feature.intersect(projection, extent));
            /* this.initTree(projection);
            const features = this._tree.search({
                minX: extent.xmin,
                minY: extent.ymin,
                maxX: extent.xmax,
                maxY: extent.ymax
            } as any); */
            //获取当前渲染方式下，某一要素对应的渲染符号
            const _getSymbol = (feature) => {
                /*if (this._renderer instanceof SimpleRenderer) {
                    return (this._renderer as SimpleRenderer).symbol;
                } else if (this._renderer instanceof CategoryRenderer) {
                    const renderer: CategoryRenderer = this._renderer;
                    const item = renderer.items.find( item => item.value == feature.properties[renderer.field.name]);
                    if (item) return item.symbol;
                } else if (this._renderer instanceof ClassRenderer) {
                    const renderer: ClassRenderer = this._renderer;
                    const item = renderer.items.find( item => item.low <= feature.properties[renderer.field.name] && item.high >= feature.properties[renderer.field.name]);
                    if (item) return item.symbol;
                } else if (this._renderer instanceof DotRenderer) {
                    const renderer: DotRenderer = this._renderer;
                    const symbol = new SimplePointSymbol();
                    symbol.radius = Number(feature.properties[renderer.field.name] || 0);
                    return symbol;
                }*/
                return this._renderer.getSymbol(feature);
            };
            //如果是点图层，同时又设置为聚合显示时
            if (this._featureClass.type == GeometryType.Point && this.cluster) {
                /* const cluster = features.reduce( (acc, cur) => {
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
                }, []); */ // [{feature, count}]
                const cluster = this.clusterMethod.generate(features, ctx, projection, extent);
                cluster.forEach((item) => {
                    if (item.count == 1) {
                        item.feature.draw(ctx, projection, extent, _getSymbol(item.feature));
                    }
                    else {
                        item.feature.draw(ctx, projection, extent, this.clusterType == ClusterType.Thinning ? _getSymbol(item.feature) : new ClusterSymbol(item.count));
                    }
                });
            }
            else {
                features.forEach((feature) => {
                    feature.draw(ctx, projection, extent, _getSymbol(feature));
                });
            }
        }
        console.timeEnd("draw");
    }
    /*animate(elapsed, ctx: CanvasRenderingContext2D, projection: Projection = new WebMercator(), extent: Bound = projection.bound, zoom: number = 10) {
        if (this.visible && this._zoom[0] <= zoom && this._zoom[1] >= zoom) {
            const features = this._featureClass.features.filter((feature: Feature) => feature.intersect(projection, extent));
            features.forEach( (feature: Feature) => {
                feature.animate(elapsed, ctx, projection, extent, new Animation());
            });
        }
    }*/
    /**
     * 绘制标注
     * @remarks
     * 本应起名为label，但与属性中setter重名，故起名为drawLabel，无奈。。。
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {Projection} projection - 坐标投影转换
     * @param {Bound} extent - 当前可视范围
     * @param {number} zoom - 当前缩放级别
     */
    drawLabel(ctx, projection = new WebMercator(), extent = projection.bound, zoom = 10) {
        console.time("label");
        if (this.visible && this._zoom[0] <= zoom && this._zoom[1] >= zoom) {
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
        console.timeEnd("label");
    }
    /**
     * 图层交互
     * @remarks 当前鼠标是否落入该图层某要素
     * @param {number} screenX - 鼠标屏幕坐标X
     * @param {number} screenX - 鼠标屏幕坐标Y
     * @param {Projection} projection - 坐标投影转换
     * @param {Bound} extent - 当前可视范围
     * @param {number} zoom - 当前缩放级别
     * @param {string} event - 当前事件名称
     * @return {boolean} 是否落入
     */
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
}
