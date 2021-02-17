const isIntersected = function (a, b) {
    let xr = [a.x, a.xr, b.x, b.xr]
    let yr = [a.y, a.yd, b.y, b.yd]
    let ds = a.size + b.size

    let xIntersected = (Math.max(...xr) - Math.min(...xr)) < ds
    let yIntersected = (Math.max(...yr) - Math.min(...yr)) < ds
    return xIntersected && yIntersected
}

export default isIntersected