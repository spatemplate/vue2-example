import client from "axios";
import Event from "./Event";
import store from "../config/store";

export default {

    post: function (uri, data, headers, cb) {
        this.beforeRequestTrigger(uri, data, headers, cb);
        const clientInstance = this.getInstance();
        let responsePromise = clientInstance.post(uri, data);
        return this.runResponsePromise(responsePromise, cb);
    },

    get: function (uri, data, headers, cb) {
        let url = uri;
        let queryString = encodeQueryData(data);
        if(queryString !== '') {
            url = url + '?' + queryString;
        }
        this.beforeRequestTrigger(url, data, headers, cb);
        let clientInstance = this.getInstance();
        let responsePromise = clientInstance.get(url);
        return this.runResponsePromise(responsePromise, cb);
    },

    beforeRequestTrigger(uri, data, headers, cb) {
        Event.trigger('rest-request-before', {uri: uri, data: data, headers: headers, cb: cb});
    },

    runResponsePromise(responsePromise, cb) {
        return responsePromise
            .then(response => {
                cb(response);
                Event.trigger('rest-request-after', response);
            })
            .catch(error => {
                cb(error.response);
                Event.trigger('rest-request-after', error.response);
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

}

function encodeQueryData(data) {
    let ret = [];
    for (let d in data)
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
}
