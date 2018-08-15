import Vue from 'vue'
import * as uiv from 'uiv'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

Vue.use(VueRouter);
Vue.use(uiv);
Vue.use(Vuex);

import auth from './modules/account/models/auth'
import About from './modules/dashboard/controllers/About.vue'
import Dashboard from './modules/dashboard/controllers/Dashboard.vue'
import Login from './modules/account/controllers/Login.vue'
import Post from './modules/post/controllers/Post.vue'
import PostItem from './modules/post/controllers/PostItem.vue'

const generateApiUrl = function (uri) {
    let domain = 'http://api.extended.tpl';
    let version = 1;
    return domain + '/v' + version + '/' + uri;
}

function requireAuth(to, from, next) {
    if (!auth.loggedIn()) {
        next({
            path: '/login',
            query: {redirect: to.fullPath}
        })
    } else {
        next()
    }
}

const store = new Vuex.Store({
    state: {
        domain: 'http://api.extended.tpl',
        version: 1,
    },
    /*mutations: {
        getServerUrl (state) {
            state.count++
        }
    },
    computed: {
        getServerUrl () {
            domain + '/v' + version + '/v1/auth'
            return this.$store.;
        }
    }*/
});

const router = new VueRouter({
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
        {path: '/dashboard', component: Dashboard, beforeEnter: requireAuth},
        {path: '/login', component: Login},
        {
            path: '/logout',
            beforeEnter(to, from, next) {
                auth.logout();
                next('/')
            }
        }
    ]
});

vm = new Vue({
    router,
    store,
    data() {
        return {
            loggedIn: auth.loggedIn()
        }
    },
    created() {
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
                    <li><router-link to="/post">Post</router-link></li>

                </navbar-nav>

                <!--<navbar-nav right>
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
                </navbar-nav>-->
				
				<navbar-nav right>
                   <li><router-link v-if="loggedIn" to="/logout">Log out</router-link></li>
                    <li><router-link v-if="!loggedIn" to="/login">Log in</router-link></li>
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