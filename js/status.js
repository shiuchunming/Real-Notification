
const Status = (()=> {
    let instance;
    let counts = {
        messages: 0,
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
            counts.messages = 0;
        }

        get_messages_num() {
            return Number(counts.messages);
        }
    }

})();