import Vuex from 'vuex'
import Vue from 'vue'
import auth from "../modules/account/stores/auth";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
    }
})
