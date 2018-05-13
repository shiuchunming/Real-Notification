
const Status = (()=> {
    let instance;
    let counts = {
        fb_messages: 0,
        ws_messages: 0
    };

    return class {
        constructor() {
            if(!instance) {
                instance = this;
            }
            return instance;
        }
        
        set_counts(c) {
            counts = c;
        }

        reset_counts() {
            counts.fb_messages = 0;
            counts.ws_messages = 0;
        }

        reset_fb_count() {
            counts.fb_messages = 0;
        }

        reset_ws_count() {
            counts.ws_messages = 0;
        }

        get_messages_num() {
            return Number(counts.fb_messages);
        }
    }

})();