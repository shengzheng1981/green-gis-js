import { Feature } from "../element/feature";
import { CoordinateType } from "../geometry/geometry";
import { Point } from "../geometry/point";
import { Projection } from "../projection/projection";
import { WebMercator } from "../projection/web-mercator";
import { Bound } from "../util/bound";

export class DistanceCluster {

  public distance: number = 50;

  generate(features: Feature[], ctx: CanvasRenderingContext2D, projection: Projection = new WebMercator(), extent: Bound = projection.bound) {
    return features.reduce( (acc, cur) => {
      if (cur.geometry instanceof Point) {
          const point: Point = cur.geometry;
          const item: any = acc.find((item: any) => {
              const d = point.distance(item.feature.geometry, CoordinateType.Screen, ctx, projection);
              return d <= this.distance;
          });
          if (item) {
              item.count += 1;
          } else {
              acc.push({feature: cur, count: 1});
          }
          return acc;
      }
    }, []); // [{feature, count}]
  }
}