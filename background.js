let manager;

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