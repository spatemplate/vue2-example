import accountEvents from "../vendor/vue-rails/account/config/events";
import postEvents from "../modules/post/config/events";
import restEvents from "../vendor/vue-rails/rest/config/events";

export default {

    init() {
        accountEvents.init();
        postEvents.init();
        restEvents.init();
    }

}
