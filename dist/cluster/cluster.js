import { WebMercator } from "../projection/web-mercator";
export class Cluster {
    generate(features, ctx, projection = new WebMercator(), extent = projection.bound) {
        return [];
    }
}
