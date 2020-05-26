import { Bound } from "../util/bound";
export declare enum LatLngType {
    GPS = 0,
    GCJ02 = 1,
    BD09 = 2
}
export declare class Projection {
    project([lng, lat]: [any, any]): number[];
    unproject([x, y]: [any, any]): number[];
    get bound(): Bound;
}
