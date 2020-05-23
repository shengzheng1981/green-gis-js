export class ClassRendererItem {
}
export class ClassRenderer {
    constructor() {
        this._items = [];
    }
    get field() {
        return this._field;
    }
    get items() {
        return this._items;
    }
    generate(featureClass, field, breaks) {
        this._field = field;
        this._items = [];
        //TODO auto class break
    }
}
