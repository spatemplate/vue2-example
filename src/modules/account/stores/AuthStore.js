
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
            if(typeof identity !== "object" || identity === {}/* || !this.getters.token()*/) {
                state.identity = null;
                return;
            }

            identity = typeof identity === "object" ? identity : {};
            if(this.getters.isLogged()) {
                //identity.id = 1;
               // identity.login = 'User';
            }
            //console.log(identity.login);
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
        init(context) {
            if(context.getters.token()) {
                context.commit('setIdentity', {
                    id: 0,
                });
                let callback = (response) => {
                    if (!response.error) {
                        context.commit('setIdentity', response.data);
                    }
                };
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
