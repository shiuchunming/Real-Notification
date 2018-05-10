
const FB_fetcher = (() => {

    const URL = "https://www.facebook.com/";
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
                try {
                    updater.reset_timer();
                    parseCallback(xhr.response);
                    updater.update();
                } catch(e) {
                    console.log(e);
                }
            };
            xhr.open("GET", url);
            xhr.send(null);
        }
    }
})();