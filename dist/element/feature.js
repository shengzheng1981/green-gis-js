import { SimplePointSymbol, SimpleTextSymbol } from "../symbol/symbol";
import { WebMercator } from "../projection/web-mercator";
import { Subject } from "../util/subject";
export class Feature extends Subject {
    constructor(geometry, properties, symbol) {
        super(["click", "dblclick", "mouseover", "mouseout"]);
        this.visible = true;
        this._geometry = geometry;
        this._properties = properties;
        this._symbol = symbol;
    }
    get symbol() {
        return this._symbol;
    }
    get geometry() {
        return this._geometry;
    }
    get properties() {
        return this._properties;
    }
    get bound() {
        return this._geometry ? this._geometry.bound : null;
    }
    get edited() {
        return this._edited;
    }
    set edited(value) {
        this._edited = value;
    }
    draw(ctx, projection = new WebMercator(), extent = projection.bound, symbol = new SimplePointSymbol()) {
        if (this.visible)
            this._geometry.draw(ctx, projection, extent, this._symbol || symbol);
    }
    label(field, ctx, projection = new WebMercator(), extent = projection.bound, symbol = new SimpleTextSymbol()) {
        if (this.visible)
            this._geometry.label(this._properties[field.name], ctx, projection, extent, symbol);
    }
    intersect(projection = new WebMercator(), extent = projection.bound) {
        if (this.visible)
            return this._geometry.intersect(projection, extent);
    }
    contain(screenX, screenY, event = undefined) {
        if (this.visible) {
            const flag = this._geometry.contain(screenX, screenY);
            if (event == "mousemove") {
                if (!this._contained && flag) {
                    this._handlers["mouseover"].forEach(handler => handler({ feature: this, screenX: screenX, screenY: screenY }));
                }
                else if (this._contained && !flag) {
                    this._handlers["mouseout"].forEach(handler => handler({ feature: this, screenX: screenX, screenY: screenY }));
                }
            }
            this._contained = flag;
            return flag;
        }
    }
}
