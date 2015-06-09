var connectionInProgress = false;
var currentConnection = {
  startBubbleId: "",
  endBubbleId: ""
};
var board;
var mySVG;

$(document).ready(function() {
  facebookSdk(secureMain);

 $('.stopButton').on( "click", function() {
      var playing = true;
      var music = document.getElementById("Drone");
      if(playing == true){
      music.muted = true;
      };
  });
  $('.playButton').on( "click", function() {
      var playing = false;
      var music = document.getElementById("Drone");
      if(playing == false){
      music.muted = false;
      };
  });
});



function secureMain() {
  $('#logoutButton').click(function (e) {
    e.stopImmediatePropagation();

    FB.logout(function (response) {
      fbUser = null;
      window.location = '/';
    });
  });

  sphere();

   mySVG = $('body').connect();
   // New board execution pauses until fbUser populated
   ApiFacade.retrieveBoard();
   for (var i = 0; i < board.bubbles.length; i++) {
     renderBubble(board.bubbles[i]);
   }
   for (var i = 0; i < board.connections.length; i++) {
     renderConnections(board.connections[i].startBubbleId, board.connections[i].endBubbleId, mySVG);
   }

   $("#board").on("click", renderInputOptions);
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

   picMain()
}


function createBubble(e){
  var guId = helper.guid();
  var args = {
    inputType: e.inputType,
    id: guId,
    location: {
      left: e.pageX,
      top: e.pageY
    }
  }
  switch(args.inputType){
    case "image":
      args.sourceUrl = e.sourceUrl;
      break;
  }
  var bubble = new Bubble(args);
  renderBubble(bubble);
  console.log(board);
  board.bubbles.push(bubble);
  console.log("Bubbles: ", board.bubbles);
}

function facebookSdk(callback) {
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1642565209312684',  // Inkling (PRODUCTION)
      //appId      : '1643906175845254',    // CRUDbrain (test)
      cookie     : true,
      xfbml      : true,                  // parse social plugins on this page
      version    : 'v2.2'
    });

    FB.getLoginStatus(function(response) {
      setUser(response);
      if (!fbUser) {
        window.location = "/";
      } else {
        callback();
      }
    });
  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    //js.src = "//connect.facebook.net/en_US/sdk.js";     // PRODUCTION
    js.src = "http://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}

