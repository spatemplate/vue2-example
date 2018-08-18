import Vue from 'vue'
import * as uiv from 'uiv'
import router from './components/router'
import App from './modules/app/controllers/App'
//import config from './components/config'
import autorun from "./components/autorun";
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
