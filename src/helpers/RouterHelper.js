
function pushRoutes(routes, allRoutes) {
    if (!routes) {
        return;
    }
    for (let key in routes) {
        let route = routes[key];
        allRoutes.push(route);
    }
    return allRoutes;
}

export default {
    pushModules(modules, allRoutes) {
        if (!modules) {
            return;
        }
        for (let key in modules) {
            let module = modules[key];
            allRoutes = pushRoutes(module.routes, allRoutes);
        }
        return allRoutes;
    }
};
