import events from "./events";
import components from "./components";
import store from "./store";

export default {
    init() {
        components.init();
        events.init();
        store.auth.dispatch('init');
    }
};
