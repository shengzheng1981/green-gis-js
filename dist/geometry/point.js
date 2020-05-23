var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Geometry } from "./geometry";
import { Bound } from "../util/bound";
import { SimpleMarkerSymbol, SimplePointSymbol } from "../symbol/symbol";
import { WebMecator } from "../projection/web-mecator";
//点
export class Point extends Geometry {
    constructor(lng, lat) {
        super();
        this._lng = lng;
        this._lat = lat;
    }
    ;
    project(projection) {
        this._projection = projection;
        [this._x, this._y] = this._projection.project([this._lng, this._lat]);
        //TODO: bound tolerance
        this._bound = new Bound(this._x, this._y, this._x, this._y);
        this._projected = true;
    }
    draw(ctx, projection = new WebMecator(), extent = projection.bound, symbol = new SimplePointSymbol()) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._projected)
                this.project(projection);
            if (!extent.intersect(this._bound))
                return;
            ctx.save();
            const matrix = ctx.getTransform();
            this._screenX = (matrix.a * this._x + matrix.e);
            this._screenY = (matrix.d * this._y + matrix.f);
            this._symbol = symbol;
            if (symbol instanceof SimplePointSymbol) {
                ctx.strokeStyle = symbol.strokeStyle;
                ctx.fillStyle = symbol.fillStyle;
                ctx.lineWidth = symbol.lineWidth;
                ctx.beginPath(); //Start path
                //keep size
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.arc(this._screenX, this._screenY, symbol.radius, 0, Math.PI * 2, true);
                ctx.fill();
                ctx.stroke();
            }
            else if (symbol instanceof SimpleMarkerSymbol) {
                const marker = symbol;
                if (!marker.loaded)
                    yield marker.load();
                if (marker.icon) {
                    const matrix = ctx.getTransform();
                    //keep size
                    ctx.setTransform(1, 0, 0, 1, 0, 0);
                    ctx.drawImage(marker.icon, this._screenX - marker.offsetX, this._screenY - marker.offsetY, marker.width, marker.height);
                }
            }
            ctx.restore();
        });
    }
    ;
    contain(screenX, screenY) {
        if (this._symbol instanceof SimplePointSymbol) {
            return Math.sqrt((this._screenX - screenX) * (this._screenX - screenX) + (this._screenY - screenY) * (this._screenY - screenY)) <= this._symbol.radius;
        }
        else if (this._symbol instanceof SimpleMarkerSymbol) {
            return screenX >= (this._screenX - this._symbol.offsetX) && screenX <= (this._screenX - this._symbol.offsetX + this._symbol.width) && screenY >= (this._screenY - this._symbol.offsetY) && screenY <= (this._screenY - this._symbol.offsetY + this._symbol.height);
        }
    }
}
//interaction: hover && identify
Point.TOLERANCE = 0; //screen pixel
