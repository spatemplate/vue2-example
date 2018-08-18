import About from '../modules/dashboard/controllers/About.vue'
import Dashboard from '../modules/dashboard/controllers/Dashboard.vue'
import Login from '../modules/account/controllers/Login.vue'
import Logout from '../modules/account/controllers/Logout.vue'
import PostAll from '../modules/post/controllers/All.vue'
import PostOne from '../modules/post/controllers/One.vue'

export default [
    {path: '/', component: Dashboard},
    {path: '/post', component: PostAll},
    {
        path: '/post/:id',
        name: 'post',
        component: PostOne,
        props: true,
    },
    {path: '/about', component: About},
    {path: '/dashboard', component: Dashboard},
    {path: '/login', component: Login},
    {path: '/logout', component: Logout}
]