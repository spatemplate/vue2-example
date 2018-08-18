import About from '../modules/dashboard/pages/About.vue'
import Dashboard from '../modules/dashboard/pages/Dashboard.vue'
import Login from '../modules/account/pages/Login.vue'
import Logout from '../modules/account/pages/Logout.vue'
import PostAll from '../modules/post/pages/All.vue'
import PostOne from '../modules/post/pages/One.vue'

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