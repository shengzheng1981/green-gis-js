export declare class Entity {
    private _id;
    get ID(): string;
    constructor();
    toString(): string;
    print(): void;
    create(): void;
    copy(entity: Entity): void;
}
