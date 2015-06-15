var mySVG;
board = new Board();

$(document).ready(function() {
  facebookSdk(secureMain, true);
});

function secureMain() {
  $('.stopButton').on( "click", function(e) {
    e.stopImmediatePropagation();
    $('#Drone').trigger('pause');
  });

  $('.playButton').on( "click", function(e) {
    e.stopImmediatePropagation();
    $('#Drone')
      .attr('loop', 'true')
      .trigger('play');
  });

  sphere();
  nav();
  mySVG = $('body').connect();
  board.load(); 
}

