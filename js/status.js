
const Status = (()=>{
    let instance;
    let counts = {
        requests: 0,
        messages: 0,
        notifications: 0
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
            counts.requests = 0;
            counts.messages = 0;
            counts.notifications = 0;
        }

        get_requests_num() {
            return Number(counts.requests);
        }

        get_messages_num() {
            return Number(counts.messages);
        }

        get_notifications_num() {
            return Number(counts.notifications);
        }
    }

})();