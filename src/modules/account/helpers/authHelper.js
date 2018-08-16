import auth from "../models/auth";

export default {

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


