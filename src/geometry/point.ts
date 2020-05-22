import {Geometry} from "./geometry";
import {Bound} from "../util/bound";
import {Projection} from "../projection/projection";
import {SimpleMarkerSymbol, SimplePointSymbol, Symbol} from "../symbol/symbol";
import {WebMecator} from "../projection/web-mecator";

//点
export class Point extends Geometry{

    //interaction: hover && identify
    static TOLERANCE: number = 0; //screen pixel
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

    constructor(lng: number, lat: number) {
        super();
        this._lng = lng;
        this._lat = lat;
    };

    project(projection: Projection) {
        this._projection = projection;
        [this._x, this._y] = this._projection.project([this._lng, this._lat]);
        //TODO: bound tolerance
        this._bound = new Bound(this._x, this._y, this._x, this._y);
        this._projected = true;
    }

    async draw(ctx: CanvasRenderingContext2D, projection: Projection = new WebMecator(), extent: Bound = projection.bound, symbol: Symbol = new SimplePointSymbol()) {
        if (!this._projected) this.project(projection);
        if (!extent.intersect(this._bound)) return;
        ctx.save();
        const matrix = (ctx as any).getTransform();
        this._screenX = (matrix.a * this._x + matrix.e);
        this._screenY = (matrix.d * this._y + matrix.f);
        this._symbol = symbol;
        if (symbol instanceof SimplePointSymbol) {
            ctx.strokeStyle = (symbol as SimplePointSymbol).strokeStyle;
            ctx.fillStyle = (symbol as SimplePointSymbol).fillStyle;
            ctx.lineWidth = (symbol as SimplePointSymbol).lineWidth;
            ctx.beginPath(); //Start path
            //keep size
            ctx.setTransform(1,0,0,1,0,0);
            ctx.arc(this._screenX, this._screenY, (symbol as SimplePointSymbol).radius, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.stroke();
        } else if (symbol instanceof SimpleMarkerSymbol) {
            const marker: SimpleMarkerSymbol = symbol;
            if (!marker.loaded) await marker.load();
            if (marker.icon) {
                const matrix = (ctx as any).getTransform();
                //keep size
                ctx.setTransform(1,0,0,1,0,0);
                ctx.drawImage(marker.icon, this._screenX - marker.offsetX, this._screenY - marker.offsetY, marker.width, marker.height);
            }
        }
        ctx.restore();
    };

    contain(screenX: number, screenY: number): boolean {
        if (this._symbol instanceof SimplePointSymbol) {
            return Math.sqrt((this._screenX - screenX) *  (this._screenX - screenX) +  (this._screenY - screenY) *  (this._screenY - screenY)) <= (this._symbol as SimplePointSymbol).radius;
        } else if (this._symbol instanceof SimpleMarkerSymbol) {
            return screenX >= (this._screenX - this._symbol.offsetX) &&  screenX <= (this._screenX - this._symbol.offsetX + this._symbol.width) && screenY >= (this._screenY - this._symbol.offsetY) &&  screenY <= (this._screenY - this._symbol.offsetY + this._symbol.height);
        }
    }

}