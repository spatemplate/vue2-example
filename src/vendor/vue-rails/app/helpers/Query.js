export default {

    forge(query) {
        if(typeof query === "object") {
            return query;
        }
        return {};
    },

};
