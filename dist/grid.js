import { Subject } from "./util/subject";
import { Polyline } from "./geometry/polyline";
import { Feature } from "./element/feature";
import { Polygon } from "./geometry/polygon";
import { MultiplePolygon } from "./geometry/multiple-polygon";
import { MultiplePoint } from "./geometry/multiple-point";
import { Point } from "./geometry/point";
import { MultiplePolyline } from "./geometry/multiple-polyline";
import { SimpleFillSymbol, SimpleLineSymbol, SimplePointSymbol } from "./symbol/symbol";
/**
 * 矢量切片管理器
 * 已内置于map，可通过map的接口进行添加删除的维护操作
 */
export class Grid extends Subject {
    /**
     * 创建Grid
     * 不应自主创建，map内部创建
     * @param {Map} map - 地图容器
     */
    constructor(map) {
        super(["mouseover", "mouseout"]); //when mouseover feature
        this._layers = [];
        this._map = map;
        const container = map.container;
        this._canvas = document.createElement("canvas");
        this._canvas.style.cssText = "position: absolute; height: 100%; width: 100%; z-index: 80";
        this._canvas.width = container.clientWidth;
        this._canvas.height = container.clientHeight;
        container.appendChild(this._canvas);
        this._onResize = this._onResize.bind(this);
        this._extentChange = this._extentChange.bind(this);
        this._ctx = this._canvas.getContext("2d");
        this._map.on("resize", this._onResize);
        this._map.on("extent", this._extentChange);
        this._layers = [];
    }
    /**
     * server url
     */
    get url() {
        return this._url;
    }
    /**
     * server url
     */
    set url(value) {
        this._url = value;
    }
    //与主视图同步
    _onResize(event) {
        this._canvas.width = this._map.container.clientWidth;
        this._canvas.height = this._map.container.clientHeight;
    }
    //与主视图同步
    _extentChange(event) {
        this._ctx.setTransform(event.matrix.a, 0, 0, event.matrix.d, event.matrix.e, event.matrix.f);
        this.redraw();
    }
    //layer: green gis server layer
    addLayer(layer) {
        this._layers.push(layer);
    }
    removeLayer(layer) {
        const index = this._layers.find(item => item._id == layer._id);
        index && this._layers.splice(index, 1);
    }
    clearLayers() {
        this._layers = [];
    }
    /**
     * 重绘
     */
    redraw() {
        if (!this._url)
            return;
        this._ctx.save();
        this._ctx.setTransform(1, 0, 0, 1, 0, 0);
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._ctx.restore();
        const lngLat2Tile = (lng, lat, z) => {
            let tileX = Math.floor((lng + 180) / 360 * Math.pow(2, z));
            let tileY = Math.floor((1 / 2 - (Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180))) / (2 * Math.PI)) * Math.pow(2, z));
            return [tileX, tileY];
        };
        const lngLat2Pixel = (lng, lat, z) => {
            let pixelX = Math.floor(((lng + 180) / 360 * Math.pow(2, z) * 256) % 256);
            let pixelY = Math.floor(((1 - (Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180))) / (2 * Math.PI)) * Math.pow(2, z) * 256) % 256);
            return [pixelX, pixelY];
        };
        const getUrl = (url, id, x, y, z) => {
            return url.replace("{id}", id).replace("{x}", x).replace("{y}", y).replace("{z}", z);
        };
        const projection = this._map.projection;
        const extent = this._map.extent;
        const zoom = this._map.zoom;
        const [lng1, lat1] = projection.unproject([extent.xmin, extent.ymax]);
        const [lng2, lat2] = projection.unproject([extent.xmax, extent.ymin]);
        const [tileMinX, tileMinY] = lngLat2Tile(lng1, lat1, zoom);
        const [tileMaxX, tileMaxY] = lngLat2Tile(lng2, lat2, zoom);
        const me = this;
        for (let x = tileMinX; x <= tileMaxX; x++) {
            for (let y = tileMinY; y <= tileMaxY; y++) {
                this._layers.forEach(layer => {
                    const url = getUrl(this._url, layer._id, x, y, zoom);
                    const req = new XMLHttpRequest();
                    req.onload = (event) => {
                        const array = JSON.parse(req.responseText);
                        array.forEach(item => {
                            let geometry, symbol;
                            switch (item.geometry.type) {
                                case "Point":
                                    geometry = new Point(item.geometry.coordinates[0], item.geometry.coordinates[1]);
                                    symbol = new SimplePointSymbol();
                                    break;
                                case "LineString":
                                    geometry = new Polyline(item.geometry.coordinates);
                                    symbol = new SimpleLineSymbol();
                                    break;
                                case "Polygon":
                                    geometry = new Polygon(item.geometry.coordinates);
                                    symbol = new SimpleFillSymbol();
                                    break;
                                case "MultiPoint":
                                    geometry = new MultiplePoint(item.geometry.coordinates);
                                    symbol = new SimplePointSymbol();
                                    break;
                                case "MultiLineString":
                                    geometry = new MultiplePolyline(item.geometry.coordinates);
                                    symbol = new SimpleLineSymbol();
                                    break;
                                case "MultiPolygon":
                                    geometry = new MultiplePolygon(item.geometry.coordinates);
                                    symbol = new SimpleFillSymbol();
                                    break;
                            }
                            const feature = new Feature(geometry, item.properties);
                            feature.draw(me._ctx, me._map.projection, me._map.extent, symbol);
                        });
                    };
                    req.open("GET", url, true);
                    req.send(null);
                });
            }
        }
    }
    /**
     * 销毁
     */
    destroy() {
        this._map.off("resize", this._onResize);
        this._map.off("extent", this._extentChange);
    }
}
