$('.spinner .btn:first-of-type').on('click', function () {
    console.log("up");
    var time = parseInt($('.spinner input').val(), 10) + 1;
    $('.spinner input').val(time);
});

$('.spinner .btn:last-of-type').on('click', function () {
    console.log("down");
    var time = parseInt($('.spinner input').val(), 10) - 1;
    $('.spinner input').val(time);
});