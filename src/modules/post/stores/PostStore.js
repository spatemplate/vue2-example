
import Vue from 'vue'
import Vuex from 'vuex'
import PostModel from "../models/PostModel";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        collection: null,
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
    actions: {
        all(context) {
            let callback = (response) => {
                let collection = [];
                if (response.status < 400) {
                    collection = response.data;
                }
                context.commit('setCollection', collection);
            };
            PostModel.all(callback);
        },
        one(context, id) {
            let callback = (response) => {
                let entity = {};
                if (response.status < 400) {
                    entity = response.data;
                }
                context.commit('setEntity', entity);
            };
            context.commit('setEntity', null);
            PostModel.one(id, callback);
        },
    },
});
