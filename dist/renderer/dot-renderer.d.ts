import { Field } from "../data/field";
import { Symbol } from "../symbol/symbol";
import { Feature } from "../element/feature";
/**
 * 点半径渲染
 * @remarks
 * 只适用点图层
 */
export declare class DotRenderer {
    /**
     * 半径字段
     * @remarks
     * 数值字段
     */
    _field: Field;
    get field(): Field;
    set field(value: Field);
    getSymbol(feature: Feature): Symbol;
}
