import ObjectHelper from "../../domain/helpers/ObjectHelper";

export default {

    parseQuery(uri) {
        let vars = uri.split('&');
        let getVars = {};
        let tmp = '';
        vars.forEach(function(v){
            tmp = v.split('=');
            if(tmp.length === 2)
                getVars[tmp[0]] = tmp[1];
        });
        return getVars;

    },

    parseUrl(uuu) {
        let uri = uuu.split('?');
        let result = {};
        result.route = uri[0];
        result.query = {};
        if (uri.length === 2) {
            result.query = this.parseQuery(uri[1]);
        }
        return result;
    },

    encodeQueryData(data) {
        let ret = [];
        for (let d in data)
            if(d !== '') {
                ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
            }
        return ret.join('&');
    },

    forgeUrlFromRequestEntity(requestEntity) {
        let url = requestEntity.uri;
        if(requestEntity.method === 'get' && requestEntity.data) {
            url = this.forgeUrl(url, requestEntity.data);
        }
        return url;
    },

    forgeUrl(uri, query) {
        let parse = this.parseUrl(uri);
        query = ObjectHelper.merge(parse.query, query);
        let url = parse.route;
        let queryString = this.encodeQueryData(query);
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
