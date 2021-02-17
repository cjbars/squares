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
        this.rangeCorrection();
    }

    rangeCorrection() {
        if (this.x <= 0) {
            this.angle = (Math.random() < 0.5)
                ? Math.PI / 4
                : 3 * Math.PI / 4
            this.x = 1
        }
        if (this.x >= window.innerWidth - this.size) {
            this.angle = (Math.random() < 0.5)
                ? 7 * Math.PI / 4
                : 5 * Math.PI / 4
            this.x = window.innerWidth - this.size
        }
        if (this.y <= 0) {
            this.angle = (Math.random() < 0.5)
                ? 5 * Math.PI / 4
                : 3 * Math.PI / 4
            this.y = 1
        }
        if (this.y >= window.innerHeight - this.size) {
            this.angle = (Math.random() < 0.5)
                ? Math.PI / 4
                : 7 * Math.PI / 4
            this.y = window.innerHeight - this.size
        }
    }
}