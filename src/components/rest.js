import config from "./config";
import axios from "axios";
import auth from "../modules/account/models/auth";
import router from "./router";

function errorHandle(response) {
    if (response.status === 401) {
        auth.logout(function () {});
        router.push('/login');
    }
    if (response.status === 403) {
        alert('Forbidden!');
    }
}

export default {

    post: function (uri, data, headers, cb) {
        axios.post(config.server.domain + '/' + uri, data, cb)
            .then(response => {
                //console.log(response.data);
                cb(response);
            })
            .catch(error => {
                errorHandle(error.response);
                //if (error.response.status === 422) {
                //    console.log(error.response.data);
                //}
                cb(error.response)
            })
    },

    get: function (uri, data, headers, cb) {
        const axiosInstance = axios.create({
            headers: headers,
        });
        axiosInstance.headers.Authorization = auth.getToken();
        axiosInstance.get(config.server.domain + '/' + uri, cb)
            .then(response => {
                //console.log(response.data);
                cb(response);
            })
            .catch(error => {
                errorHandle(error.response);
                //if (error.response.status === 422) {
                //    console.log(error.response.data);
                //}
                cb(error.response)
            })
    },

};
