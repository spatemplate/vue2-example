import event from "../components/event";
import { Notification } from 'uiv'

export default {

    registerAll() {

        event.attach('account-logout', function (data) {
            Notification.notify({
                type: 'success',
                title: 'Log out',
                content: 'You are success logout form system!',
            })
        });

        event.attach('account-login', function (data) {
            Notification.notify({
                type: 'success',
                title: 'Hello ' + data.login,
                content: 'You are success login in system!',
            })
        });

        event.attach('account-login-exception', function (data) {
            Notification.notify({
                type: 'danger',
                title: 'Log in',
                content: data[0].message,
            })
        });

        /*event.attach('account-get-identity', function (data) {
            Notification.notify({
                type: 'success',
                title: 'identity',
                content: data.toJson(),
            })
        });*/
    }

}
