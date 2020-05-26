import { Bound } from "../util/bound";
export class WebMecator {
    //投影后的平面坐标范围
    get bound() {
        return new Bound(-Math.PI * WebMecator.R, Math.PI * WebMecator.R, Math.PI * WebMecator.R, -Math.PI * WebMecator.R);
    }
    //经纬度转平面坐标
    project([lng, lat]) {
        //from leaflet & wiki
        const d = Math.PI / 180, sin = Math.sin(lat * d);
        return [WebMecator.R * lng * d, WebMecator.R * Math.log((1 + sin) / (1 - sin)) / 2];
    }
    //平面坐标转经纬度
    unproject([x, y]) {
        const d = 180 / Math.PI;
        return [x * d / WebMecator.R, (2 * Math.atan(Math.exp(y / WebMecator.R)) - (Math.PI / 2)) * d];
    }
}
//static R: number = 6378137;
WebMecator.R = 6378245.0;
