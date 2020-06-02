export class Subject {
    constructor(events) {
        this._handlers = {};
        events.forEach(event => {
            this._handlers[event] = []; //handlers array
        });
    }
    //地图事件注册监听
    on(event, handler) {
        this._handlers[event].push(handler);
    }
    off(event, handler) {
        if (Array.isArray(this._handlers[event])) {
            const index = this._handlers[event].findIndex(item => item === handler);
            index != -1 && this._handlers[event].splice(index, 1);
        }
    }
    emit(event, param) {
        this._handlers[event].forEach(handler => handler(param));
    }
}
