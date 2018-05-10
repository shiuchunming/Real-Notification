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
        }
    }

    return updater;
})();