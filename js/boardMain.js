var mySVG;
board = new Board();

$(document).ready(function() {
  facebookSdk(secureMain);
});

function secureMain() {
  sphere();
  nav();
  mySVG = $('body').connect();

  board.load(); 
}

