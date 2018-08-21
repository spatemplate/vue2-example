import postRoutes from '../modules/post/config/routes'
import accountRoutes from '../vendor/vue-rails/account/config/routes'
import dashboardRoutes from '../modules/dashboard/config/routes'
import restRoutes from '../vendor/vue-rails/rest/config/routes'

export default {
    modules: [
        postRoutes,
        accountRoutes,
        dashboardRoutes,
        restRoutes,
    ],
    routes: [

    ],
}