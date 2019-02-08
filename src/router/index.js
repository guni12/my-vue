import Vue from 'vue'
import Router from 'vue-router'
import Me from '@/components/Me'
import Report from '@/components/Report'
import CreateReport from '@/components/CreateReport'
import UpdateReport from '@/components/UpdateReport'
import Login from '@/components/Login'
//import store from '@/store/'

Vue.use(Router)

var token = "";

if (localStorage.getItem('token')) {
    token = JSON.parse(localStorage.getItem('token'));
}

const ifNotAuthenticated = (to, from, next) => {
    if (!token) {
        next()
        return
    }
    next('/')
}

const ifAuthenticated = (to, from, next) => {
    if (token) {
        next()
        return
    }
    next('/login')
}


//console.log("localStorage", JSON.parse(localStorage.getItem('token')))

export default new Router({
  routes: [
    {
        path: '/',
        name: 'Me',
        component: Me
    },
    {
        path: '/reports/:kmom',
        name: 'Redovisning',
        component: Report,
    },
    {
        path: '/reports',
        name: 'Redovisa',
        component: CreateReport,
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/update',
        name: 'Uppdatera text',
        component: UpdateReport,
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter: ifNotAuthenticated,
    }
  ]
})
