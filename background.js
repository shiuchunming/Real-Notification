let manager;
var notification = null;

localStorage.isAlived = true;
localStorage.remind_min = 0;
localStorage.remind_sec = 5;
localStorage.content = "Hello World";

function show() {
    notification = new Notification(new Date(), {
        body: localStorage.content
    });
    setTimeout(notification.close.bind(notification), 4000);
}

if(window.Notification) {
    var timer = 0;
    setInterval(function() {
        var time_limit = parseInt(localStorage.remind_min * 60) + parseInt(localStorage.remind_sec);
        timer++;
        if(timer >= time_limit && JSON.parse(localStorage.isAlived))
        {
            console.log("DEBUG::reach time limit.");
            show();
            timer = 0;
            localStorage.isAlived = false;
        }
    }, 1000);
}

window.addEventListener("load", ()=>{
    const UPDATE = 1000 * 10    ;

    const status = new Status();
    manager = new Manager(chrome.browserAction);
    const parser = new Parser(status, manager);
    const updater = new Updater(status, manager);
    const fb_fetcher = new FB_fetcher(status, parser, updater);

    fb_fetcher.fetch();
    window.setInterval(() => fb_fetcher.fetch(), UPDATE);
    
}, false);