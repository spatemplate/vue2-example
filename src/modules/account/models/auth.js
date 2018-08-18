import rest from "../../../components/rest";
import event from "../../../components/event";
import authHelper from "../helpers/authHelper";

export default {

    identity: {},

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
        if(!this.identity.isLogged) {
            return;
        }
        rest.get('v1/auth', null, null, (response) => {
            if (response.status === 401) {
                this.logout(function(){});
                event.trigger('account-get-identity', {});
                this.setIdentity();
                authHelper.redirectToLoginPage();
            }
            if (response.status >= 200) {
                this.setIdentity(response.data);
                event.trigger('account-get-identity', response.data);
            }
        });
    },

    init() {
        this.setIdentity();
        this.getIdentityFromApi();
    },

    setIdentity(identity) {
        identity = typeof identity === "object" ? identity : {};
        identity.token = localStorage.token;
        identity.isLogged = typeof identity.token !== "undefined";
        if(identity.isLogged) {
            identity.id = 1;
            identity.login = 'User';
        } else {
            identity.id = 0;
            identity.login = 'Guest';
        }
        this.identity = identity;
        event.trigger('account-auth-change', identity);
    },

    logout() {
        if(!this.identity.isLogged) {
            return;
        }
        delete localStorage.token;
        this.setIdentity({});
        event.trigger('account-logout');
        this.onChange();
    },

    onChange() {
        event.trigger('account-auth-change', this.identity);
    },

}
