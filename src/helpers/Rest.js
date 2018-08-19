import client from "axios";
import Event from "./Event";
import store from "../config/store";

export default {

    post: function (uri, data, headers, cb) {
        Event.trigger('rest-before', {uri: uri, data: data, headers: headers, cb: cb});
        const clientInstance = this.getInstance();
        return clientInstance.post(uri, data, cb)
            .then(response => {
                cb(response);
            })
            .catch(error => {
                this.errorHandle(error.response);
                cb(error.response)
            });
    },

    get: function (uri, data, headers, cb) {
        Event.trigger('rest-before', {uri: uri, data: data, headers: headers, cb: cb});
        const clientInstance = this.getInstance();
        return clientInstance.get(uri, cb)
            .then(response => {
                cb(response);
                Event.trigger('rest-end-success', response);
            })
            .catch(error => {
                this.errorHandle(error.response);
                cb(error.response);
                Event.trigger('rest-end-error', error.response);
            });
    },

    getInstance() {
         return client.create({
            baseURL: store.config.server.domain + '/',
            headers: {
                'Authorization': store.auth.getters.token(),
            }
        });
    },

    errorHandle(response) {
        if (response.status >= 500) {
            Event.trigger('rest-server-exception');
        }
        if (response.status === 401) {
            store.auth.dispatch('logout');
            Event.trigger('rest-unauthorized-exception');
        }
        if (response.status === 403) {
            Event.trigger('rest-forbidden-exception');
        }
        if (response.status === 422) {
            Event.trigger('rest-unprocessible-exception', response);
        }
    },

}