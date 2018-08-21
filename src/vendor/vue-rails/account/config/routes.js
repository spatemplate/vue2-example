import Login from '../pages/Login.vue'
import Logout from '../pages/Logout.vue'

export default {
    routes: [
        {path: '/login', component: Login},
        {path: '/logout', component: Logout},
    ],
}