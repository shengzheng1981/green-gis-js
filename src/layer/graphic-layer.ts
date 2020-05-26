import {Layer} from "./layer";
import {Graphic} from "../element/graphic";
import {Projection} from "../projection/projection";
import {WebMercator} from "../projection/web-mercator";
import {Bound} from "../util/bound";

export class GraphicLayer extends Layer{
    private _graphics: Graphic[] = [];

    add(graphic: Graphic) {
        this._graphics.push(graphic);
    }

    remove(graphic: Graphic) {
        const index = this._graphics.findIndex(item => item === graphic);
        index != -1 && this._graphics.splice(index, 1);
    }

    clear() {
        this._graphics = [];
    }

    draw(ctx: CanvasRenderingContext2D, projection: Projection = new WebMercator(), extent: Bound = projection.bound, zoom: number = 10) {
        if (this.visible) {
            this._graphics.forEach( (graphic: Graphic) => {
                graphic.draw(ctx, projection, extent);
            });
        }
    }

}
