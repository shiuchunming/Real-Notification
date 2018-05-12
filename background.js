let manager;
var notification = null;
var timer;

localStorage.isAlived = true;
localStorage.remind_min = 99999;
localStorage.remind_sec = 0;
localStorage.remind_msg = "";

function show() {
    notification = new Notification(new Date(), {
        body: localStorage.remind_msg
    });
    setTimeout(notification.close.bind(notification), 4000);
}

if(window.Notification) {
    timer = 0;
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

var reset_timer = function() {
    timer = 0;
    localStorage.isAlived = true;
};

chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
    if(request.msg == "reset_timer") {
        reset_timer();
    }
});

window.addEventListener("load", ()=>{
    const UPDATE = 1000 * 5;

    const status = new Status();
    manager = new Manager(chrome.browserAction);
    const parser = new Parser(status, manager);
    const updater = new Updater(status, manager);
    const fb_fetcher = new FB_fetcher(status, parser, updater);

    fb_fetcher.fetch();
    window.setInterval(() => fb_fetcher.fetch(), UPDATE);
    
}, false);