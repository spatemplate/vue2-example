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
</template>

<script>
    import auth from '../../../modules/account/models/auth'
    import config from '../../../components/config'

    export default {
        name: 'app',
        data() {
            return {
                loggedIn: auth.loggedIn(),
                config: config,
            }
        },
        created() {
            auth.onChange = loggedIn => {
                this.loggedIn = loggedIn
            }
        },
    }
</script>
