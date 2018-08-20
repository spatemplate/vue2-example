import Vue from "vue";
import Vuex from "vuex";
import BaseActiveStore from "../base/BaseActiveStore";
import StringHelper from "../../../helpers/StringHelper";

Vue.use(Vuex);

export default {

    createActive(config) {
        for(let key in config) {
            BaseActiveStore.dispatch('set' + StringHelper.ucfirst(key), config[key]);
        }
        return BaseActiveStore;
    },

}
