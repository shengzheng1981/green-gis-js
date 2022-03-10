import { Subject } from "../dist";
/**
 * 栅格切片管理器
 * 已内置于map，可通过map的接口进行添加删除的维护操作
 */
export class ImageLayer extends Subject {
    /**
     * 创建Tile
     * 不应自主创建，map内部创建
     * @param {Map} map - 地图容器
     */
    constructor(map, url, width, height) {
        super(["mouseover", "mouseout"]); //when mouseover feature
        this._map = map;
        const container = map.container;
        //create div
        this._container = document.createElement("div");
        this._container.style.cssText = "position: absolute; height: 100%; width: 100%; z-index: 80; overflow: hidden";
        container.appendChild(this._container);
        this._extentChange = this._extentChange.bind(this);
        this._map.on("extent", this._extentChange);

        this._imageContainer = document.createElement("div");
        this._imageContainer.style.cssText = "position: absolute; height: 100%; width: 100%; ";
        this._container.appendChild(this._imageContainer);

        this._image = document.createElement('img');
        this._image.alt = '';
        this._image.setAttribute('role', 'presentation');
        this._image.style.width = width + 'px';
        this._image.style.height = height + 'px';
        this._image.style.position = 'absolute';
        this._image.src = url;
        this._image.style.left = - (width - container.offsetWidth) / 2 + 'px';
        this._image.style.top = - (height - container.offsetHeight) / 2 +'px';
        this._image.style.transformOrigin = 'center';
        this._imageContainer.appendChild(this._image);
        this._imageContainer.style.transformOrigin = 'center';

    }

    //与主视图同步
    _extentChange(event) {
        const center = this._map.center;
        const zoom = this._map.zoom;
        const matrix = event.matrix;
        console.log("scale(" + matrix.a + ") translate(" + matrix.e + "px," + matrix.f + "px)");
        //this._image.style.transform = "translate(" + -center[0] + "px," + -center[1] + "px) scale(" + zoom + ")";
        this._imageContainer.style.transform = "scale(" + matrix.a + ") translate(" + -center[0] + "px," + -center[1] + "px)";
    }
    /**
     * 重绘
     */
    redraw() {
        
    }
    /**
     * 销毁
     */
    destroy() {
        this._map.off("extent", this._extentChange);
    }
}
