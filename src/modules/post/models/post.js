import rest from "../../../components/rest";
import event from "../../../components/event";
import store from "../stores/post";

export default {

    all(cb) {
        rest.get('v1/city', null, null, (response) => {
            let collection;
            if (response.status < 400) {
                collection = response.data;
                event.trigger('post-list', this.collection);
            } else {
                collection = [];
                event.trigger('post-list', this.collection);
            }
            if(typeof cb === "function") {
                cb(collection);
            }
            store.dispatch('setCollection', collection);
        });
    }
}
