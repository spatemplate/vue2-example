<template>
    <div class="wrap">
        <header class="main-header">
            <header-bar></header-bar>
        </header>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import HeaderBar from './HeaderBar'

    export default {
        components: {
            HeaderBar,
        }
    }
</script>
