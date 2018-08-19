import Event from "../helpers/Event";
import Router from "../helpers/Router";
import {Notification} from 'uiv'
import store from "./store";

export default {

    init() {

        Event.attach('account-logout', function (data) {
            Notification.notify({
                type: 'success',
                title: 'Log out',
                content: 'You are success logout form system!',
            });
            //Router.push('/');
        });

        Event.attach('account-login', function (data) {
            Notification.notify({
                type: 'success',
                title: 'Hello ' + data.login,
                content: 'You are success login in system!',
            });
            Router.push('/');
        });

        Event.attach('account-login-already-logged-exception', function (data) {
            Notification.notify({
                type: 'warning',
                title: 'log in',
                content: 'You already authed!',
            });
            Router.push('/');
        });

        Event.attach('account-login-exception', function (data) {
            Notification.notify({
                type: 'danger',
                title: 'Log in',
                content: 'Bad login or password!',
            })
        });

        Event.attach('rest-unprocessible-exception', function (data) {
            for(let key in data.data) {
                let error = data.data[key];
                Notification.notify({
                    type: 'danger',
                    title: error.field,
                    content: error.message,
                })
            }
        });

        Event.attach('rest-not-found-exception', function (data) {
            Notification.notify({
                type: 'warning',
                title: 'Not found',
                content: 'Not found information!',
            });
            window.history.back();
        });

        Event.attach('account-get-identity', function (data) {

        });

        Event.attach('account-auth-change', function (identity) {

        });

        Event.attach('post-all', function () {

        });

        Event.attach('rest-request-before', function (request) {

        });

        Event.attach('rest-request-after', function (response) {
            if (response.status === 401) {
                Event.trigger('rest-unauthorized-exception');
            }
            if (response.status === 403) {
                Event.trigger('rest-forbidden-exception');
            }
            if (response.status === 404) {
                Event.trigger('rest-not-found-exception');
            }
            if (response.status === 422) {
                Event.trigger('rest-unprocessible-exception', response);
            }
            if (response.status >= 500) {
                Event.trigger('rest-server-exception');
            }
        });

        Event.attach('rest-unauthorized-exception', function () {
            Notification.notify({
                type: 'warning',
                title: 'Need authorization!',
            });
            store.auth.dispatch('logout');
            Router.push('/login');
        });

        Event.attach('rest-server-exception', function () {
            Notification.notify({
                type: 'danger',
                title: 'Server error!',
            });
            window.history.back();
        });

        Event.attach('rest-forbidden-exception', function () {
            Notification.notify({
                type: 'warning',
                title: 'Forbidden!',
            });
            window.history.back();
        });

    }

}
