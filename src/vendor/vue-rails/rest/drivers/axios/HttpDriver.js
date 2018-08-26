import client from "axios";
import Event from "../../../app/helpers/Event";
import store from "../../../../../config/store";

export default {


    send: function (requestEntity, cb, clientConfig) {
        if(requestEntity.method === 'get' && requestEntity.data) {
            requestEntity.uri = this.forgeUrl(requestEntity.uri, requestEntity.data);
        }
        Event.trigger('rest-request-before', requestEntity);
        const clientInstance = this.getInstance(clientConfig);
        const method = clientInstance[requestEntity.method];
        let responsePromise = method(requestEntity.uri, requestEntity.data);
        return this.runResponsePromise(responsePromise, cb);
    },

    getInstance(clientConfig) {
        if(typeof clientConfig !== "object") {
            clientConfig = {};
        }
        return client.create(clientConfig);
    },

    forgeUrl(uri, query) {
        let url = uri;
        let queryString = this.encodeQueryData(query);
        if(queryString !== '') {
            url = url + '?' + queryString;
        }
        return url;
    },

    runResponsePromise(responsePromise, cb) {
        return responsePromise
            .then(response => {
                return this.runAfterResponse(response, cb);
            })
            .catch(error => {
                return this.runAfterResponse(error, cb);
            });
    },

    runAfterResponse(clientResponse, cb) {
        let response = this.createResponse(clientResponse);
        Event.trigger('rest-request-after', response);
        return cb(response);
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
        //response.paginate = this.forgePaginate(clientResponse);
        return response;
    },

}
