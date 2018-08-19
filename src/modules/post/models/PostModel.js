import Rest from "../../../helpers/Rest";

export default {

    all(cb) {
        return Rest.get('v1/city', null, null, cb);
    },

    one(id, cb) {
        return Rest.get('v1/city/' + id, null, null, cb);
    },

}
