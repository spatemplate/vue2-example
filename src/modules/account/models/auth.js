/* globals localStorage */

import rest from "../../../components/rest";
import event from "../../../components/event";
import authHelper from "../helpers/authHelper";

export default {
    identity: {},
    isGuest: true,

    login(email, pass, cb) {
        cb = arguments[arguments.length - 1];
        if (localStorage.token) {
            if (cb) cb(true);
            this.onChange(true);
            event.trigger('account-login-already-logged-exception', this.identity);
            return
        }
        rest.post('v1/auth', {login: email, password: pass}, null, (response) => {
            if (response.status < 400) {
                localStorage.token = response.data.token;
                this.setIdentity(response.data);
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
        //alert('this.isGuest');
        /*let cb = ;*/
        rest.get('v1/auth', null, null, function (response) {
            //alert('response');
            if (response.status === 401) {
                //this.logout(function(){});
                event.trigger('account-get-identity', {});
                this.setIdentity({});
                authHelper.redirectToLoginPage();
            }
            if (response.status >= 200) {
                this.setIdentity(response.data);
                event.trigger('account-get-identity', response.data);
            }
        });
    },

    getIdentity() {
        //this.setIdentity(this.identity);
        //alert(localStorage.token);
        /*if(this.isGuest) {

            this.getIdentityFromApi();
        }
        //alert(this.isGuest);
        this.setIdentity(this.identity);*/
    },

    init() {

        this.setIdentity({});
    },

    setIdentity(identity) {

        this.identity = identity;
        this.isGuest = typeof localStorage.token === "undefined";
        //alert(this.isGuest);
        event.trigger('account-auth-change', !this.isGuest);
        //alert(this.isGuest);
    },

    getToken() {
        return localStorage.token
    },

    logout(cb) {
        delete localStorage.token;
        this.setIdentity({});
        if (cb) cb();
        event.trigger('account-logout');
        this.onChange(false);
    },

    loggedIn() {
        return !!localStorage.token
    },

    onChange(loggedIn) {
        event.trigger('account-auth-change', loggedIn);
    },

}
