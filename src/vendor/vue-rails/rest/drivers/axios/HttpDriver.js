import client from "axios";
import Event from "../../../app/helpers/Event";
import UrlHelper from "../../helpers/UrlHelper";

export default {

    send: function (requestEntity, cb, clientConfig) {
        Event.trigger('rest-request-before', requestEntity);
        const clientInstance = this.getInstance(clientConfig);
        const method = clientInstance[requestEntity.method];
        let url = UrlHelper.forgeUrlFromRequestEntity(requestEntity);
        return method(url, requestEntity.data);
    },

    getInstance(clientConfig) {
        if(typeof clientConfig !== "object") {
            clientConfig = {};
        }
        return client.create(clientConfig);
    },

}
