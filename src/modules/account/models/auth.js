import rest from "../../../helpers/rest";
import event from "../../../helpers/event";
import authStore from "../stores/auth";
import router from "../../../config/router";

export default {

    login(email, pass) {
        if (authStore.getters.token()) {
            this.onChange();
            event.trigger('account-login-already-logged-exception', authStore.state.identity);
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
        if(!authStore.getters.isLogged()) {
            return;
        }
        rest.get('v1/auth', null, null, (response) => {
            if (response.status === 401) {
                this.logout(function(){});
                event.trigger('account-get-identity', {});
                this.setIdentity();
                router.push('/login');
            }
            if (response.status >= 200) {
                this.setIdentity(response.data);
                event.trigger('account-get-identity', response.data);
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
        event.trigger('account-auth-change', identity);
    },

    logout() {
        if(!authStore.getters.isLogged()) {
            return;
        }
        authStore.dispatch('deleteToken');
        this.setIdentity({});
        event.trigger('account-logout');
        this.onChange();
    },

    onChange() {
        event.trigger('account-auth-change', authStore.state.identity);
    },

}
