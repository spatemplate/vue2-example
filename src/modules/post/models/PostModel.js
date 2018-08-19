import Rest from "../../../helpers/Rest";
import Event from "../../../helpers/Event";
import store from '../../../config/store'

export default {

    all(cb) {
        let callback = (response) => {
            let collection;
            if (response.status < 400) {
                collection = response.data;
                Event.trigger('post-all', collection);
            } else {
                collection = [];
                Event.trigger('post-all', collection);
            }
            if(typeof cb === "function") {
                cb(collection);
            }
            store.post.commit('setCollection', collection);
        };
        Rest.get('v1/city', null, null, callback);
    },

    oneById(id, cb) {
        Rest.get('v1/city/' + id, null, null, (response) => {
            let entity;
            if (response.status < 400) {
                entity = response.data;
                Event.trigger('post-one', entity);
            } else {
                entity = [];
                Event.trigger('post-one', entity);
            }
            if(typeof cb === "function") {
                cb(entity);
            }
            store.post.commit('setEntity', entity);
        });
    }
}
