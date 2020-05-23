import { Bound } from "../util/bound";
export declare class WebMecator {
    static R: number;
    get bound(): Bound;
    project([lng, lat]: [any, any]): number[];
    unproject([x, y]: [any, any]): number[];
}
