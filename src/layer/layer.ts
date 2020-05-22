import {Projection} from "../projection/projection";
import {WebMecator} from "../projection/web-mecator";
import {Bound} from "../util/bound";

export class Layer{
    name: string;
    description: string;
    protected _visible: boolean = true;
    get visible() : boolean {
        return this._visible;
    }
    set visible(value: boolean) {
        this._visible = value;
    }

    draw(ctx: CanvasRenderingContext2D, projection: Projection = new WebMecator(), extent: Bound = projection.bound, zoom: number = 10) {};
}