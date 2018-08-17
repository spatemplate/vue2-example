<template>
    <div id="app">
        <div class="wrap">
            <header class="main-header">
                <navbar>
                    <a slot="brand" href="#"></a>
                    <router-link class="navbar-brand" to="/">{{ config.app.title }}</router-link>
                    <template slot="collapse">
                        <navbar-nav>

                            <li><router-link to="/about">about</router-link></li>
                            <li><router-link to="/post">Post</router-link></li>

                        </navbar-nav>

                        <navbar-nav right>
                            <li><router-link v-if="!auth.isGuest" to="/logout" >{{ auth.identity.login }} log out</router-link></li>
                            <li><router-link v-if="auth.isGuest" to="/login">Log in</router-link></li>
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
    import auth from '../../../modules/account/models/auth'
    import config from '../../../components/config'

    import CommonEvents from "../../../events/common";
    import HeaderBar from '../../../components/HeaderBar'

    export default {
        name: 'app',
        data() {
            return {
                identity: auth.identity,
                loggedIn: !auth.isGuest,
                config: config,
                auth: auth,
            }
        },

        setIdentity(identity) {
            this.identity = identity;
            //this.loggedIn = loggedIn;
        },

        created() {


            /*auth.onChange = loggedIn => {
                this.loggedIn = loggedIn;
                //this.setIdentity(auth.identity);
            };*/
            auth.init();
        },
        setIsLogged: function (isLogged) {
            //alert(isLogged)
            this.loggedIn = isLogged;
        }
        /*components: {
            HeaderBar
        },*/
    }
</script>
