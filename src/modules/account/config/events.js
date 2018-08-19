import Event from "../../../helpers/Event";
import Router from "../../../helpers/Router";
import {Notification} from 'uiv'

export default {

    init() {

        Event.attach('account-logout', function (data) {
            Notification.notify({
                type: 'success',
                content: 'Logged out!',
            });
            //Router.push('/');
        });

        Event.attach('account-login', function (data) {
            Notification.notify({
                type: 'success',
                content: 'Logged in!',
            });
            Router.push('/');
        });

        Event.attach('account-login-already-logged-exception', function (data) {
            Notification.notify({
                type: 'warning',
                content: 'You already authorized!',
            });
            Router.push('/');
        });

        Event.attach('account-login-exception', function (data) {
            /*Notification.notify({
                type: 'danger',
                title: 'Log in',
                content: 'Bad login or password!',
            })*/
        });

        Event.attach('account-get-identity', function (data) {

        });

        Event.attach('account-auth-change', function (identity) {

        });

    }

}
