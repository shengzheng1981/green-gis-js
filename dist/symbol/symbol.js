import { Color } from "../util/color";
export class Symbol {
}
export class SimplePointSymbol extends Symbol {
    constructor() {
        super(...arguments);
        //circle
        this.radius = 6;
        this.lineWidth = 1;
        this.strokeStyle = "#ff0000"; //#ff0000
        this.fillStyle = "#ff000088"; //#ff0000
    }
}
export class SimpleLineSymbol extends Symbol {
    constructor() {
        super(...arguments);
        this.lineWidth = 1;
        this.strokeStyle = "#ff0000"; //#ff0000
    }
}
export class SimpleFillSymbol extends Symbol {
    constructor() {
        super(...arguments);
        this.lineWidth = 2;
        this.strokeStyle = "#ff0000"; //#ff0000
        this.fillStyle = "#ff000088"; //#ff0000
    }
}
export class SimpleMarkerSymbol extends Symbol {
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
export class LetterSymbol extends Symbol {
    constructor() {
        super(...arguments);
        this.radius = 10;
        this.lineWidth = 1;
        this.strokeStyle = "#ff0000"; //#ff0000
        this.fillStyle = "#ff0000"; //#ff0000
        this.letter = "";
        this.fontColor = "#ff0000";
        this.fontSize = 12;
        this.fontFamily = "YaHei";
        this.fontWeight = "Bold";
    }
}
export class ArrowSymbol extends Symbol {
    constructor() {
        super(...arguments);
        this.lineWidth = 2;
        this.strokeStyle = "#ff0000"; //#ff0000
        this.minLength = 50; //>50pixel will draw arrow
        this.arrowLength = 10;
        this.arrowAngle = Math.PI / 6; //angle 30
    }
}
export class VertexSymbol extends Symbol {
    constructor() {
        super(...arguments);
        this.size = 10;
        this.lineWidth = 1;
        this.strokeStyle = "#ff0000"; //#ff0000
        this.fillStyle = "#ff000088"; //#ff0000
    }
}
export class ClusterSymbol extends Symbol {
    constructor(count) {
        super();
        this._count = 2;
        this.radius = 10;
        this.lineWidth = 1;
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
        const colors = Color.ramp(new Color(0, 255, 0), new Color(255, 0, 0), 16);
        return colors[this._count <= 15 ? this._count : 15].toString();
    }
}
