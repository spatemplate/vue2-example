const handlers = [];

export default {

    attach: function (name, cb) {
        handlers.push({name: name, callback: cb});
    },

    trigger(name, event) {
        if (handlers.length < 1) {
            return;
        }
        for (let i = 0; i < handlers.length; i++) {
            if(handlers[i].name === name) {
                return handlers[i].callback(event);
            }
        }
    }

}
