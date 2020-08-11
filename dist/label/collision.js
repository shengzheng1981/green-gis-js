import { CoordinateType } from "../geometry/geometry";
import { WebMercator } from "../projection/web-mercator";
import { SimpleTextSymbol } from "../symbol/symbol";
//碰撞冲突
export class Collision {
    test(features, field, symbol, ctx, projection = new WebMercator()) { return []; }
}
export class NullCollision {
    test(features, field, symbol, ctx, projection = new WebMercator()) {
        return features;
    }
}
//简单碰撞冲突  距离判断
export class SimpleCollision {
    constructor() {
        this.distance = 50; //pixel
    }
    test(features, field, symbol, ctx, projection = new WebMercator()) {
        return features.reduce((acc, cur) => {
            const item = acc.find((item) => {
                const distance = cur.geometry.distance(item.geometry, CoordinateType.Screen, ctx, projection);
                return distance <= this.distance;
            });
            if (!item)
                acc.push(cur);
            return acc;
        }, []); // [feature]
    }
}
//叠盖碰撞冲突  叠盖判断
export class CoverCollision {
    constructor() {
        //drawn label bounds
        this._bounds = [];
        this.buffer = 10; //pixel
    }
    test(features, field, symbol, ctx, projection = new WebMercator()) {
        if (!field || !symbol)
            return [];
        this._bounds = [];
        const measure = (feature, symbol) => {
            const bound = feature.geometry.measure(feature.properties[field.name], ctx, projection, symbol);
            bound.buffer(this.buffer);
            if (bound) {
                const item = this._bounds.find(item => item.intersect(bound));
                if (!item) {
                    return bound;
                }
            }
            return null;
        };
        const replace = (feature, symbol, count) => {
            const symbol2 = new SimpleTextSymbol();
            symbol2.copy(symbol);
            symbol2.replacement();
            const bound = measure(feature, symbol2);
            if (bound) {
                return [bound, symbol2];
            }
            else {
                if (count == 0) {
                    return [null, null];
                }
                else {
                    count -= 1;
                    return replace(feature, symbol2, count);
                }
            }
        };
        return features.reduce((acc, cur) => {
            cur.text = null;
            let bound = measure(cur, symbol);
            if (bound) {
                acc.push(cur);
                this._bounds.push(bound);
            }
            else {
                if (symbol.auto) {
                    const [bound, symbol2] = replace(cur, symbol, 3); //一共4个方向，再测试剩余3个方向
                    if (bound) {
                        cur.text = symbol2;
                        acc.push(cur);
                        this._bounds.push(bound);
                    }
                }
            }
            return acc;
        }, []); // [feature]
    }
}
