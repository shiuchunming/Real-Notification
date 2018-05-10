const Manager = (() => {
    const EXTENSION_NAME = "TO BE DETERMINE";
    
    let instance, browserAction;
    
    class Manager {
        constructor(browser_action) {
            if(!instance) {
                instance = this;
                browserAction = browser_action;
                browserAction.setBadgeBackgroundColor({
                    color: [250, 62, 62, 230]
                });
            }
            return instance;
        };

        loginError() {
            error("Please login to facebook first");
        }
    }

    const change_icon = (count) => {
        browserAction.setBadgeText({
            text: badgeText.toString()
        });
    };

    return Manager;

})();