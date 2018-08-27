import client from "axios";
import Event from "../../../app/helpers/Event";
import UrlHelper from "../../helpers/UrlHelper";
import ObjectHelper from "../../../domain/helpers/ObjectHelper";

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
        let parse = UrlHelper.parseUrl(uri);
        query = ObjectHelper.merge(parse.query, query);
        let url = parse.route;
        let queryString = UrlHelper.encodeQueryData(query);
        if(queryString !== '') {
            url = url + '?' + queryString;
        }
        return url;
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
