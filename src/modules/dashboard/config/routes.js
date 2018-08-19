import About from '../pages/About.vue'
import Dashboard from '../pages/Dashboard.vue'

export default {
    routes: [
        {path: '/', component: Dashboard},
        {path: '/about', component: About},
    ],
}