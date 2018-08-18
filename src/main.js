import Vue from 'vue'
import * as uiv from 'uiv'
import router from './helpers/router'
import Layout from './components/Layout'
import AutoRun from "./config/autorun";

Vue.use(uiv);

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
