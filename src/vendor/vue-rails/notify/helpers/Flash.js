import {Notification} from "uiv";
import ObjectHelper from "../../domain/helpers/ObjectHelper";

export default {

    props() {
        return {
            placement: 'bottom-right',
        };
    },

    show(props) {
        let commonProps = ObjectHelper.merge(this.props(), props);
        Notification.notify(commonProps);
    }

}