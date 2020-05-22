
//实体基类
export class Entity {

    private _id: string = null;

    get ID(): string {
        return this._id;
    }

    constructor() {
        this.create();
    }

    toString(): string {
        return this._id;
    }

    print() {
        Object.keys(this).forEach( property => {
            console.log(property + ": " + this[property]);
        });
    }

    create() {
        const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        this._id = timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
            return (Math.random() * 16 | 0).toString(16);
        }).toLowerCase();
    }

}


