import { Feature } from "../element/feature";
import { Projection } from "../projection/projection";
import { WebMercator } from "../projection/web-mercator";
import { Bound } from "../util/bound";

export class Cluster {
  generate(features: Feature[], ctx: CanvasRenderingContext2D, projection: Projection = new WebMercator(), extent: Bound = projection.bound) {
    return [];
  }
}