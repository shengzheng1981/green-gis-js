import { Layer } from "./layer";
import { WebMecator } from "../projection/web-mecator";
export class GraphicLayer extends Layer {
    constructor() {
        super(...arguments);
        this._graphics = [];
    }
    add(graphic) {
        this._graphics.push(graphic);
    }
    remove(graphic) {
        const index = this._graphics.findIndex(item => item === graphic);
        index != -1 && this._graphics.splice(index, 1);
    }
    clear() {
        this._graphics = [];
    }
    draw(ctx, projection = new WebMecator(), extent = projection.bound, zoom = 10) {
        if (this.visible) {
            this._graphics.forEach((graphic) => {
                graphic.draw(ctx, projection, extent);
            });
        }
    }
}
