<template>
    <div id="app">
        <div class="wrap">
            <header class="main-header">
                <navbar>
                    <router-link slot="brand" class="navbar-brand" to="/">{{ store.config.app.title }}</router-link>
                    <template slot="collapse">
                        <navbar-nav>

                            <li><router-link to="/about">about</router-link></li>
                            <li><router-link to="/post">Post</router-link></li>

                        </navbar-nav>

                        <navbar-nav right>
                            <li><router-link v-if="store.auth.getters.isLogged()" to="/profile" >{{ store.auth.state.identity.login }}</router-link></li>
                            <li><router-link v-if="store.auth.getters.isLogged()" to="/logout" >log out</router-link></li>
                            <li><router-link v-if="!store.auth.getters.isLogged()" to="/login">Log in</router-link></li>
                        </navbar-nav>

                    </template>
                </navbar>

            </header>
            <div class="container">
                <router-view class="view"></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import store from '../config/store'
    //import config from '../../../components/config'

    export default {
        name: 'app',
        data() {
            return {
                store: store,
            }
        },
    }
</script>
