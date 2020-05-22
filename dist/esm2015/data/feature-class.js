import { Feature } from "../element/feature";
import { GeometryType } from "../geometry/geometry";
import { Point } from "../geometry/point";
import { Polyline } from "../geometry/polyline";
import { Polygon } from "../geometry/polygon";
export class FeatureClass {
    constructor() {
        this._fields = [];
        this._features = [];
    }
    get type() {
        return this._type;
    }
    get features() {
        return this._features;
    }
    get fields() {
        return this._fields;
    }
    addFeature(feature) {
        this._features.push(feature);
    }
    removeFeature(feature) {
        const index = this._features.findIndex(item => item === feature);
        index != -1 && this._features.splice(index, 1);
    }
    clearFeatures() {
        this._features = [];
    }
    addField(field) {
        this._fields.push(field);
    }
    removeField(field) {
        const index = this._fields.findIndex(item => item === field);
        index != -1 && this._fields.splice(index, 1);
    }
    clearFields() {
        this._fields = [];
    }
    //TODO: multiple point line polygon is not supported
    loadGeoJSON(data) {
        Array.isArray(data.features) && data.features.forEach(item => {
            switch (item.geometry.type) {
                case "Point":
                    //TODO: ridiculous
                    this._type = GeometryType.Point;
                    const point = new Point(item.geometry.coordinates[0], item.geometry.coordinates[1]);
                    this._features.push(new Feature(point, item.properties));
                    break;
                case "LineString":
                    this._type = GeometryType.Polyline;
                    const polyline = new Polyline(item.geometry.coordinates);
                    this._features.push(new Feature(polyline, item.properties));
                    break;
                case "Polygon":
                    this._type = GeometryType.Polygon;
                    const polygon = new Polygon(item.geometry.coordinates);
                    this._features.push(new Feature(polygon, item.properties));
                    break;
            }
        });
    }
}
