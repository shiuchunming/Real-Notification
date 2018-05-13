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
            var list = [];
            console.log(counts.fb_messages);
            // for (var i = 0; i < Number(counts.fb_messages); i++){
                // console.log(i+1+".");
                // console.log("Name: "+ response.querySelector("#messages_flyout > div > ol").getElementsByTagName("li")[i+2].querySelector("a > div > div.content > div.lr > div.title.thread-title.mfsl.fcb > strong").innerText);
                // console.log("Conetent: "+ response.querySelector("#messages_flyout > div > ol").getElementsByTagName("li")[i+2].querySelector("a > div > div.content > div.oneLine.preview.mfss.fcg > span").innerText);
                // console.log("Time: "+response.querySelector("#messages_flyout > div > ol").getElementsByTagName("li")[i+2].querySelector("a > div > div.content > div.lr > div.time.r.nowrap.mfss.fcl > abbr").innerText);
            list.push(response.querySelector("#messages_flyout > div > ol").getElementsByTagName("li")[2].querySelector("a > div > div.content > div.lr > div.title.thread-title.mfsl.fcb > strong").innerText);
            list.push(response.querySelector("#messages_flyout > div > ol").getElementsByTagName("li")[2].querySelector("a > div > div.content > div.oneLine.preview.mfss.fcg > span").innerText);
            list.push(response.querySelector("#messages_flyout > div > ol").getElementsByTagName("li")[2].querySelector("a > div > div.content > div.lr > div.time.r.nowrap.mfss.fcl > abbr").innerText);
            // }
            status.set_counts(counts);
            
            try{
                // console.log(list);
                chrome.runtime.sendMessage({greeting: list}, function(a) {
                });
            }
            catch(err){

            }

        }
        parse_ws(response,port) {
            const COUNT_CLASS = "._59tg";
            counts.messages = response.documentElement;
            console.log(counts.messages )
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