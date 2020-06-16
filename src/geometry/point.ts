import {CoordinateType, Geometry} from "./geometry";
import {Bound} from "../util/bound";
import {Projection} from "../projection/projection";
import {
    ClusterSymbol, LetterSymbol,
    SimpleMarkerSymbol,
    SimplePointSymbol,
    SimpleTextSymbol,
    Symbol,
    VertexSymbol
} from "../symbol/symbol";
import {WebMercator} from "../projection/web-mercator";

//点
export class Point extends Geometry{

    //bound
    static BOUND_TOLERANCE: number = 10;    //meter

    //interaction: hover && identify
    static INTERACTION_TOLERANCE: number = 0; //screen pixel
    private _symbol: Symbol; //TOLERANCE + symbol.radius

    //经纬度
    private _lng: number;
    private _lat: number;
    //平面坐标
    private _x: number;
    private _y: number;
    //屏幕坐标
    private _screenX: number;
    private _screenY: number;

    get lng(): number {
        return this._lng;
    }
    get lat(): number {
        return this._lat;
    }
    get x(): number {
        return this._x;
    }
    get y(): number {
        return this._y;
    }

    constructor(lng: number, lat: number) {
        super();
        this._lng = lng;
        this._lat = lat;
    };

    toGeoJSON() {
        return {
            "type": "Point",
            "coordinates": [this._lng, this._lat]
        }
    }

    project(projection: Projection) {
        this._projection = projection;
        [this._x, this._y] = this._projection.project([this._lng, this._lat]);
        //TODO: bound tolerance
        this._bound = new Bound(this._x, this._y, this._x, this._y);
        this._projected = true;
    }

    move(ctx: CanvasRenderingContext2D, projection: Projection, screenX: number, screenY: number) {
        const matrix = (ctx as any).getTransform();
        this._screenX = screenX;
        this._screenY = screenY;
        this._x = (this._screenX - matrix.e) / matrix.a;
        this._y = (this._screenY - matrix.f) / matrix.d;
        this._bound = new Bound(this._x, this._y, this._x, this._y);
        this._projection = projection;
        [this._lng, this._lat] = this._projection.unproject([this._x, this._y]);
        this._projected = true;
    }

    async draw(ctx: CanvasRenderingContext2D, projection: Projection = new WebMercator(), extent: Bound = projection.bound, symbol: Symbol = new SimplePointSymbol()) {
        if (!this._projected) this.project(projection);
        if (!extent.intersect(this._bound)) return;

        const matrix = (ctx as any).getTransform();
        this._screenX = (matrix.a * this._x + matrix.e);
        this._screenY = (matrix.d * this._y + matrix.f);
        this._symbol = symbol;
        if (symbol instanceof SimplePointSymbol) {
            ctx.save();
            ctx.strokeStyle = (symbol as SimplePointSymbol).strokeStyle;
            ctx.fillStyle = (symbol as SimplePointSymbol).fillStyle;
            ctx.lineWidth = (symbol as SimplePointSymbol).lineWidth;
            ctx.beginPath(); //Start path
            //keep size
            ctx.setTransform(1,0,0,1,0,0);
            ctx.arc(this._screenX, this._screenY, (symbol as SimplePointSymbol).radius, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        } else if (symbol instanceof SimpleMarkerSymbol) {
            const marker: SimpleMarkerSymbol = symbol;
            if (!marker.loaded) await marker.load();
            if (marker.icon) {
                ctx.save();
                const matrix = (ctx as any).getTransform();
                //keep size
                ctx.setTransform(1,0,0,1,0,0);
                ctx.drawImage(marker.icon, this._screenX + marker.offsetX, this._screenY + marker.offsetY, marker.width, marker.height);
                ctx.restore();
            }
        } else if (symbol instanceof LetterSymbol) {
            const letter: LetterSymbol = symbol;
            ctx.save();
            ctx.strokeStyle = letter.strokeStyle;
            ctx.fillStyle = letter.fillStyle;
            ctx.lineWidth = letter.lineWidth;
            ctx.beginPath(); //Start path
            //keep size
            ctx.setTransform(1,0,0,1,0,0);
            ctx.arc(this._screenX, this._screenY, letter.radius, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.stroke();
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.fillStyle = letter.fontColor;
            ctx.font =  letter.fontSize + "px/1 " + letter.fontFamily +  " " + letter.fontWeight;
            ctx.fillText(letter.letter, this._screenX, this._screenY);
            ctx.restore();
        } else if (symbol instanceof VertexSymbol) {
            ctx.save();
            ctx.strokeStyle = (symbol as VertexSymbol).strokeStyle;
            ctx.fillStyle = (symbol as VertexSymbol).fillStyle;
            ctx.lineWidth = (symbol as VertexSymbol).lineWidth;
            ctx.beginPath(); //Start path
            //keep size
            ctx.setTransform(1,0,0,1,0,0);
            const size = (symbol as VertexSymbol).size;
            ctx.rect(this._screenX - size/2, this._screenY - size/2, size, size);
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        } else if (symbol instanceof ClusterSymbol) {
            const cluster: ClusterSymbol = symbol;
            ctx.save();
            ctx.setTransform(1,0,0,1,0,0);
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
            ctx.font =  cluster.fontSize + "px/1 " + cluster.fontFamily +  " " + cluster.fontWeight;
            ctx.fillText(cluster.text, this._screenX, this._screenY);
            ctx.restore();
        }
    };

    contain(screenX: number, screenY: number): boolean {
        if (this._symbol instanceof SimplePointSymbol) {
            return Math.sqrt((this._screenX - screenX) *  (this._screenX - screenX) +  (this._screenY - screenY) *  (this._screenY - screenY)) <= (this._symbol as SimplePointSymbol).radius;
        } else if (this._symbol instanceof SimpleMarkerSymbol) {
            return screenX >= (this._screenX + this._symbol.offsetX) &&  screenX <= (this._screenX + this._symbol.offsetX + this._symbol.width) && screenY >= (this._screenY + this._symbol.offsetY) &&  screenY <= (this._screenY + this._symbol.offsetY + this._symbol.height);
        } else if (this._symbol instanceof LetterSymbol) {
            return Math.sqrt((this._screenX - screenX) *  (this._screenX - screenX) +  (this._screenY - screenY) *  (this._screenY - screenY)) <= (this._symbol as LetterSymbol).radius;
        } else if (this._symbol instanceof VertexSymbol) {
            return screenX >= (this._screenX - this._symbol.size / 2) &&  screenX <= (this._screenX + this._symbol.size / 2) && screenY >= (this._screenY - this._symbol.size / 2) &&  screenY <= (this._screenY + this._symbol.size / 2);
        }
    }

    getCenter(type: CoordinateType = CoordinateType.Latlng, projection: Projection = new WebMercator()) {
        if (!this._projected) this.project(projection);
        if (type === CoordinateType.Latlng) {
            return [this._lng, this._lat];
        } else {
            return [this._x, this._y];
        }
    }
}