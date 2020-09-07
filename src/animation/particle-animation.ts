import {PointAnimation} from "./animation";
import {WebMercator} from "../projection/web-mercator";
import {Projection} from "../projection/projection";

class Particle {
    x: number;
    y: number;
    c: string;
    r: number;
    R: number;
    s: number;
    pos: number;
    constructor(radius, speed, color) {
        this.pos = Math.random() * 360;
        this.c = color;
        this.r = (Math.random() * radius / 10);
        this.R = radius;
        this.s = speed;
    }
}

class Orbit {
    particles: Particle[] = [];
    radius: number;
    speed: number;
    color: string;
    constructor(radius, speed, color, count) {
        this.radius = radius;
        this.speed = speed;
        this.color = color;
        for (let index = 0; index < count; index++) {
            let s = Math.random() / 60 * this.speed;
            s = index % 2 ? s : s * -1;
            this.particles.push(new Particle(radius, s, color));
        }
    }
}

export class ParticleAnimation extends PointAnimation {

    private _orbit: Orbit;

    radius: number = 20;
    speed: number = 10;
    color: string = "#E76B76";
    count: number = 40;
    alpha: number = 0.5;
    composite: string = "soft-light";

    init(ctx: CanvasRenderingContext2D, projection: Projection = new WebMercator()) {
        super.init(ctx, projection);
        this._orbit = new Orbit(this.radius, this.speed, this.color, this.count);
    }

    animate(elapsed, ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.setTransform(1,0,0,1,0,0);

        this._orbit.particles.forEach( particle => {
            particle.x = this._screenX + particle.R * Math.sin(Math.PI/2 + particle.pos);
            particle.y = this._screenY + particle.R * Math.cos(Math.PI/2 + particle.pos);
            particle.pos += particle.s;
            ctx.beginPath();
            ctx.globalAlpha = this.alpha;
            ctx.globalCompositeOperation = this.composite;
            ctx.fillStyle = particle.c;
            ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fill();

        });
        ctx.restore();
    }
}