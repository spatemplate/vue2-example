import BaseActiveApiModel from "./base/BaseActiveApiModel";
import ObjectHelper from "./helpers/ObjectHelper";

export default {

    createApiCrud(model) {
        model = ObjectHelper.extendsOf(model, BaseActiveApiModel);
        return model;
    },

}
