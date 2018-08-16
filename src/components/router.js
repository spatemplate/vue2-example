import Vue from 'vue'
import Router from 'vue-router'

import auth from '../modules/account/models/auth'
import About from '../modules/dashboard/controllers/About.vue'
import Dashboard from '../modules/dashboard/controllers/Dashboard.vue'
import Login from '../modules/account/controllers/Login.vue'
import Post from '../modules/post/controllers/Post.vue'
import PostItem from '../modules/post/controllers/PostItem.vue'
import authHelper from "../modules/account/helpers/authHelper";

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: __dirname,
    routes: [
        {path: '/', component: Dashboard},
        {path: '/post', component: Post},
        {
            path: '/post/:id',
            name: 'post',
            component: PostItem,
            props: true,
        },
        {path: '/about', component: About},
        {path: '/dashboard', component: Dashboard, beforeEnter: authHelper.requireAuth},
        {path: '/login', component: Login},
        {
            path: '/logout',
            beforeEnter(to, from, next) {
                auth.logout();
                next('/')
            }
        }
    ]
})