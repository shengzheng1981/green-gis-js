import {Geometry} from "./geometry";
import {Bound} from "../util/bound";
import {Projection} from "../projection/projection";
import {SimpleLineSymbol, Symbol} from "../symbol/symbol";
import {WebMecator} from "../projection/web-mecator";
//线
export class Polyline extends Geometry{

    //interaction: hover && identify
    static TOLERANCE: number = 4; //screen pixel
    private _tolerance: number = 4; //TOLERANCE + symbol.lineWidth

    //经纬度
    private _lnglats: number[][];
    //平面坐标
    private _coordinates: number[][];
    //屏幕坐标
    private _screen: number[][];

    constructor(lnglats: number[][]) {
        super();
        this._lnglats = lnglats;
    };

    project(projection: Projection) {
        this._projection = projection;
        this._coordinates = this._lnglats.map( (point: any) => this._projection.project(point));

        let xmin = Number.MAX_VALUE, ymin = Number.MAX_VALUE, xmax = -Number.MAX_VALUE, ymax = -Number.MAX_VALUE;
        this._coordinates.forEach( point => {
            xmin = Math.min(xmin, point[0]);
            ymin = Math.min(ymin, point[1]);
            xmax = Math.max(xmax, point[0]);
            ymax = Math.max(ymax, point[1]);
        });
        this._bound = new Bound(xmin, ymin, xmax, ymax);
    }

    draw(ctx: CanvasRenderingContext2D, projection: Projection = new WebMecator(), extent: Bound = projection.bound, symbol: Symbol = new SimpleLineSymbol()) {
        if (!this._projected) this.project(projection);
        if (!extent.intersect(this._bound)) return;
        ctx.save();
        ctx.strokeStyle = (symbol as SimpleLineSymbol).strokeStyle;
        ctx.lineWidth = (symbol as SimpleLineSymbol).lineWidth;
        this._tolerance = Polyline.TOLERANCE + (symbol as SimpleLineSymbol).lineWidth;
        ctx.beginPath();
        const matrix = (ctx as any).getTransform();
        //keep lineWidth
        ctx.setTransform(1,0,0,1,0,0);
        //TODO:  exceeding the maximum extent(bound), best way is overlap by extent. find out: maximum is [-PI*R, PI*R]??
        this._screen = [];
        this._coordinates.forEach( (point: any,index) => {
            const screenX = (matrix.a * point[0] + matrix.e), screenY = (matrix.d * point[1] + matrix.f);
            if (index === 0){
                ctx.moveTo(screenX, screenY);
            } else {
                ctx.lineTo(screenX, screenY);
            }
            this._screen.push([screenX, screenY]);
        });
        ctx.stroke();
        ctx.restore();
    }

    contain(screenX: number, screenY: number): boolean {
        let p2;
        const distance = this._screen.reduce( (acc, cur) => {
            if (p2) {
                const p1 = p2;
                p2 = cur;
                return Math.min(acc, this._distanceToSegment([screenX, screenY], p1, p2));
            } else {
                p2 = cur;
                return acc;
            }
        }, Number.MAX_VALUE);
        return distance <= this._tolerance;
    }

    //from Leaflet
    _distanceToSegment(p, p1, p2) {
        let x = p1[0],
            y = p1[1],
            dx = p2[0] - x,
            dy = p2[1] - y,
            dot = dx * dx + dy * dy,
            t;

        if (dot > 0) {
            t = ((p[0] - x) * dx + (p[1] - y) * dy) / dot;

            if (t > 1) {
                x = p2[0];
                y = p2[1];
            } else if (t > 0) {
                x += dx * t;
                y += dy * t;
            }
        }

        dx = p[0] - x;
        dy = p[1] - y;

        return Math.sqrt(dx * dx + dy * dy);
    }

}