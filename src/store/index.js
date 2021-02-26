import Vue from 'vue'
import Vuex from 'vuex'
import {FROM_LEFT, FROM_RIGHT, RandomAngle, RandomAngleFrom} from "../utils/RandomAngles";
import Box from "../utils/Box";
import calculateCollisions from "../utils/CalcCollisions";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        conf: {
            initBoxesCount: 40,
            initBoxSize: 80,
            minBoxSize: 4
        },
        boxes: new Set(),
        epoch: 0,
        isWin: false,
        isGameOver: false
    },
    mutations: {
        SET_CONF: (state, conf) => {
            state.conf.minBoxSize = parseInt(conf.minBoxSize);
            state.conf.initBoxSize = parseInt(conf.initBoxSize);
            state.conf.initBoxesCount = parseInt(conf.initBoxesCount);
            state.epoch = 0
            state.isGameOver = false
            state.isWin = false
        },
        ADD_BOX: (state, box) => {
            state.boxes.add(box)
        },
        DELETE_BOX: (state, box) => {
            state.boxes.delete(box)
        },
        GAME_OVER: (state) => {
            state.isGameOver = true
        },
        GAME_WIN: (state) => {
            state.isWin = true
        }
    },
    actions: {
        start({commit, dispatch}, conf) {
            commit('SET_CONF', conf)
            dispatch('newGeneration')
            dispatch('run')
        },
        newGeneration({commit, state}) {
            const W = window.innerWidth, H = window.innerHeight
            const maxCount = Math.floor(W * H / Math.pow(state.conf.initBoxSize, 2))
            let gridSet = new Set()

            while (gridSet.size < state.conf.initBoxesCount) {
                const i = Math.floor(maxCount * Math.random())
                if (!gridSet.has(i)) gridSet.add(i)
            }

            const cols = W / state.conf.initBoxSize
            const bs = state.conf.initBoxSize
            gridSet.forEach(i => {
                const y = Math.floor(i / cols)
                const x = i % cols
                const initialSpeed = 1 + Math.floor(10 * Math.random())
                const b = new Box(x * bs, y * bs, bs, RandomAngle(), initialSpeed)
                commit('ADD_BOX', b)
            })
        },
        run({state, dispatch, commit}) {
            requestAnimationFrame(function render() {
                if (state.boxes.size <= 0) commit('GAME_OVER')
                if (state.boxes.size === 1) commit('GAME_WIN')
                dispatch('checkCollisions')
                dispatch('stepMove')
                if (state.isWin || state.isGameOver) return
                requestAnimationFrame(render)
            })
        },
        stepMove({state}) {
            state.boxes.forEach(box => {
                box.move()
            })
            state.epoch++
        },
        checkCollisions({state, dispatch}) {
            const cols = calculateCollisions(state.boxes)
            if (!cols.length) return
            cols.map(box => {
                dispatch('splitBox', {box: box, isLeft: box.angle > Math.PI})
            })
        },
        splitBox({state, commit}, {box, isLeft}) {
            commit('DELETE_BOX', box)
            let newSize = Math.floor(box.size / 2)
            if (newSize < state.conf.minBoxSize) return
            const distance = 2
            const speedCorrection = 6

            let upBox = new Box(
                isLeft ? box.xr - newSize - distance : box.x + distance,
                box.y,
                newSize,
                !isLeft ? RandomAngleFrom(FROM_LEFT) : RandomAngleFrom(FROM_RIGHT),
                box.speed + speedCorrection * Math.random()
            )
            commit('ADD_BOX', upBox)

            let downBox = new Box(
                isLeft ? box.xr - newSize - distance : box.x + distance,
                box.y + newSize + distance,
                newSize,
                !isLeft ? RandomAngleFrom(FROM_LEFT) : RandomAngleFrom(FROM_RIGHT),
                box.speed + speedCorrection * Math.random()
            )
            commit('ADD_BOX', downBox)
        }
    }
})
