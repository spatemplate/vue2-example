import AuthModel from "../modules/account/models/AuthModel";
import events from "./events";

export default {

    init() {
        events.init();
        AuthModel.init();
    }

};
