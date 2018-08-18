
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        identity: {

        },
        token: localStorage.token,
    },
    mutations: {
        setIdentity(state, identity) {
            state.identity = identity;
        },
        setToken(state, token) {
            localStorage.token = token;
        },
        deleteToken(state) {
            localStorage.token = '';
        },
    },
    actions: {
        setIdentity(context, identity) {
            context.commit('setIdentity', identity);
        },
        setToken(context, token) {
            context.commit('setToken', token);
        },
        deleteToken(context) {
            context.commit('deleteToken');
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
