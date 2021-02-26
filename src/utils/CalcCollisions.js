import isIntersected from "./IsIntersected";

const calculateCollisions = function (boxes) {
    const sorted = [...boxes.valueOf()].sort((a, b) => a.x - b.x)
    return sorted.filter((left, i) => { // получим только столкнувшихся
        return sorted
            .slice(i+1) // ищем только справа
            .reduce((prev, right) => {
                if(prev === true) return true               // если уже нашли крутим дальше до конца
                if(right.x > left.xr) return prev           // если вышли за границы крутим дальше доконца
                return isIntersected(left, right)           // возвращаем сравнение
            }, false)
    })
}

export default calculateCollisions