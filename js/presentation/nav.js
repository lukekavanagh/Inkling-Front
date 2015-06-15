function nav() {
  $('#menuToggle').click(function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    var $parent = $(this).parent('nav');
    $parent.toggleClass("open");
    var navState = $parent.hasClass('open') ? "hide" : "show";
    $(this).attr("title", navState + " navigation");
    // Set the timeout to the animation length in the CSS.
    setTimeout(function(){
      $('#menuToggle > span').toggleClass("navClosed").toggleClass("navOpen");
    }, 200);
  });
}
