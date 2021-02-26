import {FROM_LEFT, RandomAngle, RandomAngleFrom} from './RandomAngles'


const tests = [
    [FROM_LEFT, 1, 3 * Math.PI / 4],
    [FROM_LEFT, 0, Math.PI / 4],
]

test.each(tests)('random angle from', (from, mrand, angle) => {
    const mockMath = Object.create(global.Math);
    mockMath.random = () => mrand;
    global.Math = mockMath;
    expect(RandomAngleFrom(from)).toBe(angle)
})

test('random angle', ()=>{
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 1;
    global.Math = mockMath;
    expect(RandomAngle()).toBe(45*8*Math.PI/180)
})