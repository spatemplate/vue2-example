import auth from "../modules/account/models/auth";

export default {

    runAll() {
        auth.init();
    }

};
