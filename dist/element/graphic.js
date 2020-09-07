import { WebMercator } from "../projection/web-mercator";
import { Subject } from "../util/subject";
export class Graphic extends Subject {
    /*private _animation: Animation;
    get animation(): Animation {
        return this._animation;
    }
    set animation(value: Animation) {
        this._animation = value;
    }*/
    constructor(geometry, symbol) {
        super(["click", "dblclick", "mouseover", "mouseout", "dragstart"]);
        this.visible = true;
        this._geometry = geometry;
        this._symbol = symbol;
    }
    get bound() {
        return this._geometry ? this._geometry.bound : null;
    }
    get geometry() {
        return this._geometry;
    }
    get symbol() {
        return this._symbol;
    }
    set symbol(value) {
        this._symbol = value;
    }
    draw(ctx, projection = new WebMercator(), extent = projection.bound) {
        if (this.visible)
            this._geometry.draw(ctx, projection, extent, this._symbol);
    }
    /*animate(elapsed, ctx: CanvasRenderingContext2D, projection: Projection = new WebMercator(), extent: Bound = projection.bound) {
        if (this.visible) this._geometry.animate(elapsed, ctx, projection, extent, this._animation);
    }*/
    intersect(projection = new WebMercator(), extent = projection.bound) {
        if (this.visible)
            return this._geometry.intersect(projection, extent);
    }
    contain(screenX, screenY, event = undefined) {
        if (this.visible) {
            const flag = this._geometry.contain(screenX, screenY);
            if (event == "mousemove") {
                if (!this._contained && flag) {
                    this.emit("mouseover", { feature: this, screenX: screenX, screenY: screenY });
                }
                else if (this._contained && !flag) {
                    this.emit("mouseout", { feature: this, screenX: screenX, screenY: screenY });
                }
            }
            this._contained = flag;
            return flag;
        }
    }
}
