$(document).ready(function(){
    var $overlay = $('<div id="overlay"></div>');
    $(".barphoto a")
        .mouseenter(function(){

            $(this).append($overlay.show());

        })
        .mouseleave(function(){
            $overlay.hide();
        });
});