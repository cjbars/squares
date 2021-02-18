let W = 1440
let H = 718
let bS = 80
let bc = 10

const maxC = Math.floor(W * H / (bS * bS))
console.log(`max count ${maxC}`)

let arr = []
let setted = 0

while (setted < bc){
    let ind = Math.floor(maxC * Math.random())
    if (arr[ind] === undefined) {
        arr[ind] = true
        setted++
    }
}
const cols = W / bS
arr = arr.map((i, k) => {
    let y = Math.floor(k / cols)
    let x = k % cols
    console.log(k, y*bS, x*bS)
})

// console.table(arr)
