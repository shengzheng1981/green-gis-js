import {SimpleFillSymbol, SimpleLineSymbol, SimplePointSymbol, Symbol} from "../symbol/symbol";
import {Field} from "../data/field";
import {FeatureClass} from "../data/feature-class";
import {GeometryType} from "../geometry/geometry";

export class ClassRendererItem {
    low: number;
    high: number;
    symbol: Symbol;
    label: string;
}

export class ClassRenderer {
    private _field: Field;
    private _items: ClassRendererItem[] = [];

    get field(): Field {
        return this._field;
    }
    get items(): ClassRendererItem[] {
        return this._items;
    }

    generate(featureClass: FeatureClass, field: Field, breaks: number) {
        this._field = field;
        this._items = [];
        //TODO auto class break
    }
}