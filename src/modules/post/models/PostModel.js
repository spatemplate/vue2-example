import Rest from "../../../helpers/Rest";

export default {

    uri: 'v1/city',

    all(query, cb) {
        return Rest.get(this.uri, query, null, cb);
    },

    one(id, cb) {
        return Rest.get(this.uri + '/' + id, null, null, cb);
    },

}
