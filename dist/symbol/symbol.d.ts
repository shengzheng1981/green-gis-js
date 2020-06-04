export declare class Symbol {
}
export declare class SimplePointSymbol extends Symbol {
    radius: number;
    lineWidth: number;
    strokeStyle: string;
    fillStyle: string;
}
export declare class SimpleLineSymbol extends Symbol {
    lineWidth: number;
    strokeStyle: string;
}
export declare class SimpleFillSymbol extends Symbol {
    lineWidth: number;
    strokeStyle: string;
    fillStyle: string;
}
export declare class SimpleMarkerSymbol extends Symbol {
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
    icon: ImageBitmap;
    url: string;
    private _loaded;
    get loaded(): boolean;
    load(): Promise<any>;
}
export declare class SimpleTextSymbol extends Symbol {
    lineWidth: number;
    strokeStyle: string;
    fillStyle: string;
    offsetX: number;
    offsetY: number;
    padding: number;
    fontColor: string;
    fontSize: number;
    fontFamily: string;
    fontWeight: string;
}
export declare class LetterSymbol extends Symbol {
    radius: number;
    lineWidth: number;
    strokeStyle: string;
    fillStyle: string;
    letter: string;
    fontColor: string;
    fontSize: number;
    fontFamily: string;
    fontWeight: string;
}
export declare class ArrowSymbol extends Symbol {
    lineWidth: number;
    strokeStyle: string;
    minLength: number;
    arrowLength: number;
    arrowAngle: number;
}
export declare class VertexSymbol extends Symbol {
    size: number;
    lineWidth: number;
    strokeStyle: string;
    fillStyle: string;
}
export declare class ClusterSymbol extends Symbol {
    private _count;
    radius: number;
    lineWidth: number;
    strokeStyle: string;
    outerFillStyle: string;
    fontColor: string;
    fontFamily: string;
    fontWeight: string;
    get text(): string;
    get inner(): number;
    get outer(): number;
    get fontSize(): number;
    get innerFillStyle(): string;
    constructor(count: number);
}
