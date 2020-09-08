/**
 * 实体基类（保留）
 */
export declare class Entity {
    private _id;
    /**
     * 全局唯一ID
     */
    get ID(): string;
    /**
     * 创建实体
     */
    constructor();
    /**
     * 输出字符串
     */
    toString(): string;
    /**
     * 打印输出
     */
    print(): void;
    /**
     * 生成ID
     */
    create(): void;
    /**
     * 浅复制
     */
    copy(entity: Entity): void;
}
