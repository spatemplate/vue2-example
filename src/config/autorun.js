import auth from "../modules/account/models/auth";
import CommonEvents from "../events/common";

export default {

    runAll() {
        CommonEvents.registerAll();
        auth.init();
    }

};
