import {CoordinateType} from "../geometry/geometry";
import {Projection} from "../projection/projection";
import {WebMercator} from "../projection/web-mercator";
import {Feature} from "../element/feature";
import {SimpleTextSymbol} from "../symbol/symbol";
import {Field} from "../data/field";
import {Bound} from "../util/bound";

//碰撞冲突
export class Collision {
    test(features: Feature[], field: Field, symbol: SimpleTextSymbol, ctx: CanvasRenderingContext2D, projection: Projection = new WebMercator()): Feature[] { return []; }
}

export class NullCollision {
    test(features: Feature[], field: Field, symbol: SimpleTextSymbol, ctx: CanvasRenderingContext2D, projection: Projection = new WebMercator()): Feature[] {
        return features;
    }
}

//简单碰撞冲突  距离判断
export class SimpleCollision {
    public distance: number = 50; //pixel
    test(features: Feature[], field: Field, symbol: SimpleTextSymbol, ctx: CanvasRenderingContext2D, projection: Projection = new WebMercator()): Feature[] {
        return features.reduce( (acc, cur) => {
            const item: any = acc.find((item: any) => {
                const distance = cur.geometry.distance(item.geometry, CoordinateType.Screen, ctx, projection);
                return distance <= this.distance;
            });
            if (!item) acc.push(cur);
            return acc;
        }, []); // [feature]
    }
}

//叠盖碰撞冲突  叠盖判断
export class CoverCollision {
    //drawn label bounds
    private _bounds: Bound[] = [];
    public buffer: number = 10; //pixel
    test(features: Feature[], field: Field, symbol: SimpleTextSymbol, ctx: CanvasRenderingContext2D, projection: Projection = new WebMercator()): Feature[] {
        if (!field || !symbol) return [];
        this._bounds = [];
        const measure = (feature, symbol) => {
            const bound = feature.geometry.measure(feature.properties[field.name], ctx, projection, symbol);
            bound.buffer(this.buffer);
            if (bound) {
                const item = this._bounds.find( item => item.intersect(bound) );
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
            } else {
                if (count == 0) {
                    return [null, null];
                } else {
                    count -= 1;
                    return replace(feature, symbol2, count);
                }
            }
        };
        return features.reduce( (acc, cur) => {
            cur.text = null;
            let bound = measure(cur, symbol);
            if (bound) {
                acc.push(cur);
                this._bounds.push(bound);
            } else {
                if (symbol.auto) {
                    const [bound, symbol2] = replace(cur, symbol, 3);    //一共4个方向，再测试剩余3个方向
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