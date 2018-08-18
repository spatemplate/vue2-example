import config from "./config";
import axios from "axios";
//import auth from "../modules/account/models/auth";
import authHelper from "../modules/account/helpers/authHelper";
import event from "./event";
import auth from "../modules/account/stores/auth";

function errorHandle(response) {
    if (response.status >= 500) {
        alert('Server error!!');
    }
    if (response.status === 401) {
        event.trigger('unauthorized-exception');
    }
    if (response.status === 403) {
        alert('Forbidden!');
    }
}

export default {

    post: function (uri, data, headers, cb) {
        event.trigger('rest-before', {uri: uri, data: data, headers: headers, cb: cb});
        const axiosInstance = this.getInstance();
        axiosInstance.post(config.server.domain + '/' + uri, data, cb)
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
            baseURL: config.server.domain + '/',
            headers: {'Authorization': auth.getters.token()}
        });
    },

};
