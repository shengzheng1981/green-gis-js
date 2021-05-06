/**
 * 渲染方式基类
 */
import {Feature} from "../element/feature";
import {SimplePointSymbol, Symbol} from "../symbol/symbol";

export class Renderer {
    getSymbol(feature: Feature): Symbol { return new SimplePointSymbol(); }
}