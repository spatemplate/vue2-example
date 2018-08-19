import Rest from "../../../helpers/Rest";
import Event from "../../../helpers/Event";
import AuthStore from "../stores/AuthStore";
import Router from "../../../helpers/Router";
import store from '../../../config/store';

export default {

    login(email, pass, cb) {
        return Rest.post('v1/auth', {login: email, password: pass}, null, cb);
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
