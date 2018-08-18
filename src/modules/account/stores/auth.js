
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        identity: {}
    },
    mutations: {
        setIdentity(state, identity) {
            //console.log(identity);
            state.identity = identity;
        }
    },
    actions: {
        setIdentity(context, identity) {
            context.commit('setIdentity', identity);
        }
    }
});
