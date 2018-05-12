chrome.runtime.onMessage.addListener(messageReceived);


var message_stack = [];

function messageReceived(msg) {
    if(message_stack.length>0){
        if(message_stack[message_stack.length-1]!=msg.greeting){
            message_stack.push(msg.greeting);
        }
    }
    else if(message_stack.length==0){
        message_stack.push(msg.greeting);
    }
    console.log(msg.greeting);
    for(var i = 1;i <= 4; i++){
        document.getElementById(String(i)).style.visibility = "hidden";
        document.getElementById(String(i+0.1)).innerText = "";
    }
    for(var i = 1;i <= 4; i++){
        document.getElementById(String(i)).style.visibility = "visible";
        document.getElementById(String(i+0.1)).innerText = message_stack[message_stack.length-i];
        if(i==message_stack.length) break;
    }
}
