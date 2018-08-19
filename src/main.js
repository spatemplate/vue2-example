import Vue from 'vue'
import router from './helpers/Router'
import Layout from './components/Layout'
import AutoRun from "./config/autorun";

new Vue({
    el: '#app',
    router,
    created() {
        AutoRun.init();
    },
    template: '<Layout/>',
    components: {
        Layout,
    }
});
