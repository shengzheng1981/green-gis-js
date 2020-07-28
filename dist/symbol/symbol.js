var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Color } from "../util/color";
export class Symbol {
    constructor() {
        this.lineWidth = 1;
        this.strokeStyle = "#ff0000"; //#ff0000
        this.fillStyle = "#ff000088"; //#ff0000
    }
}
export class PointSymbol extends Symbol {
    //渲染
    draw(ctx, screenX, screenY) { }
    //判断点是否在符号范围内
    contain(anchorX, anchorY, screenX, screenY) { return false; }
}
export class LineSymbol extends Symbol {
    draw(ctx, screen) { }
}
export class FillSymbol extends Symbol {
    draw(ctx, screen) { }
}
export class SimplePointSymbol extends PointSymbol {
    constructor() {
        super(...arguments);
        //circle
        this.radius = 6;
    }
    draw(ctx, screenX, screenY) {
        ctx.save();
        ctx.strokeStyle = this.strokeStyle;
        ctx.fillStyle = this.fillStyle;
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath(); //Start path
        //keep size
        //地理坐标 转回 屏幕坐标
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.arc(screenX, screenY, this.radius, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
    contain(anchorX, anchorY, screenX, screenY) {
        return Math.sqrt((anchorX - screenX) * (anchorX - screenX) + (anchorY - screenY) * (anchorY - screenY)) <= this.radius;
    }
}
export class GradientPointSymbol extends PointSymbol {
    constructor() {
        super(...arguments);
        //circle
        this.radius = 6;
        this.lineWidth = 0;
        this.startColor = "#ff0000"; //#ff0000
        this.endColor = "#ff0000"; //#ff0000
    }
    draw(ctx, screenX, screenY) {
        ctx.save();
        //keep size
        //地理坐标 转回 屏幕坐标
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.strokeStyle;
        const radgrad = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, this.radius);
        radgrad.addColorStop(0, this.startColor);
        radgrad.addColorStop(1, this.endColor);
        ctx.fillStyle = radgrad;
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath(); //Start path
        ctx.arc(screenX, screenY, this.radius, 0, Math.PI * 2, true);
        ctx.fill();
        //ctx.stroke();
        ctx.restore();
    }
    contain(anchorX, anchorY, screenX, screenY) {
        return Math.sqrt((anchorX - screenX) * (anchorX - screenX) + (anchorY - screenY) * (anchorY - screenY)) <= this.radius;
    }
}
export class SimpleLineSymbol extends LineSymbol {
    draw(ctx, screen) {
        ctx.save();
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = this.lineWidth;
        //keep lineWidth
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.beginPath();
        screen.forEach((point, index) => {
            const screenX = point[0], screenY = point[1];
            if (index === 0) {
                ctx.moveTo(screenX, screenY);
            }
            else {
                ctx.lineTo(screenX, screenY);
            }
        });
        ctx.stroke();
        ctx.restore();
    }
}
export class SimpleFillSymbol extends Symbol {
    constructor() {
        super(...arguments);
        this.lineWidth = 2;
    }
    draw(ctx, screen) {
        ctx.save();
        ctx.strokeStyle = this.strokeStyle;
        ctx.fillStyle = this.fillStyle;
        ctx.lineWidth = this.lineWidth;
        //keep lineWidth
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        //TODO:  exceeding the maximum extent(bound), best way is overlap by extent. find out: maximum is [-PI*R, PI*R]??
        ctx.beginPath();
        screen.forEach(ring => {
            ring.forEach((point, index) => {
                const screenX = point[0], screenY = point[1];
                if (index === 0) {
                    ctx.moveTo(screenX, screenY);
                }
                else {
                    ctx.lineTo(screenX, screenY);
                }
            });
        });
        ctx.closePath();
        ctx.fill("evenodd");
        ctx.stroke();
        ctx.restore();
    }
}
export class SimpleMarkerSymbol extends PointSymbol {
    constructor() {
        super(...arguments);
        this.width = 16;
        this.height = 16;
        this.offsetX = 8;
        this.offsetY = 8;
    }
    get loaded() {
        return this._loaded;
    }
    load() {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.onload = () => {
                createImageBitmap(img).then(icon => {
                    this.icon = icon;
                    this._loaded = true;
                    resolve(icon);
                }, err => reject(err));
            };
            img.onerror = reject;
            img.src = this.url;
        });
    }
    draw(ctx, screenX, screenY) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.loaded)
                yield this.load();
            if (this.icon) {
                ctx.save();
                const matrix = ctx.getTransform();
                //keep size
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.drawImage(this.icon, screenX + this.offsetX, screenY + this.offsetY, this.width, this.height);
                ctx.restore();
            }
        });
    }
    contain(anchorX, anchorY, screenX, screenY) {
        return screenX >= (anchorX + this.offsetX) && screenX <= (anchorX + this.offsetX + this.width) && screenY >= (anchorY + this.offsetY) && screenY <= (anchorY + this.offsetY + this.height);
    }
}
export class SimpleTextSymbol extends Symbol {
    constructor() {
        super(...arguments);
        this.lineWidth = 3;
        this.strokeStyle = "#ff0000"; //#ffffff
        this.fillStyle = "#ffffff"; //#ffffff
        this.offsetX = 0;
        this.offsetY = 1;
        this.padding = 5;
        this.fontColor = "#ff0000";
        this.fontSize = 12;
        this.fontFamily = "YaHei";
        this.fontWeight = "Bold";
    }
}
export class LetterSymbol extends PointSymbol {
    constructor() {
        super(...arguments);
        this.radius = 10;
        this.letter = "";
        this.fontColor = "#ff0000";
        this.fontSize = 12;
        this.fontFamily = "YaHei";
        this.fontWeight = "Bold";
    }
    draw(ctx, screenX, screenY) {
        ctx.save();
        ctx.strokeStyle = this.strokeStyle;
        ctx.fillStyle = this.fillStyle;
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath(); //Start path
        //keep size
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.arc(screenX, screenY, this.radius, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillStyle = this.fontColor;
        ctx.font = this.fontSize + "px/1 " + this.fontFamily + " " + this.fontWeight;
        ctx.fillText(this.letter, screenX, screenY);
        ctx.restore();
    }
    contain(anchorX, anchorY, screenX, screenY) {
        return Math.sqrt((anchorX - screenX) * (anchorX - screenX) + (anchorY - screenY) * (anchorY - screenY)) <= this.radius;
    }
}
export class ArrowSymbol extends Symbol {
    constructor() {
        super(...arguments);
        this.lineWidth = 2;
        this.minLength = 50; //>50pixel will draw arrow
        this.arrowLength = 10;
        this.arrowAngle = Math.PI / 6; //angle 30
    }
    draw(ctx, screen) {
        ctx.save();
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = this.lineWidth;
        //keep lineWidth
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.beginPath();
        screen.forEach((point, index) => {
            const screenX = point[0], screenY = point[1];
            if (index === 0) {
                ctx.moveTo(screenX, screenY);
            }
            else {
                ctx.lineTo(screenX, screenY);
            }
        });
        ctx.stroke();
        screen.reduce((prev, cur) => {
            if (prev) {
                const length = Math.sqrt((cur[0] - prev[0]) * (cur[0] - prev[0]) + (cur[1] - prev[1]) * (cur[1] - prev[1]));
                if (length >= this.minLength) {
                    //中点 即箭头
                    const [middleX, middleY] = [(prev[0] + cur[0]) / 2, (prev[1] + cur[1]) / 2];
                    //箭尾垂线的垂足
                    const [footX, footY] = this._getPointAlongLine([middleX, middleY], prev, Math.cos(this.arrowAngle) * this.arrowLength);
                    const k = (cur[1] - prev[1]) / (cur[0] - prev[0]);
                    // 1/k 垂线
                    const points = this._getPointAlongLine2(-1 / k, footY - footX * -1 / k, [footX, footY], Math.sin(this.arrowAngle) * this.arrowLength);
                    //两点
                    points.forEach(point => {
                        ctx.beginPath();
                        ctx.moveTo(middleX, middleY);
                        ctx.lineTo(point[0], point[1]);
                        ctx.stroke();
                    });
                }
                return cur;
            }
            else {
                return cur;
            }
        });
        ctx.restore();
    }
    //已知 起点和终点  求沿线距起点定长的点
    _getPointAlongLine(p1, p2, d) {
        //line length
        let l = Math.sqrt((p2[0] - p1[0]) * (p2[0] - p1[0]) + (p2[1] - p1[1]) * (p2[1] - p1[1]));
        let t = d / l;
        return [(1 - t) * p1[0] + t * p2[0], (1 - t) * p1[1] + t * p2[1]];
    }
    //已知 起点 y = kx + b   求沿线距起点定长的点 两个点
    _getPointAlongLine2(k, b, p, d) {
        let x0 = p[0] + Math.sqrt((d * d) / (k * k + 1)), x1 = p[0] - Math.sqrt((d * d) / (k * k + 1));
        return [[x0, k * x0 + b], [x1, k * x1 + b]];
    }
}
export class VertexSymbol extends PointSymbol {
    constructor() {
        super(...arguments);
        this.size = 10;
    }
    draw(ctx, screenX, screenY) {
        ctx.save();
        ctx.strokeStyle = this.strokeStyle;
        ctx.fillStyle = this.fillStyle;
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath(); //Start path
        //keep size
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        const size = this.size;
        ctx.rect(screenX - size / 2, screenY - size / 2, size, size);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
    contain(anchorX, anchorY, screenX, screenY) {
        return screenX >= (anchorX - this.size / 2) && screenX <= (anchorX + this.size / 2) && screenY >= (anchorY - this.size / 2) && screenY <= (anchorY + this.size / 2);
    }
}
export class ClusterSymbol extends PointSymbol {
    constructor(count) {
        super();
        this._count = 2;
        this.radius = 10;
        this.strokeStyle = "#ffffff"; //#ff0000
        this.outerFillStyle = "#ffffff"; //#ff0000
        this.fontColor = "#ffffff";
        this.fontFamily = "YaHei";
        this.fontWeight = "Bold";
        this._count = count;
    }
    get text() {
        return this._count <= 99 ? this._count.toString() : "99+";
    }
    get inner() {
        return this._count <= 15 ? this.radius + this._count : this.radius + 15;
    }
    get outer() {
        return this.inner + 4;
    }
    get fontSize() {
        if (this._count < 10) {
            return 12;
        }
        else if (this._count >= 10 && this._count < 30) {
            return 14;
        }
        else if (this._count >= 30 && this._count < 50) {
            return 16;
        }
        else if (this._count >= 30 && this._count < 50) {
            return 18;
        }
        else if (this._count > 50) {
            return 20;
        }
    }
    get innerFillStyle() {
        //const colors = Color.ramp(new Color(0, 255, 0), new Color(255,0,0), 16);
        //const colors = Color.ramp(new Color(22,198,227), new Color(255, 0, 255), 16);
        const colors = Color.ramp(new Color(25, 202, 173), new Color(244, 96, 108), 16);
        return colors[this._count <= 15 ? this._count : 15].toString();
    }
    draw(ctx, screenX, screenY) {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.strokeStyle = this.strokeStyle;
        ctx.fillStyle = this.outerFillStyle;
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath(); //Start path
        //keep size
        ctx.arc(screenX, screenY, this.outer, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = this.innerFillStyle;
        ctx.beginPath(); //Start path
        //keep size
        ctx.arc(screenX, screenY, this.inner, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillStyle = this.fontColor;
        ctx.font = this.fontSize + "px/1 " + this.fontFamily + " " + this.fontWeight;
        ctx.fillText(this.text, screenX, screenY);
        ctx.restore();
    }
}
