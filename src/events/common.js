import event from "../components/event";
import { Notification } from 'uiv'
import authHelper from "../modules/account/helpers/authHelper";
import router from "../components/router";
import App from "../modules/app/controllers/App";
import auth from "../modules/account/models/auth";

export default {

    registerAll() {

        event.attach('account-logout', function (data) {
            Notification.notify({
                type: 'success',
                title: 'Log out',
                content: 'You are success logout form system!',
            });
            App.setIdentity({});
            //auth.getIdentity();
            //router.push('/');
        });

        event.attach('account-login', function (data) {
            Notification.notify({
                type: 'success',
                title: 'Hello ' + data.login,
                content: 'You are success login in system!',
            });
            //App.setIdentity(data);
            //router.push('/');
        });

        event.attach('account-login-already-logged-exception', function (data) {
            Notification.notify({
                type: 'warning',
                title: 'log in',
                content: 'You already authed!',
            });
            //App.setIdentity(data);
            //router.push('/');
        });

        event.attach('account-login-exception', function (data) {
            Notification.notify({
                type: 'danger',
                title: 'Log in',
                content: 'Bad login or password!',
                //content: data[0].message,
            })
        });

        event.attach('unauthorized-exception', function (data) {
           Notification.notify({
               type: 'danger',
               title: 'Need authorization!',
           });
           //router.push('/login');
       });

       event.attach('account-get-identity', function (data) {
           //alert('rwerw');
           App.setIdentity(data);
           Notification.notify({
               type: 'success',
               title: 'identity',
               content: 'data.toJson()',
           })
       });

        event.attach('account-auth-change', function (loggedIn) {
            //alert(loggedIn);
            App.setIsLogged(loggedIn);
            Notification.notify({
                type: 'success',
                title: 'account-auth-change',
                content: loggedIn,
            })
        });

    }

}
