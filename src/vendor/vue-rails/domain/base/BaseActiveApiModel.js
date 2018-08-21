import Rest from "../../rest/helpers/Rest";
import Query from "../../app/helpers/Query";

export default {

    all(query, cb) {
        query = Query.forge(query);
        return Rest.get(this.uri, query, null, cb);
    },

    one(query, cb) {
        query = Query.forge(query);
        query["per-page"] = 1;
        let collection = Rest.get(this.uri, query, null, cb);
        if (typeof collection !== "object" || collection === {}) {
            return null;
        }
        return collection[1];
    },

    oneById(id, cb) {
        return Rest.get(this.uri + '/' + id, null, null, cb);
    },

}
