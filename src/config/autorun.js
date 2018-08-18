import auth from "../modules/account/models/auth";
import events from "./events";

export default {

    init() {
        events.init();
        auth.init();
    }

};
