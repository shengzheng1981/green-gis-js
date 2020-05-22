import { WebMecator } from "../projection/web-mecator";
export class Layer {
    constructor() {
        this._visible = true;
    }
    get visible() {
        return this._visible;
    }
    set visible(value) {
        this._visible = value;
    }
    draw(ctx, projection = new WebMecator(), extent = projection.bound, zoom = 10) { }
    ;
}
