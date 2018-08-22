import Event from "../../app/helpers/Event";
import Router from "../../app/helpers/Router";
import {Notification} from 'uiv'
import Flash from "../../notify/helpers/Flash";

export default {

    init() {

        Event.attach('account-logout', function (data) {
            Flash.show({
                type: 'success',
                content: 'Logged out!',
            });
            //Router.push('/');
        });

        Event.attach('account-login', function (data) {
            Flash.show({
                type: 'success',
                content: 'Logged in!',
            });
            Router.push('/');
        });

        Event.attach('account-login-already-logged-exception', function (data) {
            Flash.show({
                type: 'warning',
                content: 'You already authorized!',
            });
            Router.push('/');
        });

        Event.attach('account-login-exception', function (data) {
            /*Flash.show({
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
