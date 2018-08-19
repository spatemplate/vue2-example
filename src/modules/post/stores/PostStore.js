
import Vue from 'vue'
import Vuex from 'vuex'
import PostModel from "../models/PostModel";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        paginate: null,
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
        setPaginate(state, paginate) {
            state.paginate = paginate;
        },
    },
    actions: {
        all(context, query) {
            let callback = (response) => {
                let collection = [];
                if (response.status < 400) {
                    collection = response.data;
                }
                let paginate = {
                    currentPage: response.headers['x-pagination-current-page'],
                    pageCount: response.headers['x-pagination-page-count'],
                    perPage: response.headers['x-pagination-per-page'],
                    totalCount: response.headers['x-pagination-total-count'],
                };
                context.commit('setPaginate', paginate);
                context.commit('setCollection', collection);
            };
            context.commit('setCollection', null);
            PostModel.all(query, callback);
        },
        one(context, id) {
            let callback = (response) => {
                let entity = null;
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
