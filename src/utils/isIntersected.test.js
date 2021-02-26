import Box from "./Box";
import isIntersected from "./IsIntersected";

const a = new Box(0, 0, 10)

const tests = [
    [a, new Box(1,1,10), true],
    [a, new Box(9,9,10), true],
    [a, new Box(11,0,10), false],
    [a, new Box(0,11,10), false],
    [new Box(100, 100, 10), new Box(90, 100, 10), false],
    [new Box(100, 100, 10), new Box(100, 90, 10), false],
    [new Box(100, 100, 10), new Box(90, 90, 10), false],
]

test.each(tests)('boxes check intersected', (a, b, expected) => {
    expect(
        isIntersected(a, b)
    ).toBe(expected)
})