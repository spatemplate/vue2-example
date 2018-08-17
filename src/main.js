import Vue from 'vue'
import * as uiv from 'uiv'
import router from './components/router'
import App from './modules/app/controllers/App'
import config from './components/config'
import auth from "./modules/account/models/auth";
import CommonEvents from "./events/common";

Vue.use(uiv);

CommonEvents.registerAll();

vm = new Vue({
    router,
    config,
    template: '<App/>',
    components: { App }

}).$mount('#app');

//auth.init();