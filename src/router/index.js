import Vue from 'vue'
import VueRouter from 'vue-router'
import StartPage from "@/components/Pages/StartPage";
import Game from "@/components/Pages/Game";

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
