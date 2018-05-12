chrome.runtime.onMessage.addListener(messageReceived);

var message_stack = [];
var message_json = [];
var global_count = 0;

function messageReceived(msg) {
    message_json = JSON.parse(localStorage.getItem("messages") || "[]");

    if (message_json.length > 0) {
        if (message_json[message_json.length - 1] != msg.greeting) {
            message_json.push(msg.greeting);
            localStorage.setItem("messages", JSON.stringify(message_json));
        }
    }
    else if (message_json.length == 0) {
        message_json.push(msg.greeting);
        localStorage.setItem("messages", JSON.stringify(message_json));
    }
    console.log(msg.greeting);
}

$(function () {
    setInterval(function(){
        message_json = JSON.parse(localStorage.getItem("messages") || "[]");
        var content = "";
        var id_1 = 0;
        var id_2 = 0.1;

        for(ele in message_json) {
            var tmp = `
                <div class="container" id="
                ` + id_1 + `
                "
                <img src="https://image.freepik.com/free-icon/facebook-logo_318-49940.jpg" alt="Avatar" >
                <p id="
                ` + id_2 + `
                ">
                ` + message_json[id_1] + `
                </p>
                </div>
                `;
            content += tmp;
            id_1 += 1;
            id_2 += 1;
        }
        console.log(content);
        $('.messages').html(content);
    }, 1000)
    
    console.log("123");
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