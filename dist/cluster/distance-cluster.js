import { CoordinateType } from "../geometry/geometry";
import { Point } from "../geometry/point";
import { WebMercator } from "../projection/web-mercator";
export class DistanceCluster {
    constructor() {
        this.distance = 50;
    }
    generate(features, ctx, projection = new WebMercator(), extent = projection.bound) {
        return features.reduce((acc, cur) => {
            if (cur.geometry instanceof Point) {
                const point = cur.geometry;
                const item = acc.find((item) => {
                    const d = point.distance(item.feature.geometry, CoordinateType.Screen, ctx, projection);
                    return d <= this.distance;
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
    }
}
