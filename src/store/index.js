import Vue from 'vue'
import Vuex from 'vuex'
import randomAngle from "@/utils/RandomAngle";
import CalcCollisions from "@/utils/CalcCollisions";
import IsIntersected from "@/utils/IsIntersected";
import Box from "@/utils/Box";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        conf: {
            initBoxesCount: 50,
            initBoxSize: 80,
            minBoxSize: 20
        },
        boxes: [],
        isWin: false,
        isGameOver: false
    },
    mutations: {
        SET_CONF: (state, conf) => {
            state.conf.minBoxSize = parseInt(conf.minBoxSize);
            state.conf.initBoxSize = parseInt(conf.initBoxSize);
            state.conf.initBoxesCount = parseInt(conf.initBoxesCount);
        },
        ADD_BOX: (state, box) => {
            state.boxes.push(box)
        },
        DELETE_BOX: (state, box) => {
            state.boxes = state.boxes.filter(b => b.id != box.id)
        },
        GAME_OVER: (state) => {
            state.isWin = true
        },
        GAME_WIN: (state) => {
            state.isWin = true
        }
    },
    actions: {
        start({commit, dispatch}, conf) {
            commit('SET_CONF', conf)
            dispatch('generateBoxes')
        },
        generateBoxes({commit, dispatch, state}) {

            const s = state
            const bs = s.conf.initBoxSize
            while (s.boxes.length <= s.conf.initBoxesCount) {
                console.log(state.boxes.length)
                const x = Math.floor((window.innerWidth - bs) * Math.random())
                const y = Math.floor((window.innerHeight - bs) * Math.random())
                // случайный начальный угол
                const angle = randomAngle()
                // случайная начальная скорость
                const initialSpeed = 1 + Math.floor(10 * Math.random())
                const b = new Box(x, y, bs, angle, initialSpeed)
                // добавляем
                commit('ADD_BOX', b)
                if(CalcCollisions(state.boxes).length){
                    // если пересекся
                    commit('DELETE_BOX', b)
                }
                //
                //
                // // toDo переделать а быстрый метод коллизий
                // let isected = s.boxes
                //     .filter(i => {
                //         let half = bs / 2
                //         let xl = x - half
                //         let xr = x + bs + half
                //         let candyX = i.x > xl && i.x < xr
                //         let yU = y - half
                //         let yD = y + bs + half
                //         let candyY = i.y > yU && i.y < yD
                //         return candyX && candyY
                //     })
                //     .filter(i => IsIntersected(i, b))
                //     .length
                // if (isected == 0 || !s.boxes.length) {
                //     commit('ADD_BOX', b)
                // }
            }
            dispatch('run')
        },
        run({state, dispatch, commit}) {
            requestAnimationFrame(function render() {
                if(state.boxes.length <= 0) commit('GAME_OVER')
                if(state.boxes.length == 1) commit('')
                dispatch('checkCollisions')
                dispatch('stepMove')
                if (state.isWin || state.isGameOver) return
                requestAnimationFrame(render)
            })
        },
        stepMove({state, commit}) {
            for (let i = 0; i < state.boxes.length; i++) {
                state.boxes[i].move();
            }
        },
        checkCollisions({state, dispatch}) {
            const cols = CalcCollisions(state.boxes)
            if (!cols.length) return
            dispatch('handleCollision', cols)
        },
        handleCollision({dispatch}, cols) {
            cols.map(pair => {
                // разбить блоки
                dispatch("splitBox", {box: pair[0], isLeft: true})
                dispatch("splitBox", {box: pair[1], isLeft: false})
            })
        },
        splitBox({state, commit}, {box, isLeft}) {
            commit('DELETE_BOX', box)
            let newSize = Math.floor(box.size / 2)
            if (newSize < state.conf.minBoxSize) return
            let upBox = new Box(
                isLeft ? box.xr - newSize - 2 : box.x + 2,
                box.y,
                newSize,
                isLeft ? 7 * Math.PI / 4 : Math.PI / 4,
                box.speed + 1
            )
            commit('ADD_BOX', upBox)
            let downBox = new Box(
                isLeft ? box.xr - newSize - 2 : box.x + 2,
                box.y + newSize + 1,
                newSize,
                isLeft ? 5 * Math.PI / 4 : 3 * Math.PI / 4,
                box.speed + 1
            )
            commit('ADD_BOX', downBox)
            // commit('GAME_OVER')
        }
    }
})
