import axios from "axios";
import event from "./event";
import auth from "../modules/account/stores/auth";
import store from "../config/store";

function errorHandle(response) {
    if (response.status >= 500) {
        event.trigger('rest-server-exception');
    }
    if (response.status === 401) {
        event.trigger('rest-unauthorized-exception');
    }
    if (response.status === 403) {
        event.trigger('rest-forbidden-exception');
    }
}

export default {

    post: function (uri, data, headers, cb) {
        event.trigger('rest-before', {uri: uri, data: data, headers: headers, cb: cb});
        const axiosInstance = this.getInstance();
        axiosInstance.post(uri, data, cb)
            .then(response => {
                cb(response);
            })
            .catch(error => {
                errorHandle(error.response);
                cb(error.response)
            })
    },

    get: function (uri, data, headers, cb) {
        event.trigger('rest-before', {uri: uri, data: data, headers: headers, cb: cb});
        const axiosInstance = this.getInstance();
        axiosInstance.get(uri, cb)
            .then(response => {
                cb(response);
                event.trigger('rest-end-success', response);
            })
            .catch(error => {
                errorHandle(error.response);
                cb(error.response);
                event.trigger('rest-end-error', error.response);
            })
    },

    getInstance() {
         return axios.create({
            baseURL: store.config.server.domain + '/',
            headers: {'Authorization': auth.getters.token()}
        });
    },

};
