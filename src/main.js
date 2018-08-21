import Vue from 'vue'
import router from './vendor/vue-rails/app/helpers/Router'
import Layout from './components/Layout'
import AutoRun from "./config/autorun";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap-theme.min.css";

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
