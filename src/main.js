import Vue from 'vue'
import * as uiv from 'uiv'
import router from './helpers/router'
import App from './components/App'
import autorun from "./config/autorun";

Vue.use(uiv);

new Vue({
    router,
    created() {
        autorun.runAll();
    },
    template: '<App/>',
    components: { App }

}).$mount('#app');
