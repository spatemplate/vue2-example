import BaseActiveApiModel from "../base/BaseActiveApiModel";
import ObjectHelper from "../helpers/ObjectHelper";

export default {

    createActiveApi(model) {
        model = ObjectHelper.extendsOf(model, BaseActiveApiModel);
        return model;
    },

}
