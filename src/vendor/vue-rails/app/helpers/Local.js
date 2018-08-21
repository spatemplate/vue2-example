import PhpHelper from "./PhpHelper";
import store from "../../../../config/store";

export default {

    get(key, defaultValue = null) {
        if(!this.has(key)) {
            return defaultValue;
        }
        key = this.generateGlobalKey(key);
        let jsonValue = localStorage.getItem(key);
        try {
            return JSON.parse(jsonValue);
        } catch (e) {
            return defaultValue;
        }
    },

    set(key, value) {
        key = this.generateGlobalKey(key);
        let jsonValue = JSON.stringify(value, null, 2);
        localStorage.setItem(key, jsonValue);
    },

    has(key) {
        key = this.generateGlobalKey(key);
        let value = localStorage.getItem(key);
        return typeof value !== "undefined";
    },

    remove(key) {
        key = this.generateGlobalKey(key);
        localStorage.removeItem(key);
    },

    clear() {
        localStorage.clear();
    },

    generateGlobalKey(key) {
        let prefix = store.config.app.localStorage.prefix;
        if(typeof prefix !== "string") {
            prefix = 'prefix';
        }
        return prefix + '-' + PhpHelper.convertToHex(key);
    },
}
