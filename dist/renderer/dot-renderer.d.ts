import { Field } from "../data/field";
/**
 * 点半径渲染
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
}
