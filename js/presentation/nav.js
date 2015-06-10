function nav() {
  $('#menuToggle').click(function(e){
    e.preventDefault();
    console.log(e);
    e.stopImmediatePropagation();
    var $parent = $(this).parent('nav');
    $parent.toggleClass("open");
    var navState = $parent.hasClass('open') ? "hide" : "show";
    $(this).attr("title", navState + " navigation");
    // Set the timeout to the animation length in the CSS.
    setTimeout(function(){
      console.log("timeout set");
      $('#menuToggle > span').toggleClass("navClosed").toggleClass("navOpen");
    }, 200);
  });
}
