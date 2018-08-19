
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loading: false,
        count: 0,
    },
    mutations: {
        showLoading(state) {
            state.count++;
            this.commit('setLoading');
        },
        hideLoading(state) {
            if(state.count > 0) {
                state.count--;
                this.commit('setLoading');
            }
        },
        setLoading(state) {
            state.loading = state.count > 0;
        },

    },
    actions: {
        showLoading(context) {
            context.commit('showLoading');
        },
        hideLoading(context) {
            context.commit('hideLoading');
        },
    },
});
