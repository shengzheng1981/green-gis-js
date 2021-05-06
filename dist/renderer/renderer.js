import { SimplePointSymbol } from "../symbol/symbol";
export class Renderer {
    getSymbol(feature) { return new SimplePointSymbol(); }
}
