import All from '../pages/All.vue'
import One from '../pages/One.vue'

export default {
    routes: [
        {path: '/post', component: All},
        {path: '/post/:id', component: One, name: 'post', props: true},
        {path: '/post/page/:page', component: All, name: 'post/page', props: true},
    ],
}