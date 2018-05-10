const Parser = (() => {
    
    let instance, status, manager;
    const counts = {
        messages: 0,
    };

    class Parser {
        constructor(s, m) {
            if(!instance) {
                instance = this;
                status = s;
                manager = m;
            }
            return instance;
        }

        parse(response) {
            const COUNT_CLASS = "._59tg";
            counts.messages = response.querySelector("#messages_jewel").querySelector(COUNT_CLASS).innerText
            status.set_counts(counts);
        }
    }

    return Parser;
})();