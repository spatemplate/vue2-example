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

}
