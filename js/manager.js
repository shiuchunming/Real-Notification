const Manager = (() => {
    
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
        
        change_icon(count) {
            console.log("DEBUG::Change Icon");
            browserAction.setBadgeText({
                text: count.toString()
            });
        };
    }
    return Manager;

})();