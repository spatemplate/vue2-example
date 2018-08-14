import Vue from 'vue'
import * as uiv from 'uiv'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
Vue.use(uiv);

import auth from './auth'
import App from './components/App.vue'
import About from './components/About.vue'
import Dashboard from './components/Dashboard.vue'
import Login from './components/Login.vue'
import Post from './components/Post.vue'
import PostItem from './components/PostItem.vue'

function requireAuth (to, from, next) {
    if (!auth.loggedIn()) {
        next({
            path: '/login',
            query: { redirect: to.fullPath }
        })
    } else {
        next()
    }
}

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        { path: '/', component: Dashboard },
        { path: '/app', component: App },
        { path: '/post', component: Post },
        {
            path: '/post/:id',
            name:'post',
            component: PostItem,
            props: true,
        },
        { path: '/about', component: About },
        { path: '/dashboard', component: Dashboard, beforeEnter: requireAuth },
        { path: '/login', component: Login },
        { path: '/logout',
            beforeEnter (to, from, next) {
                auth.logout();
                next('/')
            }
        }
    ]
});

new Vue({
    router,
    data () {
        return {
            loggedIn: auth.loggedIn()
        }
    },
    created () {
        auth.onChange = loggedIn => {
            this.loggedIn = loggedIn
        }
    },
    template: `
    <div id="app">
      <div class="wrap">
    <header class="main-header">
        <navbar>
            <a slot="brand" href="#"></a>
            <router-link class="navbar-brand" to="/">Brand</router-link>
            <template slot="collapse">
                <navbar-nav>

                    <li><router-link to="/about">about</router-link></li>
                    <li><router-link to="/app">app</router-link></li>
                    <li><router-link to="/post">Post</router-link></li>

                    <li><router-link v-if="loggedIn" to="/logout">Log out</router-link></li>
                    <li><router-link v-if="!loggedIn" to="/login">Log in</router-link></li>
        
                </navbar-nav>

                <navbar-nav right>
                    <dropdown tag="li">
                        <a class="dropdown-toggle" role="button">Quux <span class="caret"></span></a>
                        <template slot="dropdown">
                            <li><router-link to="/quux/1">quux/1</router-link></li>
                            <li><router-link to="/quux/2">quux/2</router-link></li>
                        </template>
                    </dropdown>
                </navbar-nav>

                <navbar-nav right>
                    <dropdown tag="li">
                        <a class="dropdown-toggle" role="button">Dropdown <span class="caret"></span></a>
                        <template slot="dropdown">
                            <li><a role="button">Action</a></li>
                            <li><a role="button">Another action</a></li>
                            <li><a role="button">Something else here</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a role="button">Separated link</a></li>
                        </template>
                    </dropdown>
                </navbar-nav>
            </template>
        </navbar>

    </header>
    <div class="container">
        <router-view class="view"></router-view>
    </div>
</div>
    </div>
  `
}).$mount('#app');