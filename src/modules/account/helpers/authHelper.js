import auth from "../models/auth";
import router from "../../../helpers/router";

export default {

    redirectToLoginPage: function () {
        router.push('/login');
    },

    requireAuth: function (to, from, next) {
        if (!auth.identity.isLogged) {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        } else {
            next()
        }
    }

}
