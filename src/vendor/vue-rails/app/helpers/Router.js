import Vue from 'vue'
import Router from 'vue-router'
import routes from "../../../../config/routes";
import RouterHelper from "./RouterHelper";

Vue.use(Router);

let config = {
    mode: 'history',
    base: __dirname,
    routes: routes.routes,
};

config.routes = RouterHelper.pushModules(routes.modules, config.routes);

export default new Router(config);
