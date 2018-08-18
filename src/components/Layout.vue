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
    import NavBar from './NavBar'

    export default {
        components: {
            NavBar,
        }
    }
</script>
