/* globals localStorage */

import axios from 'axios'

export default {
    login(email, pass, cb) {
        cb = arguments[arguments.length - 1];
        if (localStorage.token) {
            if (cb) cb(true);
            this.onChange(true);
            return
        }
        this.pretendRequest(email, pass, (res) => {
            if (res.authenticated) {
                localStorage.token = res.token;
                if (cb) cb(true);
                this.onChange(true)
            } else {
                console.log(res.response.data);
                if (cb) cb(false);
                this.onChange(false)
            }
        })
    },

    getToken() {
        return localStorage.token
    },

    logout(cb) {
        delete localStorage.token;
        if (cb) cb();
        this.onChange(false)
    },

    loggedIn() {
        return !!localStorage.token
    },

    onChange() {
    },

    pretendRequest(email, pass, cb) {
        setTimeout(() => {
            // domain + '/v' + version + '/v1/auth';

            //console.log(this.vm.store.domain);
            axios.post('http://api.extended.tpl/v1/auth', {login: email, password: pass},)
                .then(response => {
                    //console.log(response.data);
                    cb({
                        authenticated: true,
                        response: response,
                        token: response.data.token,
                    });
                })
                .catch(error => {
                    //if (error.response.status === 422) {
                    //    console.log(error.response.data);
                    //}
                    cb({
                        authenticated: false,
                        response: error.response,
                    })
                })

        }, 0)
    }
}


