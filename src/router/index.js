import Vue from 'vue'
import VueRouter from 'vue-router'
import StartPage from "@/components/StartPage";
import Game from "@/components/Game";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Start',
        component: StartPage
    },
    {
        path: '/game',
        name: 'Game',
        component: Game
    }
]

const router = new VueRouter({
    routes
})

export default router
