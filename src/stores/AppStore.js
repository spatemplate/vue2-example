
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loading: false,
        loadingRequestCount: 0,
    },
    mutations: {
        showLoading(state) {
            state.loadingRequestCount++;
            this.commit('updateLoading');
        },
        hideLoading(state) {
            if(state.loadingRequestCount > 0) {
                state.loadingRequestCount--;
                this.commit('updateLoading');
            }
        },
        updateLoading(state) {
            state.loading = state.loadingRequestCount > 0;
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
