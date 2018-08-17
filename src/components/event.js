export default {

    handlers: [],

    attach: function (name, cb) {
        this.handlers.push({name: name, callback: cb});
    },

    trigger(name, event) {
        if (this.handlers.length < 1) {
            return;
        }
        for (let i = 0; i < this.handlers.length; i++) {
            if(this.handlers[i].name === name) {
                this.handlers[i].callback(event);
            }
        }
    }

}
