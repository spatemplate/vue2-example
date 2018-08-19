import Vue from 'vue'
import Router from 'vue-router'
import routes from "../config/routes";

Vue.use(Router);

let config = {
    mode: 'history',
    base: __dirname,
    routes: routes.routes,
};

if(routes.modules) {
    for(let key in routes.modules) {
        let module = routes.modules[key];
        if(module.routes) {
            for(let key2 in module.routes) {
                let route = module.routes[key2];
                config.routes.push(route);
            }
        }
    }
}

export default new Router(config);
