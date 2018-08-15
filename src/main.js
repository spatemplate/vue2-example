import Vue from 'vue'
import * as uiv from 'uiv'
import router from './components/router'
import App from './modules/app/controllers/App'
import config from './components/config'

Vue.use(uiv);

vm = new Vue({
    router,
    config,
    template: '<App/>',
    components: { App }

}).$mount('#app');