/**
 * 通用工具类
 * @remarks
 * 目前主要用于css样式管理维护
 * 当前代码来自leaflet
 */
export declare class Utility {
    /**
     * 添加css class
     * @remarks
     * Adds `name` to the element's class attribute.
     * @param {HTMLElement} el - HTMLElement
     * @param {string} name - css class name
     */
    static addClass(el: any, name: any): void;
    /**
     * 移除css class
     * @remarks
     * Removes `name` from the element's class attribute.
     * @param {HTMLElement} el - HTMLElement
     * @param {string} name - css class name
     */
    static removeClass(el: any, name: any): void;
    /**
     * 检测是否含有css class
     * @remarks
     * Returns `true` if the element's class attribute contains `name`.
     * @param {HTMLElement} el - HTMLElement
     * @param {string} name - css class name
     * @return {boolean} 是否含有
     */
    static hasClass(el: any, name: any): any;
    /**
     * 设置css class
     * @remarks
     * Sets the element's class.
     * @param {HTMLElement} el - HTMLElement
     * @param {string} name - css class name
     */
    static setClass(el: any, name: any): void;
    /**
     * 获取css class
     * @remarks
     * Returns the element's class.
     * @param {HTMLElement} el - HTMLElement
     * @return {string} css class name
     */
    static getClass(el: any): any;
    static createContextMenu(container: any): any;
    static addContextMenuItem(menu: any, item: any, handler: any): any;
}
