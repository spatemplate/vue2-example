import event from "../helpers/event";
import router from "../helpers/router";
import {Notification} from 'uiv'

export default {

    registerAll() {

        event.attach('account-logout', function (data) {
            Notification.notify({
                type: 'success',
                title: 'Log out',
                content: 'You are success logout form system!',
            });
            router.push('/');
        });

        event.attach('account-login', function (data) {
            Notification.notify({
                type: 'success',
                title: 'Hello ' + data.login,
                content: 'You are success login in system!',
            });
            router.push('/');
        });

        event.attach('account-login-already-logged-exception', function (data) {
            Notification.notify({
                type: 'warning',
                title: 'log in',
                content: 'You already authed!',
            });
            router.push('/');
        });

        event.attach('account-login-exception', function (data) {
            Notification.notify({
                type: 'danger',
                title: 'Log in',
                content: 'Bad login or password!',
            })
        });

        event.attach('account-get-identity', function (data) {

        });

        event.attach('account-auth-change', function (identity) {

        });

        event.attach('post-list', function () {

        });

        event.attach('rest-unauthorized-exception', function () {
            Notification.notify({
                type: 'warning',
                title: 'Need authorization!',
            });
            router.push('/login');
        });

        event.attach('rest-server-exception', function () {
            Notification.notify({
                type: 'danger',
                title: 'Server error!',
            });
            window.history.back();
        });

        event.attach('rest-forbidden-exception', function () {
            Notification.notify({
                type: 'warning',
                title: 'Forbidden!',
            });
            window.history.back();
        });

    }

}
