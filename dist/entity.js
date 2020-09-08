/**
 * 实体基类（保留）
 */
export class Entity {
    /**
     * 创建实体
     */
    constructor() {
        this._id = null;
        this.create();
    }
    /**
     * 全局唯一ID
     */
    get ID() {
        return this._id;
    }
    /**
     * 输出字符串
     */
    toString() {
        return this._id;
    }
    /**
     * 打印输出
     */
    print() {
        Object.keys(this).forEach(property => {
            console.log(property + ": " + this[property]);
        });
    }
    /**
     * 生成ID
     */
    create() {
        const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        this._id = timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
            return (Math.random() * 16 | 0).toString(16);
        }).toLowerCase();
    }
    /**
     * 浅复制
     */
    copy(entity) {
        Object.keys(this).forEach(property => {
            this[property] = entity[property];
        });
    }
}
