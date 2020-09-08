
/**
 * 实体基类（保留）
 */
export class Entity {

    private _id: string = null;
    /**
     * 全局唯一ID
     */
    get ID(): string {
        return this._id;
    }
    /**
     * 创建实体
     */
    constructor() {
        this.create();
    }
    /**
     * 输出字符串
     */
    toString(): string {
        return this._id;
    }
    /**
     * 打印输出
     */
    print() {
        Object.keys(this).forEach( property => {
            console.log(property + ": " + this[property]);
        });
    }
    /**
     * 生成ID
     */
    create() {
        const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        this._id = timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
            return (Math.random() * 16 | 0).toString(16);
        }).toLowerCase();
    }
    /**
     * 浅复制
     */
    copy(entity: Entity) {
        Object.keys(this).forEach( property => {
            this[property] = entity[property];
        });
    }

}


