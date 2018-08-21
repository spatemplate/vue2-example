import Event from "../../app/helpers/Event";
import Router from "../../app/helpers/Router";
import {Notification} from 'uiv'
import store from "../../../../config/store";

export default {

    init() {

        Event.attach('rest-unprocessible-exception', function (data) {
            for(let key in data.data) {
                let error = data.data[key];
                Notification.notify({
                    type: 'danger',
                    content: error.message,
                })
            }
        });

        Event.attach('rest-not-found-exception', function (data) {
            Notification.notify({
                type: 'warning',
                content: 'Not found!',
            });
            window.history.back();
        });

        Event.attach('rest-request-before', function (request) {
            store.app.dispatch('showLoading');
        });

        Event.attach('rest-request-after', function (response) {
            store.app.dispatch('hideLoading');
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
                content: 'Need authorization!',
            });
            store.auth.dispatch('logout');
            Router.push('/login');
        });

        Event.attach('rest-server-exception', function () {
            Notification.notify({
                type: 'danger',
                content: 'Server error!',
            });
            window.history.back();
        });

        Event.attach('rest-forbidden-exception', function () {
            Notification.notify({
                type: 'warning',
                content: 'Forbidden!',
            });
            window.history.back();
        });

    }

}
