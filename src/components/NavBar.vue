<template>
    <navbar>
        <router-link slot="brand" class="navbar-brand" to="/">{{ store.config.app.title }}</router-link>
        <template slot="collapse">
            <navbar-nav>
                <li><router-link to="/about">about</router-link></li>
                <li><router-link to="/post">Post</router-link></li>
                <li v-if="store.app.state.loading"><a href="#"><i class="fa fa-spinner fa-spin"></i></a></li>
            </navbar-nav>
            <navbar-nav right>
                <li><router-link v-if="store.auth.state.identity" to="/">{{ store.auth.state.identity.login }}</router-link></li>
                <li><router-link v-if="store.auth.state.identity" to="/logout">log out</router-link></li>
                <li><router-link v-if="!store.auth.state.identity" to="/login">Log in</router-link></li>
            </navbar-nav>
        </template>
    </navbar>
</template>

<script>
    import store from '../config/store'

    export default {
        data() {
            return {
                store: store,
            }
        },
    }
</script>
