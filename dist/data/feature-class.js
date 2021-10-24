import { Feature } from "../element/feature";
import { GeometryType } from "../geometry/geometry";
import { Point } from "../geometry/point";
import { Polyline } from "../geometry/polyline";
import { Polygon } from "../geometry/polygon";
import { MultiplePolygon } from "../geometry/multiple-polygon";
import { MultiplePolyline } from "../geometry/multiple-polyline";
import { MultiplePoint } from "../geometry/multiple-point";
/**
 * 要素类（要素集合）
 * @remarks
 * TODO: a lot of things to be done
 */
export class FeatureClass {
    /**
     * 创建要素集合
     * @param {GeometryType} type - 空间数据类型：点/线/面
     */
    constructor(type) {
        /**
         * 属性字段集合
         */
        this._fields = [];
        /**
         * 要素集合
         */
        this._features = [];
        this._type = type;
    }
    /**
     * 空间数据类型：点/线/面
     */
    get type() {
        return this._type;
    }
    /**
     * 要素集合
     */
    get features() {
        return this._features;
    }
    /**
     * 属性字段集合
     */
    get fields() {
        return this._fields;
    }
    /**
     * 添加要素
     * @param {Feature} feature - 空间矢量要素
     */
    addFeature(feature) {
        this._features.push(feature);
    }
    /**
     * 删除要素
     * @param {Feature} feature - 空间矢量要素
     */
    removeFeature(feature) {
        const index = this._features.findIndex(item => item === feature);
        index != -1 && this._features.splice(index, 1);
    }
    /**
     * 清空要素集合
     */
    clearFeatures() {
        this._features = [];
    }
    /**
     * 添加字段
     * @param {Field} field - 字段
     */
    addField(field) {
        this._fields.push(field);
    }
    /**
     * 删除字段
     * @param {Field} field - 字段
     */
    removeField(field) {
        const index = this._fields.findIndex(item => item === field);
        index != -1 && this._fields.splice(index, 1);
    }
    /**
     * 清空字段集合
     */
    clearFields() {
        this._fields = [];
    }
    /**
     * 加载GeoJSON数据格式
     * @remarks
     * @param {Object} data - GeoJSON数据
     */
    loadGeoJSON(data) {
        Array.isArray(data.features) && data.features.forEach(item => {
            switch (item.geometry.type) {
                case "Point":
                    //TODO: each feature has one type that is ridiculous, cause geojson is a featurecollection, not a featurelayer.
                    this._type = GeometryType.Point;
                    const point = new Point(item.geometry.coordinates[0], item.geometry.coordinates[1]);
                    this.addFeature(new Feature(point, item.properties));
                    break;
                case "LineString":
                    this._type = GeometryType.Polyline;
                    const polyline = new Polyline(item.geometry.coordinates);
                    this.addFeature(new Feature(polyline, item.properties));
                    break;
                case "Polygon":
                    this._type = GeometryType.Polygon;
                    const polygon = new Polygon(item.geometry.coordinates);
                    this.addFeature(new Feature(polygon, item.properties));
                    break;
                case "MultiPoint":
                    this._type = GeometryType.Point;
                    const multipoint = new MultiplePoint(item.geometry.coordinates);
                    this.addFeature(new Feature(multipoint, item.properties));
                    break;
                case "MultiLineString":
                    this._type = GeometryType.Polyline;
                    const multipolyline = new MultiplePolyline(item.geometry.coordinates);
                    this.addFeature(new Feature(multipolyline, item.properties));
                    break;
                case "MultiPolygon":
                    this._type = GeometryType.Polygon;
                    const multipolygon = new MultiplePolygon(item.geometry.coordinates);
                    this.addFeature(new Feature(multipolygon, item.properties));
                    break;
            }
        });
    }
}
