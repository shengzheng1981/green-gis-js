import {Map} from "./map";
import {FeatureLayer} from "./layer/feature-layer";
import {Feature} from "./element/feature";
import {Graphic} from "./element/graphic";
import {Point} from "./geometry/point";
import {GraphicLayer} from "./layer/graphic-layer";
import {Utility} from "./util/utility";
import {Layer} from "./layer/layer";
import {Subject} from "./util/subject";
import {Animation} from "./animation/animation";

export class Animator extends Subject{
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;

    private _map: Map;
    //图层列表
    //private _layers: FeatureLayer[] = [];
    private _animations: Animation[] = [];

    constructor(map: Map) {
        super(["mouseover", "mouseout"]); //when mouseover feature
        this._map = map;
        const container = map.container;
        //create canvas
        this._canvas = document.createElement("canvas");
        this._canvas.style.cssText = "position: absolute; height: 100%; width: 100%; z-index: 80";
        this._canvas.width = container.clientWidth ;
        this._canvas.height = container.clientHeight;
        container.appendChild(this._canvas);

        this._onResize = this._onResize.bind(this);
        this._extentChange = this._extentChange.bind(this);

        this._ctx = this._canvas.getContext("2d");
        this._map.on("resize", this._onResize);
        this._map.on("extent", this._extentChange);

    }

    _onResize(event) {
        this._canvas.width = this._map.container.clientWidth ;
        this._canvas.height = this._map.container.clientHeight;
    }

    _extentChange(event) {
        //const matrix = DOMMatrix.fromFloat64Array( new Float64Array([event.matrix.a, 0, 0, event.matrix.d, event.matrix.e, event.matrix.f] ) );
        //this._ctx.setTransform(matrix);
        this._ctx.setTransform(event.matrix.a, 0, 0, event.matrix.d, event.matrix.e, event.matrix.f);
        this.redraw();
    }

    addAnimation(animation) {
        this._animations.push(animation);
        this.redraw();
    }
    removeAnimation(animation) {
        const index = this._animations.findIndex(item => item === animation);
        index != -1 && this._animations.splice(index, 1);
        this.redraw();
    }
    clearAnimations() {
        this._animations = [];
        this.redraw();
    }

    private _frame: any;
    private _start: number;
    redraw() {
        this._frame && window.cancelAnimationFrame(this._frame);
        this._start = undefined;
        this._ctx.save();
        this._ctx.setTransform(1, 0, 0, 1, 0, 0);
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._ctx.restore();

        this._animations.forEach(animation => {
            animation.init(this._ctx, this._map.projection);
        });
        this.animate = this.animate.bind(this);
        this._frame = window.requestAnimationFrame(this.animate);
    }

    animate(timestamp) {
        if (this._start === undefined){
            this._start = timestamp;
        }
        const elapsed = timestamp - this._start;

        this._ctx.save();
        this._ctx.setTransform(1, 0, 0, 1, 0, 0);
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._ctx.restore();

        this._animations.forEach(animation => {
            animation.animate(elapsed, this._ctx);
        });
        this._frame = window.requestAnimationFrame(this.animate);
    }

    clear() {
        this._ctx.save();
        this._ctx.setTransform(1, 0, 0, 1, 0, 0);
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._ctx.restore();
    }

    destroy() {
        this._map.off("resize", this._onResize);
        this._map.off("extent", this._extentChange);

        this._frame && window.cancelAnimationFrame(this._frame);
    }
}