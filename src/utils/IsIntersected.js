const isIntersected = function (a, b) {
    let xr = [a.x, a.xr, b.x, b.xr]
    let yr = [a.y, a.yd, b.y, b.yd]
    let doubleBoxSize = a.size + b.size

    let xIntersected = (Math.max(...xr) - Math.min(...xr)) < doubleBoxSize
    let yIntersected = (Math.max(...yr) - Math.min(...yr)) < doubleBoxSize
    return xIntersected && yIntersected
}

export default isIntersected