import { stat } from "fs";

const Parser = (() => {
    
    let instance, status, manager;
    const counts = {
        requests: 0,
        messages: 0,
        notifications: 0
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
                counts.requests = response.querySelector("#requestsCountValue").innerText;
				counts.messages = response.querySelector("#mercurymessagesCountValue").innerText;
				counts.notifications = response.querySelector("#notificationsCountValue").innerText;
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