import Box from "../Box";
import calculateCollisions from "../CalcCollisions";

const boxes = new Set()
const testBoxesCount = 5000

for (let i = 0; i < testBoxesCount; i++) {
    const b = new Box(0, i, 10 )
    boxes.add(b)
}

test('check collisions', () => {
    const colls = calculateCollisions(boxes)
    expect(colls.size).toBe(testBoxesCount)
})


const notCollized = new Set();
notCollized.add(new Box(0, 0, 10))
notCollized.add(new Box(34, 0, 10))

test('check not collized', () => {
    expect(calculateCollisions(notCollized).size).toBe(0)
})
