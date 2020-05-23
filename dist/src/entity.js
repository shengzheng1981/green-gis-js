//实体基类
export class Entity {
    constructor() {
        this._id = null;
        this.create();
    }
    get ID() {
        return this._id;
    }
    toString() {
        return this._id;
    }
    print() {
        Object.keys(this).forEach(property => {
            console.log(property + ": " + this[property]);
        });
    }
    create() {
        const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        this._id = timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
            return (Math.random() * 16 | 0).toString(16);
        }).toLowerCase();
    }
}
