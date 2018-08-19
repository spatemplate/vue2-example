
import Vue from 'vue'
import Vuex from 'vuex'
import Event from "../../../helpers/Event";
import AuthModel from "../models/AuthModel";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        identity: null,
    },
    mutations: {
        setIdentity(state, identity) {
            if(identity === null) {
                state.identity = null;
                return;
            }
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
        login(context, data) {
            if (context.getters.token()) {
                Event.trigger('account-login-already-logged-exception', context.state.identity);
            } else {
                let cb = (response) => {
                    if (response.status < 400) {
                        localStorage.token = response.data.token;
                        context.commit('setIdentity', response.data);
                        Event.trigger('account-login', response.data);
                    } else if(response.status === 422) {
                        /*Event.trigger('account-login-unprocessible-exception', {
                            exception: 'Unprocessible entity',
                            code: 422,
                            data: response.data,
                        });*/
                    } else {
                        Event.trigger('account-login-exception', {
                            exception: 'Unknown error',
                            code: 1,
                            data: response.data,
                        });
                    }
                };
                AuthModel.login(data.login, data.password, cb);
            }
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
