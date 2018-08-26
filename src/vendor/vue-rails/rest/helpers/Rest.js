import Http from "../drivers/axios/HttpDriver";
import store from "../../../../config/store";

export default {

    post: function (uri, data, headers, cb) {
        let requestEntity = {
            method: 'post',
            uri: uri,
            data: data,
            headers: headers,
        };
        return this.send(requestEntity, cb);
    },

    get: function (uri, data, headers, cb) {
        let requestEntity = {
            method: 'get',
            uri: uri,
            data: data,
            headers: headers,
        };
        return this.send(requestEntity, cb);
    },

    getClientConfig() {
        return {
            baseURL: store.config.server.domain + '/',
            headers: {
                'Authorization': store.auth.getters.token(),
            }
        };
    },

    send: function (requestEntity, cb) {
        const clientConfig = this.getClientConfig();
        let clientResponse = Http.send(requestEntity, cb, clientConfig);
        return this.forgeResponse(clientResponse);
    },

    /*send11111: function (requestEntity, cb) {
        if(requestEntity.method === 'get' && requestEntity.data) {
            requestEntity.uri = this.forgeUrl(requestEntity.uri, requestEntity.data);
        }
        Event.trigger('rest-request-before', requestEntity);
        const clientInstance = this.getInstance();
        const method = clientInstance[requestEntity.method];
        let responsePromise = method(requestEntity.uri, requestEntity.data);
        return this.runResponsePromise(responsePromise, cb);
    },*/

    forgePaginate(clientResponse) {
        if(!clientResponse.headers) {
            return null;
        }
        let headers = clientResponse.headers;
        if(headers['x-pagination-current-page'] || ['x-pagination-total-count']) {
            return {
                currentPage: headers['x-pagination-current-page'] ? headers['x-pagination-current-page'] : 1,
                pageCount: headers['x-pagination-page-count'] ? headers['x-pagination-page-count'] : 0,
                perPage: headers['x-pagination-per-page'] ? headers['x-pagination-per-page'] : 10,
                totalCount: headers['x-pagination-total-count'] ? headers['x-pagination-total-count'] : 0,
            };
        }
        return null;
    },

    forgeResponse(clientResponse) {
        clientResponse.paginate = this.forgePaginate(clientResponse);
        return clientResponse;
    },

}
