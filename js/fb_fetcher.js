
const FB_fetcher = (() => {
    
    const URL = "https://m.facebook.com/";
    const URL2 = "https://www.instagram.com/";
    const STATE_DONE = 4, STATUS_OK = 200;
    let instance, status, parser, updater;

    const xhr = new XMLHttpRequest();
    xhr.timeout = 5000;
    xhr.responseType = "document";

    const xhr2 = new XMLHttpRequest();
    xhr2.timeout = 5000;
    xhr2.responseType = "document";

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

        fetchFB(url = URL, parseCallback = parser.parse_fb) {
            console.log("DEBUG::CHECKPOINT 1");
            //status.reset_fb_count();
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

        fetchIG(url = URL2, parseCallback = parser.parse_ig) {
            //status.reset_ig_count();
            xhr2.onload = () => {
                if(xhr2.readyState === STATE_DONE && xhr2.status === STATUS_OK) {
                    try {
                        updater.reset_timer();
                        parseCallback(xhr2.response);
                        updater.update();
                    } catch(e) {
                        console.log(e);
                    }
                }
            };
            xhr2.open("GET", url);
            xhr2.send(null);
        }
    }

    
})();