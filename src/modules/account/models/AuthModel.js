import Rest from "../../rest/helpers/Rest";

export default {

    uri: 'v1/auth',

    auth(email, pass, cb) {
        return Rest.post(this.uri, {login: email, password: pass}, null, cb);
    },

    info(cb) {
        return Rest.get(this.uri, null, null, cb);
    },

}
