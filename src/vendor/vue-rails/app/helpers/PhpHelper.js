export default {

    is_array(mixed_var) {	// Finds whether a variable is an array
        //
        // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +   improved by: Legaev Andrey
        // +   bugfixed by: Cord

        return (mixed_var instanceof Array);
    },

    empty(mixed_var) {	// Determine whether a variable is empty
        //
        // +   original by: Philippe Baumann

        return (typeof mixed_var === 'undefined' || mixed_var === "" || mixed_var === 0 || mixed_var === "0" || mixed_var === null || mixed_var === false || (is_array(mixed_var) && mixed_var.length === 0));
    },

    trim(str, charlist) {	// Strip whitespace (or other characters) from the beginning and end of a string
        //
        // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +   improved by: mdsjack (http://www.mdsjack.bo.it)
        // +   improved by: Alexander Ermolaev (http://snippets.dzone.com/user/AlexanderErmolaev)
        // +	  input by: Erkekjetter
        // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)

        charlist = !charlist ? ' \s\xA0' : charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\$1');
        let re = new RegExp('^[' + charlist + ']+|[' + charlist + ']+$', 'g');
        return str.replace(re, '');
    },

    is_array(mixed_var) {	// Finds whether a variable is an array
        //
        // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +   improved by: Legaev Andrey
        // +   bugfixed by: Cord

        return (mixed_var instanceof Array);
    },

    is_null(mixed_var) {	// Finds whether a variable is NULL
        //
        // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)

        return (mixed_var === null);
    },

    is_numeric(mixed_var) {	// Finds whether a variable is a number or a numeric string
        //
        // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +   improved by: David

        return !isNaN(mixed_var);
    },

    is_object(mixed_var) {	// Finds whether a variable is an object
        //
        // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +   improved by: Legaev Andrey
        // +   improved by: Michael White (http://crestidg.com)

        if (mixed_var instanceof Array) {
            return false;
        } else {
            return (mixed_var !== null) && (typeof(mixed_var) == 'object');
        }
    },

    is_string(mixed_var) {	// Find whether the type of a variable is string
        //
        // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)

        return (typeof(mixed_var) == 'string');
    },


    convertFromHex(hex) {
        let hexString = hex.toString();//force conversion
        let str = '';
        for (let i = 0; i < hexString.length; i += 2)
            str += String.fromCharCode(parseInt(hexString.substr(i, 2), 16));
        return str;
    },

    convertToHex(str) {
        let hex = '';
        for (let i = 0; i < str.length; i++) {
            hex += '' + str.charCodeAt(i).toString(16);
        }
        return hex;
    },

}
