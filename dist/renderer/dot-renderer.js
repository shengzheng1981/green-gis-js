import { SimplePointSymbol } from "../symbol/symbol";
/**
 * 点半径渲染
 * @remarks
 * 只适用点图层
 */
export class DotRenderer {
    get field() {
        return this._field;
    }
    set field(value) {
        this._field = value;
    }
    getSymbol(feature) {
        const symbol = new SimplePointSymbol();
        symbol.radius = Number(feature.properties[this.field.name] || 0);
        return symbol;
    }
}
