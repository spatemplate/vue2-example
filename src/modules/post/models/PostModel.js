import Rest from "../../../helpers/Rest";
import Event from "../../../helpers/Event";
import store from '../../../config/store'

export default {

    all(cb) {
        Rest.get('v1/city', null, null, (response) => {
            let collection;
            if (response.status < 400) {
                collection = response.data;
                Event.trigger('post-list', this.collection);
            } else {
                collection = [];
                Event.trigger('post-list', this.collection);
            }
            if(typeof cb === "function") {
                cb(collection);
            }
            store.post.dispatch('setCollection', collection);
        });
    }
}
