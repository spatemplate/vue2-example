
import Vue from 'vue'
import Vuex from 'vuex'
import Event from "../../../helpers/Event";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        identity: {},
    },
    mutations: {
        setIdentity(state, identity) {
            identity = typeof identity === "object" ? identity : {};
            identity.isLogged = this.getters.isLogged();
            if(identity.isLogged) {
                identity.id = 1;
                identity.login = 'User';
            } else {
                identity.id = 0;
                identity.login = 'Guest';
            }
            state.identity = identity;
            Event.trigger('account-auth-change', identity);
        },
        deleteIdentity(state) {
            state.identity = null;
            Event.trigger('account-auth-change', null);
        },
        setToken(state, token) {
            localStorage.token = token;
        },
        deleteToken(state) {
            localStorage.token = '';
        },
    },
    actions: {
        auth(context, login, pass) {

        },
        logout(context) {
            if(!context.getters.isLogged()) {
                return;
            }
            context.commit('deleteToken');
            context.commit('deleteIdentity');
        },
    },
    getters: {
        token: state => {
            return function() {
                return localStorage.token;
            }
        },
        isLogged: state => {
            return function() {
                return localStorage.token !== "";
            }
        },
    },
});
