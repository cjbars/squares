import isIntersected from "@/utils/IsIntersected";

const calculateCollisions = function (boxes) {
    if (boxes.length < 2) return []
    const sorted = [...boxes.values()].sort((a, b) => a.x - b.x)
    let collisions = []
    for (let i = 0; i < sorted.length; i++) {
        for (let j = i + 1; sorted[j] && sorted[i].xr > sorted[j].x; j++) {
            if (isIntersected(sorted[i], sorted[j])) collisions.push([sorted[i], sorted[j]])
        }
    }
    return collisions
}

export default calculateCollisions