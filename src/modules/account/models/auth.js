/* globals localStorage */

import rest from "../../../components/rest";
import event from "../../../components/event";
import authHelper from "../helpers/authHelper";

export default {
    identity: {},
    //isGuest: true,

    login(email, pass) {
        if (localStorage.token) {
            this.onChange();
            event.trigger('account-login-already-logged-exception', this.identity);
            return
        }
        rest.post('v1/auth', {login: email, password: pass}, null, (response) => {
            if (response.status < 400) {
                localStorage.token = response.data.token;
                this.setIdentity(response.data);
                event.trigger('account-login', response.data);
                this.onChange();
            } else if(response.status === 422) {
                event.trigger('account-login-exception', {
                    exception: 'Unprocessible entity',
                    code: 422,
                    data: response.data,
                });
                this.onChange()
            } else {
                event.trigger('account-login-exception', {
                    exception: 'Unknown error',
                    code: 1,
                    data: response.data,
                });
                this.onChange()
            }
        });

    },

    getIdentityFromApi() {
        rest.get('v1/auth', null, null, function (response) {
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

        this.setIdentity();
    },

    setIdentity(identity) {
        identity = typeof identity === "object" ? identity : {
            id: 0,
            login: 'Guest',
        };
        identity.token = localStorage.token;
        identity.isLogged = typeof identity.token !== "undefined";
        if(identity.isLogged) {
            identity.id = 1;
            identity.login = 'User';
        } else {
            identity.id = 0;
            identity.login = 'Guest';
        }
        //alert(this.isGuest);
        this.identity = identity;
        event.trigger('account-auth-change', identity);
        //alert(this.isGuest);
    },

    getToken() {
        return localStorage.token
    },

    logout() {
        delete localStorage.token;
        this.setIdentity({});
        //if (cb) cb();
        event.trigger('account-logout');
        this.onChange();
    },

    loggedIn() {
        return !!localStorage.token
    },

    onChange() {
        event.trigger('account-auth-change', this.identity);
    },

}
