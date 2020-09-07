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
import { SimpleMarkerSymbol, SimplePointSymbol } from "../symbol/symbol";
import { WebMercator } from "../projection/web-mercator";
//点
export class MultiplePoint extends Geometry {
    constructor(lnglats) {
        super();
        this._lnglats = lnglats;
    }
    ;
    toGeoJSON() {
        return {
            "type": "MultiPoint",
            "coordinates": this._lnglats
        };
    }
    project(projection) {
        this._projection = projection;
        this._coordinates = this._lnglats.map((point) => this._projection.project(point));
        let xmin = Number.MAX_VALUE, ymin = Number.MAX_VALUE, xmax = -Number.MAX_VALUE, ymax = -Number.MAX_VALUE;
        this._coordinates.forEach(point => {
            xmin = Math.min(xmin, point[0]);
            ymin = Math.min(ymin, point[1]);
            xmax = Math.max(xmax, point[0]);
            ymax = Math.max(ymax, point[1]);
        });
        this._bound = new Bound(xmin, ymin, xmax, ymax);
    }
    draw(ctx, projection = new WebMercator(), extent = projection.bound, symbol = new SimplePointSymbol()) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._projected)
                this.project(projection);
            if (!extent.intersect(this._bound))
                return;
            const matrix = ctx.getTransform();
            this._screen = [];
            this._symbol = symbol;
            this._coordinates.forEach((point) => {
                const screenX = (matrix.a * point[0] + matrix.e), screenY = (matrix.d * point[1] + matrix.f);
                this._screen.push([screenX, screenY]);
                this._symbol.draw(ctx, screenX, screenY);
            });
        });
    }
    ;
    contain(screenX, screenY) {
        return this._screen.some((point) => {
            if (this._symbol instanceof SimplePointSymbol) {
                return Math.sqrt((point[0] - screenX) * (point[0] - screenX) + (point[1] - screenY) * (point[1] - screenY)) <= this._symbol.radius;
            }
            else if (this._symbol instanceof SimpleMarkerSymbol) {
                return screenX >= (point[0] - this._symbol.offsetX) && screenX <= (point[0] - this._symbol.offsetX + this._symbol.width) && screenY >= (point[1] - this._symbol.offsetY) && screenY <= (point[1] - this._symbol.offsetY + this._symbol.height);
            }
        });
    }
    //TODO: now return first point center
    getCenter(type = CoordinateType.Latlng, projection = new WebMercator()) {
        if (!this._projected)
            this.project(projection);
        if (type = CoordinateType.Latlng) {
            return [this._lnglats[0][0], this._lnglats[0][1]];
        }
        else {
            return [this._coordinates[0][0], this._coordinates[0][1]];
        }
    }
}
//such as [[1,1],[2,2]]
//interaction: hover && identify
MultiplePoint.TOLERANCE = 0; //screen pixel
