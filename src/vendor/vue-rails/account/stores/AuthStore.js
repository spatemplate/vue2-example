import Vue from 'vue'
import Vuex from 'vuex'
import Event from "../../app/helpers/Event";
import Local from "../../app/helpers/Local";
import AuthModel from "../models/AuthModel";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        identity: null,
    },
    mutations: {
        setIdentity(state, identity) {
            if (typeof identity !== "object" || identity === {}/* || !this.getters.token()*/) {
                state.identity = null;
                Local.remove('identity');
                return;
            }
            state.identity = identity;
            Local.set('identity', identity);
            Event.trigger('account-auth-change', identity);
        },
        deleteIdentity(state) {
            state.identity = null;
            Local.remove('identity');
            Event.trigger('account-auth-change', null);
        },
        setToken(state, token) {
            Local.set('token', token);

        },
        deleteToken(state) {
            Local.remove('token');
        },
    },
    actions: {
        init(context) {
            if (!Local.has('identity') || !context.getters.token()) {
                return;
            }
            context.commit('setIdentity', Local.get('identity'));
            let callback = (response) => {
                if (!response.error) {
                    context.commit('setIdentity', response.data);
                }
            };
            if (!Local.has('identity')) {
                AuthModel.info(callback);
            }
        },
        auth(context, data) {
            if (context.getters.token()) {
                Event.trigger('account-login-already-logged-exception', context.state.identity);
            } else {
                let cb = (response) => {
                    if (response.status === 200) {
                        context.commit('setToken', response.data.token);
                        context.commit('setIdentity', response.data);
                        Event.trigger('account-login', response.data);
                    } else {
                        Event.trigger('account-login-exception', {
                            exception: 'Unknown error',
                            code: 1,
                            data: response.data,
                        });
                    }
                };
                AuthModel.auth(data.login, data.password, cb);
            }
        },
        logout(context) {
            if (!context.getters.isLogged()) {
                return;
            }
            context.commit('deleteToken');
            context.commit('deleteIdentity');
        },
    },
    getters: {
        token: state => {
            return function () {
                return Local.get('token');
            }
        },
        isLogged: state => {
            return function () {
                return Local.has('token');
            }
        },
    },
});
