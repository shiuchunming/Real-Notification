$(function(){
    $('.reminder').keypress(function(e){
        if(e.which == 13) {
            chrome.extension.sendMessage({msg: "reset_timer"});
            localStorage.remind_msg = $('#remind-msg').val();
            localStorage.remind_min = $('#remind-min').val();
            localStorage.remind_sec = $('#remind-sec').val();
        }
    })
})