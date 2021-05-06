/**
 * 渲染方式基类
 */
import { Feature } from "../element/feature";
import { Symbol } from "../symbol/symbol";
export declare class Renderer {
    getSymbol(feature: Feature): Symbol;
}
