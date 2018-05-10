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
            try {
				counts.messages = response.querySelector("#messages_jewel").querySelector(COUNT_CLASS).innerText
            } catch(e) {
                if(isLogin(response)){
                    manager.loginError();
                }
                else {
                    manager.unexpectedError(e);
                }
            }
            status.set_counts(counts);
        }
    }

    const isLogin = response => response.querySelector("#login_form");

    return Parser;
})();