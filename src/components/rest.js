import config from "./config";
import axios from "axios";
import auth from "../modules/account/models/auth";

export default {

    post: function (uri, data, headers, cb) {
        axios.post(config.server.domain + '/' + uri, data, cb)
            .then(response => {
                //console.log(response.data);
                cb(response);
            })
            .catch(error => {
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
                //if (error.response.status === 422) {
                //    console.log(error.response.data);
                //}
                cb(error.response)
            })
    },

};
