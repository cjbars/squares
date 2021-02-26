import Box from "../Box";
import calculateCollisions from "../CalcCollisions";

const boxes = new Set

for (let i = 0; i < 1000; i++) {
    const b = new Box(0, i, 10)
    boxes.add(b)
}

test('check collisions', () => {
    expect(calculateCollisions(boxes).length).toBe(999)
})

// benchmark
// original = 172 ms
// foreach = 152 ms
// выдаем только номера битых боксов = 4 мс
// и сииильно меньше циклов (5500 элементов за 151 мс)