/* globals localStorage */

import rest from "../../../components/rest";
import event from "../../../components/event";
import authHelper from "../helpers/authHelper";

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
                event.trigger('account-login', response.data);
                this.onChange(true);
            } else if(response.status === 422) {
                if (cb) cb({
                    exception: 'Unprocessible entity',
                    code: 422,
                    data: response.data,
                });
                event.trigger('account-login-exception', {
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
                event.trigger('account-login-exception', {
                    exception: 'Unknown error',
                    code: 1,
                    data: response.data,
                });
                this.onChange(false)
            }
        });

    },

    getIdentityFromApi() {
        let cb = function (response) {
            if (response.status === 401) {
                authHelper.redirectToLoginPage();
            }
            if (response.status >= 200) {
                this.identity = response.data;
            }
        };
        rest.get('v1/auth', null, null, cb);
    },

    getIdentity() {
        if(this.identity.id) {
            this.getIdentityFromApi();
        }

        if(this.identity.id) {
            authHelper.redirectToLoginPage();
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
        this.identity = {};
        if (cb) cb();
        event.trigger('account-logout');
        this.onChange(false);
    },

    loggedIn() {
        return !!localStorage.token
    },

    onChange() {
    },

}
