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
import { ClusterSymbol, LetterSymbol, SimpleMarkerSymbol, SimplePointSymbol, VertexSymbol } from "../symbol/symbol";
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
            if (symbol instanceof SimplePointSymbol) {
                ctx.save();
                ctx.strokeStyle = symbol.strokeStyle;
                ctx.fillStyle = symbol.fillStyle;
                ctx.lineWidth = symbol.lineWidth;
                ctx.beginPath(); //Start path
                //keep size
                //地理坐标 转回 屏幕坐标
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.arc(this._screenX, this._screenY, symbol.radius, 0, Math.PI * 2, true);
                ctx.fill();
                ctx.stroke();
                ctx.restore();
            }
            else if (symbol instanceof SimpleMarkerSymbol) {
                const marker = symbol;
                if (!marker.loaded)
                    yield marker.load();
                if (marker.icon) {
                    ctx.save();
                    const matrix = ctx.getTransform();
                    //keep size
                    ctx.setTransform(1, 0, 0, 1, 0, 0);
                    ctx.drawImage(marker.icon, this._screenX + marker.offsetX, this._screenY + marker.offsetY, marker.width, marker.height);
                    ctx.restore();
                }
            }
            else if (symbol instanceof LetterSymbol) {
                const letter = symbol;
                ctx.save();
                ctx.strokeStyle = letter.strokeStyle;
                ctx.fillStyle = letter.fillStyle;
                ctx.lineWidth = letter.lineWidth;
                ctx.beginPath(); //Start path
                //keep size
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.arc(this._screenX, this._screenY, letter.radius, 0, Math.PI * 2, true);
                ctx.fill();
                ctx.stroke();
                ctx.textBaseline = "middle";
                ctx.textAlign = "center";
                ctx.fillStyle = letter.fontColor;
                ctx.font = letter.fontSize + "px/1 " + letter.fontFamily + " " + letter.fontWeight;
                ctx.fillText(letter.letter, this._screenX, this._screenY);
                ctx.restore();
            }
            else if (symbol instanceof VertexSymbol) {
                ctx.save();
                ctx.strokeStyle = symbol.strokeStyle;
                ctx.fillStyle = symbol.fillStyle;
                ctx.lineWidth = symbol.lineWidth;
                ctx.beginPath(); //Start path
                //keep size
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                const size = symbol.size;
                ctx.rect(this._screenX - size / 2, this._screenY - size / 2, size, size);
                ctx.fill();
                ctx.stroke();
                ctx.restore();
            }
            else if (symbol instanceof ClusterSymbol) {
                const cluster = symbol;
                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.strokeStyle = cluster.strokeStyle;
                ctx.fillStyle = cluster.outerFillStyle;
                ctx.lineWidth = cluster.lineWidth;
                ctx.beginPath(); //Start path
                //keep size
                ctx.arc(this._screenX, this._screenY, cluster.outer, 0, Math.PI * 2, true);
                ctx.fill();
                ctx.stroke();
                ctx.fillStyle = cluster.innerFillStyle;
                ctx.beginPath(); //Start path
                //keep size
                ctx.arc(this._screenX, this._screenY, cluster.inner, 0, Math.PI * 2, true);
                ctx.fill();
                ctx.stroke();
                ctx.textBaseline = "middle";
                ctx.textAlign = "center";
                ctx.fillStyle = cluster.fontColor;
                ctx.font = cluster.fontSize + "px/1 " + cluster.fontFamily + " " + cluster.fontWeight;
                ctx.fillText(cluster.text, this._screenX, this._screenY);
                ctx.restore();
            }
        });
    }
    ;
    contain(screenX, screenY) {
        if (this._symbol instanceof SimplePointSymbol) {
            return Math.sqrt((this._screenX - screenX) * (this._screenX - screenX) + (this._screenY - screenY) * (this._screenY - screenY)) <= this._symbol.radius;
        }
        else if (this._symbol instanceof SimpleMarkerSymbol) {
            return screenX >= (this._screenX + this._symbol.offsetX) && screenX <= (this._screenX + this._symbol.offsetX + this._symbol.width) && screenY >= (this._screenY + this._symbol.offsetY) && screenY <= (this._screenY + this._symbol.offsetY + this._symbol.height);
        }
        else if (this._symbol instanceof LetterSymbol) {
            return Math.sqrt((this._screenX - screenX) * (this._screenX - screenX) + (this._screenY - screenY) * (this._screenY - screenY)) <= this._symbol.radius;
        }
        else if (this._symbol instanceof VertexSymbol) {
            return screenX >= (this._screenX - this._symbol.size / 2) && screenX <= (this._screenX + this._symbol.size / 2) && screenY >= (this._screenY - this._symbol.size / 2) && screenY <= (this._screenY + this._symbol.size / 2);
        }
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
