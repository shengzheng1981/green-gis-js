var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CoordinateType, Geometry } from "./geometry";
import { Bound } from "../util/bound";
import { SimplePointSymbol } from "../symbol/symbol";
import { WebMercator } from "../projection/web-mercator";
//点
export class Point extends Geometry {
    constructor(lng, lat) {
        super();
        this._lng = lng;
        this._lat = lat;
    }
    get lng() {
        return this._lng;
    }
    get lat() {
        return this._lat;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    ;
    toGeoJSON() {
        return {
            "type": "Point",
            "coordinates": [this._lng, this._lat]
        };
    }
    project(projection) {
        this._projection = projection;
        [this._x, this._y] = this._projection.project([this._lng, this._lat]);
        //TODO: bound tolerance
        this._bound = new Bound(this._x, this._y, this._x, this._y);
        this._projected = true;
    }
    move(ctx, projection, screenX, screenY) {
        const matrix = ctx.getTransform();
        this._screenX = screenX;
        this._screenY = screenY;
        this._x = (this._screenX - matrix.e) / matrix.a;
        this._y = (this._screenY - matrix.f) / matrix.d;
        this._bound = new Bound(this._x, this._y, this._x, this._y);
        this._projection = projection;
        [this._lng, this._lat] = this._projection.unproject([this._x, this._y]);
        this._projected = true;
    }
    draw(ctx, projection = new WebMercator(), extent = projection.bound, symbol = new SimplePointSymbol()) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._projected)
                this.project(projection);
            if (!extent.intersect(this._bound))
                return;
            const matrix = ctx.getTransform();
            this._screenX = (matrix.a * this._x + matrix.e);
            this._screenY = (matrix.d * this._y + matrix.f);
            this._symbol = symbol;
            this._symbol.draw(ctx, this._screenX, this._screenY);
        });
    }
    ;
    /*animate(elapsed, ctx: CanvasRenderingContext2D, projection: Projection = new WebMercator(), extent: Bound = projection.bound, animation: Animation) {
        if (!this._projected) this.project(projection);
        if (!extent.intersect(this._bound)) return;
        const matrix = (ctx as any).getTransform();
        this._screenX = (matrix.a * this._x + matrix.e);
        this._screenY = (matrix.d * this._y + matrix.f);
        animation.animate(elapsed, ctx, this._screenX, this._screenY);
    };*/
    contain(screenX, screenY) {
        return this._symbol ? this._symbol.contain(this._screenX, this._screenY, screenX, screenY) : false;
    }
    getCenter(type = CoordinateType.Latlng, projection = new WebMercator()) {
        if (!this._projected)
            this.project(projection);
        if (type === CoordinateType.Latlng) {
            return [this._lng, this._lat];
        }
        else {
            return [this._x, this._y];
        }
    }
}
//bound
Point.BOUND_TOLERANCE = 10; //meter
//interaction: hover && identify
Point.INTERACTION_TOLERANCE = 0; //screen pixel
