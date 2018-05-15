chrome.runtime.onMessage.addListener(messageReceived);

var notification = null;
var rate = 0;
var message_json = {
    "facebook": [],
    "instragram": []
}
var gateway = true;

function messageReceived(msg) {
    message_json = JSON.parse(localStorage.getItem("messages") || '{"facebook": [], "instragram": []}');
    if(msg.type =="fb"){
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
    else if (msg.type =="ig"){
        if(message_json.instragram[0]==msg.greeting[0]){

        }
        else{
            message_json.instragram = msg.greeting;
            localStorage.setItem("messages", JSON.stringify(message_json));

            notification = new Notification(new Date(), {
                icon: "https://image.freepik.com/free-vector/instagram-icon_1057-2227.jpg",
                body: msg.greeting
            });
            setTimeout(notification.close.bind(notification), 4000);
        }
        
    }
}

var timerITV = setInterval(function(){
    console.log("1");

    if(gateway){
        message_json = JSON.parse(localStorage.getItem("messages") || '{"facebook": [], "instragram": []}');
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
        //1.comment_likes 2. comments":1, 3.likes 4.relationships 5.usertags
        if(message_json.instragram[0]> 0){
            var no = 0;
            var tmp2 =` 
                <div class="container" style="">
                <a href="https://www.instagram.com/" target="_blank">
                <img src="https://image.freepik.com/free-vector/instagram-icon_1057-2227.jpg" alt="Avatar" ></a><p></p>`;
            content += tmp2;
            for(ele in message_json.instragram) { 
                if (message_json.instragram[no]>0){
                    if(no == 0){
                        tmp2 = `<span>` + "&nbsp&nbsp&nbsp&nbsp&nbsp Total: " + message_json.instragram[no] + `</span>`;
                    }
                    else if(no == 1){
                        tmp2 = `<span>` + "&nbsp&nbsp&nbsp&nbsp&nbsp comment_likes: " + message_json.instragram[no] + `</span>`;
                    }
                    else if(no == 2){
                        tmp2 = `<span>` + "&nbsp&nbsp&nbsp&nbsp&nbsp comments: " + message_json.instragram[no] + `</span>`;
                    }
                    else if(no == 3){
                        tmp2 = `<span>` + "&nbsp&nbsp&nbsp&nbsp&nbsp likes: " + message_json.instragram[no] + `</span>`;
                    }
                    else if(no == 4){
                        tmp2 = `<span>` + "&nbsp&nbsp&nbsp&nbsp&nbsp relationships: " + message_json.instragram[no] + `</span>`;
                    }
                    else if(no == 5){
                        tmp2 = `<span>` + "&nbsp&nbsp&nbsp&nbsp&nbsp usertags: " + message_json.instragram[no] + `</span>`;
                    }
                content += tmp2;    
                }
                no++;
            }
        }
        content += `</div>`;
        $('.messages').html(content);
    }
    else {
        message_json = JSON.parse(localStorage.getItem("messages") || '{"facebook": [], "instragram": []}');
        var content = `
            <style>
            .spinner {
                width: 100px;
            }
            .spinner input {
                text-align: right;
            }
            .input-group-btn-vertical {
                position: relative;
                white-space: nowrap;
                width: 1%;
                vertical-align: middle;
                display: table-cell;
            }
            .input-group-btn-vertical > .btn {
                display: block;
                float: none;
                width: 100%;
                max-width: 100%;
                padding: 8px;
                margin-left: -1px;
                position: relative;
                border-radius: 0;
            }
            .input-group-btn-vertical > .btn:first-child {
                border-top-right-radius: 4px;
            }
            .input-group-btn-vertical > .btn:last-child {
                margin-top: -2px;
                border-bottom-right-radius: 4px;
            }
            .input-group-btn-vertical i{
                position: absolute;
                top: 0;
                left: 4px;
            };
            </style>
        `;
        var id_1 = 0;
        var id_2 = 0.1;
        var id_3 = 0.01;
        var id_4 = 0.001;
        var id_u = 0.0001;
        var id_p = 0.00001;

        for(ele in message_json.facebook) {
            var tmp = `
                <div class="container" id="`
                + id_1 + '" style=""><img src="https://image.freepik.com/free-icon/facebook-logo_318-49940.jpg" alt="Avatar" ><div class="input-group spinner"><input class="form-control form-control-sm" id="' + id_4 +
                '" value="30" type="text"><div class="input-group-btn-vertical"><button class="btn btn-default" type="button" id="'+ id_u + '"><i class="fa fa-caret-up"></i></button><button class="btn btn-default" type="button" id="'+ id_p + '"><i class="fa fa-caret-down"></i></button></div>'+
                    `<span id="
                    ` + id_2 + `
                    ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    ` + message_json.facebook[id_1][1] + `
                    </span>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    
                </div>
                <button type="button" class="btn btn-default remind-btn" id="
                    `+ id_3 +`
                    ">Remind</button>
                </div>
                `;
            content += tmp;
            id_1 += 1;
            id_2 += 1;
            id_3 += 1;
            id_4 += 1;
            id_u += 1;
            id_p += 1;
        }
        
        $('.messages').html(content);
        clearInterval(timerITV);
    }
    
}, rate)

$(document).on('click', '.spinner .btn:first-of-type', function () {
    console.log("up");
    var time = Number(document.getElementById(String(this.id - 0.0001 + 0.001)).value) + 1;
    document.getElementById(String(this.id - 0.0001 + 0.001)).value = time;
    
});

$(document).on('click', '.spinner .btn:last-of-type', function () {
    console.log("down");
    var time = Number(document.getElementById(String(this.id - 0.00001 + 0.001)).value) - 1;
    document.getElementById(String(this.id - 0.00001 + 0.001)).value = time;
});

localStorage.isNotificationAlived = true;
var timer_b;

$(document).on('click', '.remind-btn', function(){
    console.log(localStorage.isNotificationAlived);
    var position = Number(this.id) - 0.01;
    var index = position + 0.001;
    console.log(index);
    var xd = document.getElementById(index).value;
    console.log(xd);
    document.getElementById(position).style.display = "none";
    message_json = JSON.parse(localStorage.getItem("messages") || '{"facebook": [], "instragram": []}');
    console.log(message_json.facebook);
    var msg = message_json.facebook[position];
    timer_b = 0;
    setInterval(function(){
        timer_b++;
        if(timer_b >= (xd) && JSON.parse(localStorage.isNotificationAlived)){
            notification = new Notification(new Date(), {
                body: msg
            });
            setTimeout(notification.close.bind(notification), 4000);
            timer_b = 0;
            localStorage.isNotificationAlived = false;
            document.getElementById(position).style.display = "block";
        }
    }, 1000);
    
});

$(function() {
    $('.spinner .btn:first-of-type').on('click', function () {
        console.log("up");
        var time = Number(document.getElementById(String(this.id - 0.0001 + 0.001)).value) + 1;
        document.getElementById(String(this.id - 0.0001 + 0.001)).value = time;
    });
    
    $('.spinner .btn:last-of-type').on('click', function () {
        console.log("down");
        var time = Number(document.getElementById(String(this.id - 0.00001 + 0.001)).value) - 1;
        document.getElementById(String(this.id - 0.00001 + 0.001)).value = time;
    });

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

    $("#control").click(function () {
        console.log("DEBUG::click");
        gateway = !gateway;
        
        if(gateway){
            timerITV = setInterval(function(){
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
            if(message_json.instragram[0]> 0){
                var no = 0;
                var tmp2 =` 
                    <div class="container" style="">
                    <a href="https://www.instagram.com/">
                    <img src="https://image.freepik.com/free-vector/instagram-icon_1057-2227.jpg" alt="Avatar" ></a><p></p>`;
                content += tmp2;
                for(ele in message_json.instragram) { 
                    if (message_json.instragram[no]>0){
                        if(no == 0){
                            tmp2 = `<span>` + "&nbsp&nbsp&nbsp&nbsp&nbsp Total: " + message_json.instragram[no] + `</span>`;
                        }
                        else if(no == 1){
                            tmp2 = `<span>` + "&nbsp&nbsp&nbsp&nbsp&nbsp comment_likes: " + message_json.instragram[no] + `</span>`;
                        }
                        else if(no == 2){
                            tmp2 = `<span>` + "&nbsp&nbsp&nbsp&nbsp&nbsp comments: " + message_json.instragram[no] + `</span>`;
                        }
                        else if(no == 3){
                            tmp2 = `<span>` + "&nbsp&nbsp&nbsp&nbsp&nbsp likes: " + message_json.instragram[no] + `</span>`;
                        }
                        else if(no == 4){
                            tmp2 = `<span>` + "&nbsp&nbsp&nbsp&nbsp&nbsp relationships: " + message_json.instragram[no] + `</span>`;
                        }
                        else if(no == 5){
                            tmp2 = `<span>` + "&nbsp&nbsp&nbsp&nbsp&nbsp usertags: " + message_json.instragram[no] + `</span>`;
                        }
                    content += tmp2;    
                    }
                    no++;
                }
            }
            content += `</div>`;
            $('.messages').html(content);
        } , rate);
        }
        else {
            message_json = JSON.parse(localStorage.getItem("messages") || '{"facebook": [], "whatsapp": []}');
            var content = `
                <style>
                .spinner {
                    width: 100px;
                }
                .spinner input {
                    text-align: right;
                }
                .input-group-btn-vertical {
                    position: relative;
                    white-space: nowrap;
                    width: 1%;
                    vertical-align: middle;
                    display: table-cell;
                }
                .input-group-btn-vertical > .btn {
                    display: block;
                    float: none;
                    width: 100%;
                    max-width: 100%;
                    padding: 8px;
                    margin-left: -1px;
                    position: relative;
                    border-radius: 0;
                }
                .input-group-btn-vertical > .btn:first-child {
                    border-top-right-radius: 4px;
                }
                .input-group-btn-vertical > .btn:last-child {
                    margin-top: -2px;
                    border-bottom-right-radius: 4px;
                }
                .input-group-btn-vertical i{
                    position: absolute;
                    top: 0;
                    left: 4px;
                };
                </style>
            `;
            var id_1 = 0;
        var id_2 = 0.1;
        var id_3 = 0.01;
        var id_4 = 0.001;
        var id_u = 0.0001;
        var id_p = 0.00001;

        for(ele in message_json.facebook) {
            var tmp = `
                <div class="container" id="`
                + id_1 + '" style=""><img src="https://image.freepik.com/free-icon/facebook-logo_318-49940.jpg" alt="Avatar" ><div class="input-group spinner"><input class="form-control form-control-sm" id="' + id_4 +
                '" value="30" type="text"><div class="input-group-btn-vertical"><button class="btn btn-default" type="button" id="'+ id_u + '"><i class="fa fa-caret-up"></i></button><button class="btn btn-default" type="button" id="'+ id_p + '"><i class="fa fa-caret-down"></i></button></div>'+
                    `<span id="
                    ` + id_2 + `
                    ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    ` + message_json.facebook[id_1][1] + `
                    </span>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    
                </div>
                <button type="button" class="btn btn-default remind-btn" id="
                    `+ id_3 +`
                    ">Remind</button>
                </div>
                `;
            content += tmp;
            id_1 += 1;
            id_2 += 1;
            id_3 += 1;
            id_4 += 1;
            id_u += 1;
            id_p += 1;
        }
            $('.messages').html(content);
            clearInterval(timerITV);
        }
    

        // content = `
        //     <img src="https://image.freepik.com/free-icon/facebook-logo_318-49940.jpg" alt="Avatar" >         
        //     <div class="input-group spinner">
        //         <input class="form-control form-contrnputdefault
        //         <div class="input-group-btn-vertical">
        //             <button class="btn btn-default" type="button"><i class="fa fa-caret-up"></i></button>
        //             <button class="btn btn-default" type="button"><i class="fa fa-caret-down"></i></button>
        //         </div>
        //         <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        //         <button type="button" class="btn btn-default remind-btn">Remind</button>
        //     </div>
        // `;
        // $(".container").html(content);
    });
})
