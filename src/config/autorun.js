import auth from "../modules/account/models/auth";
import events from "./events";

export default {

    runAll() {
        events.registerAll();
        auth.init();
    }

};
