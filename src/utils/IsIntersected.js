const isIntersected = function (a, b) {
    const doubleBoxSize = a.size + b.size
    const xIntersected = (Math.max(a.x, a.xr, b.x, b.xr) - Math.min(a.x, a.xr, b.x, b.xr)) < doubleBoxSize
    const yIntersected = (Math.max(a.y, a.yd, b.y, b.yd) - Math.min(a.y, a.yd, b.y, b.yd)) < doubleBoxSize
    return xIntersected && yIntersected
}

export default isIntersected