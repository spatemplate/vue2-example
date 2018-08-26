import client from "axios";
import Event from "../../../app/helpers/Event";

export default {

    send: function (requestEntity, cb, clientConfig) {
        if(requestEntity.method === 'get' && requestEntity.data) {
            requestEntity.uri = this.forgeUrl(requestEntity.uri, requestEntity.data);
        }
        Event.trigger('rest-request-before', requestEntity);
        const clientInstance = this.getInstance(clientConfig);
        const method = clientInstance[requestEntity.method];
        return method(requestEntity.uri, requestEntity.data);
    },

    getInstance(clientConfig) {
        if(typeof clientConfig !== "object") {
            clientConfig = {};
        }
        return client.create(clientConfig);
    },

    forgeUrl(uri, query) {
        return uri;
        let url = uri;
        let queryString = this.encodeQueryData(query);
        if(queryString !== '') {
            if(url[0] === '?') {
                url = url + '&';
            } else {
                url = url + '?';
            }
            url = url + queryString;
        }
        return url;
    },

    encodeQueryData(data) {
        let ret = [];
        for (let d in data)
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        return ret.join('&');
    },

    createResponse(clientResponse) {
        if(clientResponse.response) {
            clientResponse = clientResponse.response;
        }
        let response = {};
        response.status = clientResponse.status;
        response.data = clientResponse.data;
        response.headers = clientResponse.headers;
        if(response.status < 400) {
            response.error = null;
        } else if(response.status >= 400 && response.status < 500) {
            response.error = 'client';
        } else if(response.status >= 500) {
            response.error = 'server';
        }
        return response;
    },

}
