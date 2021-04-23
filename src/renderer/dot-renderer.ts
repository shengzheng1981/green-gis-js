import {Field} from "../data/field";
import {Symbol} from "../symbol/symbol";

/**
 * 点半径渲染
 * @remarks
 * 只适用点图层
 */
export class DotRenderer {
    /**
     * 半径字段
     * @remarks
     * 数值字段
     */
    _field: Field;

    get field(): Field {
        return this._field;
    }
    set field(value: Field) {
        this._field = value;
    }

}