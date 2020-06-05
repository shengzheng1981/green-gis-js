export declare class Tooltip {
    private _map;
    private _tooltipContainer;
    private _tooltipArrow;
    private _tooltipText;
    constructor(map: any);
    show(text: string | HTMLElement, screenX: any, screenY: any): void;
    hide(): void;
}
