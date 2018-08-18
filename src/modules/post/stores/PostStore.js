
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        collection: []
    },
    mutations: {
        setCollection(state, collection) {
            state.collection = collection;
        }
    },
    actions: {
        setCollection(context, collection) {
            context.commit('setCollection', collection);
        }
    }
});
