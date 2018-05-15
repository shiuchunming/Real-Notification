const Parser = (() => {
    
    let instance, status, manager;
    const counts = {
        fb_messages: 0,
        ig_messages: 0
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
                chrome.runtime.sendMessage({greeting: list,type:"fb"}, function(a) {
                });
            }
            catch(err){

            }

        }
        parse_ig(response,port) {
            var exp;
            try {
                console.log(response.documentElement);
                counts.messages = response.documentElement.getElementsByTagName("script")[2].innerText;
                exp = /{"activity_counts":{"comment_likes":(\d+),"comments":(\d+),"likes":(\d+),"relationships":(\d+),"usertags":(\d+)/.exec(counts.messages);
                console.log(exp);
            } catch(e) {
                console.log(e);
            }
            counts.ig_messages = Number(exp[1])+Number(exp[2])+Number(exp[3])+Number(exp[4])+Number(exp[5]);//1.comment_likes 2. comments":1, 3.likes 4.relationships 5.usertags
            exp[0]=counts.ig_messages;//total counts
            status.set_counts(counts);
            
            try{
                chrome.runtime.sendMessage({greeting: exp,type:"ig"}, function(a) {
                });
            }
            catch(err){

            }

        }
    }

    

    return Parser;
})();