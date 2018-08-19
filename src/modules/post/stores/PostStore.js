
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        collection: [],
        entity: null,
    },
    mutations: {
        setCollection(state, collection) {
            state.collection = collection;
        },
        setEntity(state, entity) {
            state.entity = entity;
        },
    },
});
