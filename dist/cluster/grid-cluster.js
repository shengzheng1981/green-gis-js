import { CoordinateType } from "../geometry/geometry";
import { WebMercator } from "../projection/web-mercator";
import { Bound } from "../util/bound";
export class GridCluster {
    constructor() {
        this.size = 10;
        this.distance = 50;
    }
    generate(features, ctx, projection = new WebMercator(), extent = projection.bound) {
        //创建grid
        const grids = [];
        const deltaX = (extent.xmax - extent.xmin) / this.size;
        const deltaY = (extent.ymax - extent.ymin) / this.size;
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                grids.push({
                    bound: new Bound(extent.xmin + row * deltaX, extent.ymin + col * deltaY, extent.xmin + (row + 1) * deltaX, extent.ymin + (col + 1) * deltaY),
                    features: [],
                    count: 0
                });
            }
        }
        //遍历匹配grid
        features.forEach(feature => {
            feature.geometry.project(projection);
            const grid = grids.find(item => item.bound.intersect(feature.geometry.bound));
            if (grid) {
                grid.features.push(feature);
                grid.feature = feature;
                grid.count += 1;
            }
        });
        //合并 相邻grid feature（太近） https://www.infoq.cn/article/oflois6dajqmjgyp3arh 
        return grids.filter(grid => grid.count > 0).reduce((acc, cur) => {
            const point = cur.feature.geometry;
            const item = acc.find((item) => {
                const d = point.distance(item.feature.geometry, CoordinateType.Screen, ctx, projection);
                return d <= this.distance;
            });
            if (item) {
                item.count += cur.count;
                item.features.concat(cur.features);
            }
            else {
                acc.push(cur);
            }
            return acc;
        }, []);
    }
}
