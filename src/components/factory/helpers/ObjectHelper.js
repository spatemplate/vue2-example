export default {

    extendsOf(object, parentObject) {
        for(let key in parentObject) {
            object[key] = parentObject[key];
        }
        return object;
    },

}
