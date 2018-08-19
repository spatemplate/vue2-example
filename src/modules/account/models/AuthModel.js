import Rest from "../../../helpers/Rest";
import Event from "../../../helpers/Event";
import AuthStore from "../stores/AuthStore";
import Router from "../../../helpers/Router";
import store from '../../../config/store';

export default {

    login(email, pass) {
        if (AuthStore.getters.token()) {
            Event.trigger('account-login-already-logged-exception', AuthStore.state.identity);
            return
        }
        Rest.post('v1/auth', {login: email, password: pass}, null, (response) => {
            if (response.status < 400) {
                localStorage.token = response.data.token;
                AuthStore.commit('setIdentity', response.data);
                Event.trigger('account-login', response.data);
            } else if(response.status === 422) {
                Event.trigger('account-login-exception', {
                    exception: 'Unprocessible entity',
                    code: 422,
                    data: response.data,
                });
            } else {
                Event.trigger('account-login-exception', {
                    exception: 'Unknown error',
                    code: 1,
                    data: response.data,
                });
            }
        });

    },

    getIdentityFromApi() {
        if(!AuthStore.getters.isLogged()) {
            return;
        }
        Rest.get('v1/auth', null, null, (response) => {
            if (response.status === 401) {
                this.logout(function(){});
                Event.trigger('account-get-identity', {});
                AuthStore.commit('setIdentity', null);
                Router.push('/login');
            }
            if (response.status >= 200) {
                AuthStore.commit('setIdentity', response.data);
                Event.trigger('account-get-identity', response.data);
            }
        });
    },

    init() {
        AuthStore.commit('setIdentity');
        //this.getIdentityFromApi();
    },

}
