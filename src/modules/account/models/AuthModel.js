import Rest from "../../../helpers/Rest";

export default {

    login(email, pass, cb) {
        return Rest.post('v1/auth', {login: email, password: pass}, null, cb);
    },

    info(cb) {
        return Rest.get('v1/auth', null, null, cb);
    },

}
