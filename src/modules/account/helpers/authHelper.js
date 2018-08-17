import auth from "../models/auth";
import router from "../../../components/router";

export default {

    redirectToLoginPage: function () {
        router.push('/login');
    },

    requireAuth: function (to, from, next) {
        if (!auth.loggedIn()) {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        } else {
            next()
        }
    }

}
