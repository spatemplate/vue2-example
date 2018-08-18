import Vue from 'vue'
import * as uiv from 'uiv'
import router from './helpers/router'
import App from './components/App'
//import config from './components/config'
import autorun from "./helpers/autorun";
//import store from './components/store'

Vue.use(uiv);

new Vue({
    router,
    //config,
    //store,
    created() {
        autorun.runAll();
    },
    template: '<App/>',
    components: { App }

}).$mount('#app');
