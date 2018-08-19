import AuthModel from "../modules/account/models/AuthModel";
import events from "./events";
import components from "./components";

export default {
    init() {
        components.init();
        events.init();
        AuthModel.init();
    }
};
