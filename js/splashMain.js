$(document).ready(function(){
	facebookSdk();

	$('#boardLink').click(function (e) {
    e.stopImmediatePropagation();
    console.log(fbUser);
    if (!fbUser) {
      FB.login(function (response) {
        setUser(response);
        if (fbUser.access_token) {
          window.location = "/views/board.html";
        }
      }, {
        scope: 'public_profile,email'
      });
    }
  });

  sphere();
  nav();

  $("#os-phrases > h2").lettering('words').children("span").lettering().children("span").lettering();


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

