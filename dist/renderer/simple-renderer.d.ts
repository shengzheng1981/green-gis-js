import { Symbol } from "../symbol/symbol";
import { Feature } from "../element/feature";
/**
 * 单一渲染
 */
export declare class SimpleRenderer {
    /**
     * 单一渲染符号
     */
    symbol: Symbol;
    getSymbol(feature: Feature): Symbol;
}
