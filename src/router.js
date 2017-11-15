import Vue from 'vue'
import Router from 'vue-router'

const Foo = () => import('./Foo.vue')
const Bar = () => import('./Bar.vue')
const Item = () => import('./Item.vue')

Vue.use(Router)

export function createRouter() {
    return new Router({
        mode: 'history',
        scrollBehavior: () => ({ y: 0 }),
        routes: [
            { path: '/', component: Foo },
            { path: '/link', component: Bar },
            { path: '/item/:id', component: Item },
        ],
    })
}