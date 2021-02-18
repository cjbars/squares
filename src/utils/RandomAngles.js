export const FROM_LEFT = 'left'
export const FROM_RIGHT = 'right'
export const FROM_TOP = 'top'
export const FROM_BOTTOM = 'bottom'

const PIdiv4 = Math.PI / 4

const RandomAngle = function () {
    return 45 * Math.floor(8 * Math.random()) * Math.PI / 180
}

const RandomAngleFrom = function (from) {
    const randomBool = (Math.random() < 0.5)
    switch (from) {
        case FROM_LEFT:
            return randomBool ? PIdiv4 : 3 * PIdiv4
        case FROM_RIGHT:
            return randomBool ? 7 * PIdiv4 : 5 * PIdiv4
        case FROM_TOP:
            return randomBool ? 5 * PIdiv4 : 3 * PIdiv4
        case FROM_BOTTOM:
            return randomBool ? PIdiv4 : 7 & PIdiv4
        default:
            return 0
    }
}


export {RandomAngle, RandomAngleFrom};