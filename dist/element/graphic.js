import { WebMecator } from "../projection/web-mecator";
export class Graphic {
    constructor(geometry, symbol) {
        this.visible = true;
        this._geometry = geometry;
        this._symbol = symbol;
    }
    get bound() {
        return this._geometry ? this._geometry.bound : null;
    }
    draw(ctx, projection = new WebMecator(), extent = projection.bound) {
        if (this.visible)
            this._geometry.draw(ctx, projection, extent, this._symbol);
    }
}
