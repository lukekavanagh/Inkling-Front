//I would separate out secureMain and the facebook SDK into different files
//there is also duplication with splashMain

var mySVG;

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


 $('.stopButton').on( "click", function(e) {
    e.stopImmediatePropagation(); //prevent the other click events from firing
    document.getElementById("Drone").muted = true; //don't need the intermediate variables
  });

  $('.playButton').on( "click", function() {
    //should be same as stopButton listener
    var playing = false;
    var music = document.getElementById("Drone");
    if(playing == false){
      music.muted = false;
    };
  });

  sphere();
  mySVG = $('body').connect();

  board.load();

  $("#board").on("click", renderInputOptions);

  $('#board').on("click", '.bubble', function(e) {
    e.stopImmediatePropagation();
  });

  $("#trashcan").droppable({
    drop: function(e, ui){
      $(ui.draggable).remove();
      board.removeBubble(ui.draggable.context.id);
    }
  });

  // Persist content changes
  $('.content').on('input cut copy paste', function (e) {
    board.updateBubble(e);
    console.log("Content: ", e);
    board.save();
  });
}

function createBubble(e){
  var args = {
    inputType: e.inputType,
    id: helper.guid(),
    sourceUrl: "",
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
  board.addBubble({
    type: bubble.type,
    bubbleId: bubble.bubbleId,
    sourceUrl: bubble.sourceUrl,
    content: bubble.content,
    size: bubble.size,
    location: bubble.location
  });
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

