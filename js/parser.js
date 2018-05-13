const Parser = (() => {
    
    let instance, status, manager;
    const counts = {
        fb_messages: 0,
        ws_messages: 0
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

        parse_fb(response,port) {
            const COUNT_CLASS = "._59tg";
            counts.fb_messages = response.querySelector("#messages_jewel").querySelector(COUNT_CLASS).innerText;
            console.log(response.querySelector("#messages_flyout > div:nth-child(1) > ol > li:nth-child(3) > a > div > div.content > div.oneLine.preview.mfss.fcg > span"));
            status.set_counts(counts);
            
            try{
                chrome.runtime.sendMessage({greeting: response.querySelector("#messages_flyout > div:nth-child(1) > ol > li:nth-child(3) > a > div > div.content > div.oneLine.preview.mfss.fcg > span").innerHTML}, function(a) {
                });
            }
            catch(err){

            }

        }
    }

    

    return Parser;
})();