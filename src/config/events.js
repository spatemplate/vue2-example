import Event from "../helpers/Event";
import Router from "../helpers/Router";
import {Notification} from 'uiv'

export default {

    init() {

        Event.attach('account-logout', function (data) {
            Notification.notify({
                type: 'success',
                title: 'Log out',
                content: 'You are success logout form system!',
            });
            Router.push('/');
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

        Event.attach('account-get-identity', function (data) {

        });

        Event.attach('account-auth-change', function (identity) {

        });

        Event.attach('post-list', function () {

        });

        Event.attach('rest-unauthorized-exception', function () {
            Notification.notify({
                type: 'warning',
                title: 'Need authorization!',
            });
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
