const Updater = (() => {

    const UPDATE = 5000;

    let instance, status, manager;
    let interval_id;
    let update_stack;

    class updater {
        constructor(s, m) {
            if(!instance) {
                instance = this;
                status = s;
                manager = m;
            }
            return instance;
        }

        reset_timer() {
            window.clearInterval(interval_id);
        }

        update() {
            update_stack = [];
            if(status.get_messages_num()) {
                update_stack.push(() => {
                    manager.change_icon(status.get_messages_num());
                });
            }
            if(update_stack.length === 0) {
                manager.change_icon(0);
            }
            else if (update_stack.length === 1) {
                update_stack[0]();
            }
            else {
                next();
                interval_id = window.setInterval(() => next(), UPDATE);
            }
        }
    }

    const next = () => {
        const nextRound = update_stack.shift();
        nextRound();
        update_stack.push(nextRound);
    };

    return updater;
})();