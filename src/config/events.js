import accountEvents from "../modules/account/config/events";
import postEvents from "../modules/post/config/events";
import restEvents from "../modules/rest/config/events";

export default {

    init() {
        accountEvents.init();
        postEvents.init();
        restEvents.init();
    }

}
