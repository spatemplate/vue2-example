import BaseActiveStore from "../components/factory/base/BaseActiveStore";

export default {

    ucfirst( str ) {
        // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        let f = str.charAt(0).toUpperCase();
        return f + str.substr(1, str.length-1);
    }

}
