<template>
    <div class="wrap">
        <header class="main-header">
            <nav-bar></nav-bar>
        </header>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import * as uiv from 'uiv'
    import NavBar from './NavBar'

    Vue.use(uiv);

    export default {
        components: {
            NavBar,
        }
    }
</script>
