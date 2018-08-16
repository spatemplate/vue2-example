/* globals localStorage */

import rest from "../../../components/rest";
import router from "../../../components/router";

export default {
    identity: {},
    login(email, pass, cb) {
        cb = arguments[arguments.length - 1];
        if (localStorage.token) {
            if (cb) cb(true);
            this.onChange(true);
            return
        }
        rest.post('v1/auth', {login: email, password: pass}, null, (response) => {
            if (response.status < 400) {
                localStorage.token = response.data.token;
                this.identity = response.data;
                if (cb) cb(response.data);
                this.onChange(true)
            } else if(response.status === 422) {
                if (cb) cb({
                    exception: 'Unprocessible entity',
                    code: 422,
                    data: response.data,
                });
                this.onChange(false)
            } else {
                if (cb) cb({
                    exception: 'Unknown error',
                    code: 1,
                    data: response.data,
                });
                this.onChange(false)
            }
        });

    },

    getIdentity() {
        if(this.identity === null) {
            router.push('/login');
            return null;
        } else {
            return this.identity;
        }
    },

    getToken() {
        return localStorage.token
    },

    logout(cb) {
        delete localStorage.token;
        if (cb) cb();
        this.onChange(false)
    },

    loggedIn() {
        return !!localStorage.token
    },

    onChange() {
    },

}


