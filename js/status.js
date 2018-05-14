
const Status = (()=> {
    let instance;
    let counts = {
        fb_messages: 0,
        ig_messages: 0
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
            counts.ig_messages = 0;
        }

        reset_fb_count() {
            counts.fb_messages = 0;
        }

        reset_ig_count() {
            counts.ig_messages = 0;
        }

        get_messages_num() {
            return Number(counts.fb_messages)+Number(counts.ig_messages);
        }
    }

})();