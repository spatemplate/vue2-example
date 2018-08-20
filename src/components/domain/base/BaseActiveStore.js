import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({

    state: {
        paginate: null,
        collection: null,
        entity: null,
        query: null,
        modelObject: null,
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
        setModelObject(state, modelObject) {
            state.modelObject = modelObject;
        },
    },
    actions: {
        setModelObject(context, modelObject) {
            context.commit('setModelObject', modelObject);
        },
        all(context, query) {
            let callback = (response) => {
                let collection = null;
                let paginate = null;
                if (!response.error) {
                    collection = response.data;
                    paginate = response.paginate;
                }
                context.commit('setPaginate', paginate);
                context.commit('setCollection', collection);
            };
            context.commit('setCollection', null);
            context.state.modelObject.all(query, callback);
        },
        oneById(context, id) {
            let callback = (response) => {
                let entity = null;
                if (!response.error) {
                    entity = response.data;
                }
                context.commit('setEntity', entity);
            };
            context.commit('setEntity', null);
            context.state.modelObject.oneById(id, callback);
        },
    }
})
