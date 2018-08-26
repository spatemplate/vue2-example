import Http from "../drivers/axios/HttpDriver";
import store from "../../../../config/store";
import Event from "../../app/helpers/Event";

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
        let responsePromise = Http.send(requestEntity, cb, clientConfig);

        //return this.forgeResponse(clientResponse);
        return this.runResponsePromise(responsePromise, cb);
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
        let response = Http.createResponse(clientResponse);
        response.paginate = this.forgePaginate(response);
        Event.trigger('rest-request-after', response);
        return cb(response);
    },

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

}
