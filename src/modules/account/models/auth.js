/* globals localStorage */

import rest from "../../../components/rest";

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
                if (cb) cb(true);
                this.onChange(true)
            } else {
                // console.log(res.response.data);
                if (cb) cb(false);
                this.onChange(false)
            }
        });

    },

    accountInfo(cb) {
        rest.get('v1/auth', null, null, (response) => {
            if (response.status < 400) {
                if (cb) cb(true);
            } else {
                // console.log(res.response.data);
                if (cb) cb(false);
            }
        });
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


