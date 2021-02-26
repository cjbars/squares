import {FROM_BOTTOM, FROM_LEFT, FROM_RIGHT, FROM_TOP, RandomAngleFrom} from "./RandomAngles";

export default class Box {
    constructor(x = 0, y = 0, size = 1, angle = 0, speed = 0) {
        this.id = Symbol()
        this.x = x
        this.y = y
        this.size = size
        this.angle = angle
        this.speed = speed
    }

    get xr() {
        return this.x + this.size
    }

    get yd() {
        return this.y + this.size
    }

    move() {
        this.x += this.speed * Math.sin(this.angle)
        this.y += -1 * this.speed * Math.cos(this.angle)
        this.ricochetCorrection();
    }

    ricochetCorrection() {
        if (this.x <= 0) {
            this.angle = RandomAngleFrom(FROM_LEFT)
            this.x = 1
        }
        if (this.x >= window.innerWidth - this.size) {
            this.angle = RandomAngleFrom(FROM_RIGHT)
            this.x = window.innerWidth - this.size
        }
        if (this.y <= 0) {
            this.angle = RandomAngleFrom(FROM_TOP)
            this.y = 1
        }
        if (this.y >= window.innerHeight - this.size) {
            this.angle = RandomAngleFrom(FROM_BOTTOM)
            this.y = window.innerHeight - this.size
        }
    }
}