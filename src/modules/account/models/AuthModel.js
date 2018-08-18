import Rest from "../../../helpers/Rest";
import Event from "../../../helpers/Event";
import authStore from "../stores/AuthStore";
import Router from "../../../helpers/Router";

export default {

    login(email, pass) {
        if (authStore.getters.token()) {
            this.onChange();
            Event.trigger('account-login-already-logged-exception', authStore.state.identity);
            return
        }
        Rest.post('v1/auth', {login: email, password: pass}, null, (response) => {
            if (response.status < 400) {
                localStorage.token = response.data.token;
                this.setIdentity(response.data);
                Event.trigger('account-login', response.data);
                this.onChange();
            } else if(response.status === 422) {
                Event.trigger('account-login-exception', {
                    exception: 'Unprocessible entity',
                    code: 422,
                    data: response.data,
                });
                this.onChange()
            } else {
                Event.trigger('account-login-exception', {
                    exception: 'Unknown error',
                    code: 1,
                    data: response.data,
                });
                this.onChange()
            }
        });

    },

    getIdentityFromApi() {
        if(!authStore.getters.isLogged()) {
            return;
        }
        Rest.get('v1/auth', null, null, (response) => {
            if (response.status === 401) {
                this.logout(function(){});
                Event.trigger('account-get-identity', {});
                this.setIdentity();
                Router.push('/login');
            }
            if (response.status >= 200) {
                this.setIdentity(response.data);
                Event.trigger('account-get-identity', response.data);
            }
        });
    },

    init() {
        this.setIdentity();
        //this.getIdentityFromApi();
    },

    setIdentity(identity) {
        identity = typeof identity === "object" ? identity : {};
        identity.isLogged = authStore.getters.isLogged();
        if(identity.isLogged) {
            identity.id = 1;
            identity.login = 'User';
        } else {
            identity.id = 0;
            identity.login = 'Guest';
        }
        authStore.dispatch('setIdentity', identity);
        Event.trigger('account-auth-change', identity);
    },

    logout() {
        if(!authStore.getters.isLogged()) {
            return;
        }
        authStore.dispatch('deleteToken');
        this.setIdentity({});
        Event.trigger('account-logout');
        this.onChange();
    },

    onChange() {
        Event.trigger('account-auth-change', authStore.state.identity);
    },

}
