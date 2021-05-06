import {SimplePointSymbol, Symbol} from "../symbol/symbol";
import {Feature} from "../element/feature";

/**
 * 单一渲染
 */
export class SimpleRenderer {
    /**
     * 单一渲染符号
     */
    public symbol: Symbol;

    getSymbol(feature: Feature): Symbol {
        return this.symbol;
    }
}