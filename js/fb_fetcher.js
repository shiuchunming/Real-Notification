
const FB_fetcher = (() => {
    
    const URL = "https://m.facebook.com/";
    const STATE_DONE = 4, STATUS_OK = 200;
    let instance, status, parser, updater;

    const xhr = new XMLHttpRequest();
    xhr.timeout = 5000;
    xhr.responseType = "document";

    return class {
        constructor(s, p, u) {
            if(!instance) {
                instance = this;
                status = s;
                parser = p;
                updater = u;
            }
            return instance;
        }

        fetch(url = URL, parseCallback = parser.parse) {
            status.reset_counts();
            xhr.onload = () => {
                if(xhr.readyState === STATE_DONE && xhr.status === STATUS_OK) {
                    try {
                        updater.reset_timer();
                        parseCallback(xhr.response);
                        updater.update();
                    } catch(e) {
                        console.log(e);
                    }
                }
            };
            xhr.open("GET", url);
            xhr.send(null);
        }
    }
})();