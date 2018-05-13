chrome.runtime.onMessage.addListener(messageReceived);

var notification = null;
var message_json = {
    "facebook": [],
    "whatsapp": []
}

function messageReceived(msg) {
    message_json = JSON.parse(localStorage.getItem("messages") || '{"facebook": [], "whatsapp": []}');

    if (message_json.facebook.length > 0) {
        if (message_json.facebook[message_json.facebook.length - 1][1] != msg.greeting[1]) {
            message_json.facebook.push(msg.greeting);
            localStorage.setItem("messages", JSON.stringify(message_json));
            
            notification = new Notification(new Date(), {
                icon: "https://image.freepik.com/free-icon/facebook-logo_318-49940.jpg",
                body: msg.greeting[1]
            });
            setTimeout(notification.close.bind(notification), 4000);
        }
    }
    else if (message_json.facebook.length == 0) {
        message_json.facebook.push(msg.greeting);
        localStorage.setItem("messages", JSON.stringify(message_json));

        notification = new Notification(new Date(), {
            icon: "https://image.freepik.com/free-icon/facebook-logo_318-49940.jpg",
            body: msg.greeting[1]
        });
        setTimeout(notification.close.bind(notification), 4000);
    }
}

setInterval(function(){
    message_json = JSON.parse(localStorage.getItem("messages") || '{"facebook": [], "whatsapp": []}');
    var content = "";
    var id_1 = 0;
    var id_2 = 0.1;

    for(ele in message_json.facebook) {
        var tmp = `
            <div class="container" id="
            ` + id_1 + `
            " style="">
            <img src="https://image.freepik.com/free-icon/facebook-logo_318-49940.jpg" alt="Avatar" >
            <p id="
            ` + id_2 + `
            ">
            ` + message_json.facebook[id_1][1] + `
            <span>
            ` + "&nbsp&nbsp&nbsp&nbsp&nbsp time: " + message_json.facebook[id_1][2] + `
            </span>
            <span>
            ` + "&nbsp&nbsp&nbsp&nbsp&nbsp sender: " + message_json.facebook[id_1][0] + `
            </span> 
            </p>
            </div>
            `;
        content += tmp;
        id_1 += 1;
        id_2 += 1;
    }
    $('.messages').html(content);
}, 0)

$(function () {
    
    $('.reminder').keypress(function (e) {
        if (e.which == 13) {
            chrome.extension.sendMessage({ msg: "reset_timer" });

            localStorage.remind_msg = $('#remind-msg').val();
            localStorage.remind_min = $('#remind-min').val();
            localStorage.remind_sec = $('#remind-sec').val();
            $('#remind-msg').val('');
            $('#remind-min').val('');
            $('#remind-sec').val('');
            $('#remind-msg').blur();
            $('#remind-min').blur();
            $('#remind-sec').blur();
        }
    })
})