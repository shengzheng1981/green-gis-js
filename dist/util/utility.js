/**
 * 通用工具类
 * @remarks
 * 目前主要用于css样式管理维护
 * 当前代码来自leaflet
 */
export class Utility {
    /**
     * 添加css class
     * @remarks
     * Adds `name` to the element's class attribute.
     * @param {HTMLElement} el - HTMLElement
     * @param {string} name - css class name
     */
    static addClass(el, name) {
        if (el.classList !== undefined) {
            el.classList.add(name);
        }
        else if (!Utility.hasClass(el, name)) {
            var className = Utility.getClass(el);
            Utility.setClass(el, (className ? className + ' ' : '') + name);
        }
    }
    /**
     * 移除css class
     * @remarks
     * Removes `name` from the element's class attribute.
     * @param {HTMLElement} el - HTMLElement
     * @param {string} name - css class name
     */
    static removeClass(el, name) {
        if (el.classList !== undefined) {
            el.classList.remove(name);
        }
        else {
            Utility.setClass(el, (' ' + Utility.getClass(el) + ' ').replace(' ' + name + ' ', ' ').trim());
        }
    }
    /**
     * 检测是否含有css class
     * @remarks
     * Returns `true` if the element's class attribute contains `name`.
     * @param {HTMLElement} el - HTMLElement
     * @param {string} name - css class name
     * @return {boolean} 是否含有
     */
    static hasClass(el, name) {
        if (el.classList !== undefined) {
            return el.classList.contains(name);
        }
        var className = Utility.getClass(el);
        return className.length > 0 && new RegExp('(^|\\s)' + name + '(\\s|$)').test(className);
    }
    /**
     * 设置css class
     * @remarks
     * Sets the element's class.
     * @param {HTMLElement} el - HTMLElement
     * @param {string} name - css class name
     */
    static setClass(el, name) {
        if (el.className.baseVal === undefined) {
            el.className = name;
        }
        else {
            // in case of SVG element
            el.className.baseVal = name;
        }
    }
    /**
     * 获取css class
     * @remarks
     * Returns the element's class.
     * @param {HTMLElement} el - HTMLElement
     * @return {string} css class name
     */
    static getClass(el) {
        // Check if the element is an SVGElementInstance and use the correspondingElement instead
        // (Required for linked SVG elements in IE11.)
        if (el.correspondingElement) {
            el = el.correspondingElement;
        }
        return el.className.baseVal === undefined ? el.className : el.className.baseVal;
    }
}
