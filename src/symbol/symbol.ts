import {Color} from "../util/color";

export class Symbol {

}

export class SimplePointSymbol extends Symbol {
    //circle
    public radius: number = 6;
    public lineWidth: number = 1;
    public strokeStyle: string = "#ff0000"; //#ff0000
    public fillStyle: string = "#ff000088";    //#ff0000
}

export class SimpleLineSymbol extends Symbol {
    public lineWidth: number = 1;
    public strokeStyle: string = "#ff0000"; //#ff0000
}

export class SimpleFillSymbol extends Symbol {
    public lineWidth: number = 2;
    public strokeStyle: string = "#ff0000"; //#ff0000
    public fillStyle: string = "#ff000088";    //#ff0000
}

export class SimpleMarkerSymbol extends Symbol {
    public width: number = 16;
    public height: number = 16;
    public offsetX: number = 8;
    public offsetY: number = 8;
    public icon: ImageBitmap;
    public url: string;
    private _loaded: boolean;
    get loaded(): boolean {
        return this._loaded;
    }

    load(): Promise<any> {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.onload = () => {
                createImageBitmap(img).then(icon => {
                    this.icon = icon;
                    this._loaded = true;
                    resolve(icon);
                },err => reject(err));
            };
            img.onerror = reject;
            img.src = this.url;
        })
    }
}

export class SimpleTextSymbol extends Symbol {
    public lineWidth: number = 3;
    public strokeStyle: string = "#ff0000"; //#ffffff
    public fillStyle: string = "#ffffff";    //#ffffff
    public offsetX: number = 0;
    public offsetY: number = 1;
    public padding: number = 5;
    public fontColor: string = "#ff0000";
    public fontSize: number = 12;
    public fontFamily: string = "YaHei";
    public fontWeight: string = "Bold";
}

export class LetterSymbol extends Symbol {
    public radius: number = 10;
    public lineWidth: number = 1;
    public strokeStyle: string = "#ff0000"; //#ff0000
    public fillStyle: string = "#ff0000";    //#ff0000
    public letter: string = "";
    public fontColor: string = "#ff0000";
    public fontSize: number = 12;
    public fontFamily: string = "YaHei";
    public fontWeight: string = "Bold";
}

export class ArrowSymbol extends Symbol {
    public lineWidth: number = 2;
    public strokeStyle: string = "#ff0000"; //#ff0000
    public minLength: number = 50;     //>50pixel will draw arrow
    public arrowLength: number = 10;
    public arrowAngle: number = Math.PI / 6;   //angle 30
}

export class VertexSymbol extends Symbol {
    public size: number = 10;
    public lineWidth: number = 1;
    public strokeStyle: string = "#ff0000"; //#ff0000
    public fillStyle: string = "#ff000088";    //#ff0000
}

export class ClusterSymbol extends Symbol {
    private _count: number = 2;
    public radius: number = 10;
    public lineWidth: number = 1;
    public strokeStyle: string = "#ffffff"; //#ff0000
    public outerFillStyle: string = "#ffffff";    //#ff0000

    public fontColor: string = "#ffffff";
    public fontFamily: string = "YaHei";
    public fontWeight: string = "Bold";

    get text(): string {
        return this._count <= 99 ? this._count.toString() : "99+";
    }

    get inner(): number {
        return this._count <= 15 ? this.radius + this._count : this.radius + 15;
    }

    get outer(): number {
        return this.inner + 4;
    }

    get fontSize(): number {
        if (this._count < 10 ) {
            return 12;
        } else if (this._count >= 10 && this._count < 30) {
            return 14;
        } else if (this._count >= 30 && this._count < 50) {
            return 16;
        } else if (this._count >= 30 && this._count < 50) {
            return 18;
        } else if (this._count > 50) {
            return 20;
        }
    }

    get innerFillStyle(): string {
        const colors = Color.ramp(new Color(0, 255, 0), new Color(255,0,0), 16);
        return colors[this._count <= 15 ? this._count : 15].toString();
    }

    constructor(count: number) {
        super();
        this._count = count;
    }
}