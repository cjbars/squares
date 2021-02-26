import isIntersected from "./IsIntersected";

/**
 *
 * @param boxes
 * @returns {Set<any>}
 */
const calculateCollisions = function (boxes) {
    if (boxes.length < 2) return new Set
    const sorted = [...boxes.values()].sort((a, b) => a.x - b.x)
    const collisions = new Set
    for (let i = 0; i < sorted.length; i++) {
        for (let j = i + 1; sorted[j] && sorted[i].xr > sorted[j].x; j++) {
            if(collisions.has(sorted[j])) break
            if (isIntersected(sorted[i], sorted[j])) {
                collisions.add(sorted[i])
                collisions.add(sorted[j])
            }
        }
    }
    return collisions
}

export default calculateCollisions