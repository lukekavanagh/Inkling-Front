var connectionInProgress = false;
var currentConnection = {
  startBubbleId: "",
  endBubbleId: ""
};
var board;


$(document).ready(function() {
  facebookSdk(secureMain); 
});

function secureMain() {
  $('#logoutButton').click(function (e) {
    e.stopImmediatePropagation();

    FB.logout(function (response) {
      fbUser = null;
      window.location = '/';
    });
  });

   this.mySVG = $('body').connect();

   // New board execution pauses until fbUser populated
   ApiFacade.retrieveBoard();
   for (var i = 0; i < board.bubbles.length; i++) {
     renderBubble(board.bubbles[i]);
   }

   $("#board").on("click", createBubble);
   $('#board').on("click", '.bubble', function(e) {
     e.stopImmediatePropagation();
   });

   $("#trashcan").droppable({
     drop: function(event, ui){
       $(ui.draggable).remove();
       console.log(ui);
     }
   });

   // Persist to db
   $('#board').on('mouseup', function () {
     var putResponse = ApiFacade.putBoard(board);
   });
}


function createBubble(e){
  var randId = helper.guid();
  var bubble = new Bubble(e.pageY, e.pageX, randId);
  renderBubble(bubble);
  console.log(board);
  board.bubbles.push(bubble);
  console.log("Bubbles: ", board.bubbles);
}

function facebookSdk(callback) {
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1642565209312684',
      cookie     : true,  // session cookies
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.2'
    });

    FB.getLoginStatus(function(response) {
      setUser(response);
      if (!fbUser) {
        window.location = "/";
      } else {
        console.log(fbUser.access_token);
        callback();
      }
    });
  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "http://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}

