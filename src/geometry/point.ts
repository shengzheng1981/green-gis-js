import {CoordinateType, Geometry} from "./geometry";
import {Bound} from "../util/bound";
import {Projection} from "../projection/projection";
import {
    PointSymbol,
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
    private _symbol: PointSymbol; //TOLERANCE + symbol.radius

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

    async draw(ctx: CanvasRenderingContext2D, projection: Projection = new WebMercator(), extent: Bound = projection.bound, symbol: PointSymbol = new SimplePointSymbol()) {
        if (!this._projected) this.project(projection);
        if (!extent.intersect(this._bound)) return;
        const matrix = (ctx as any).getTransform();
        this._screenX = (matrix.a * this._x + matrix.e);
        this._screenY = (matrix.d * this._y + matrix.f);
        this._symbol = symbol;
        this._symbol.draw(ctx, this._screenX, this._screenY);
    };

    contain(screenX: number, screenY: number): boolean {
        return this._symbol ? this._symbol.contain(this._screenX, this._screenY, screenX, screenY) : false;
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