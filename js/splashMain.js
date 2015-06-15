$(document).ready(function(){
  facebookSdk(loginLink);

  sphere();
  nav();
  $("#os-phrases > h2").lettering('words').children("span").lettering().children("span").lettering();

  $('.stopButton').on( "click", function() {
    $('#Drone').trigger('pause');
  });

  $('.playButton').on( "click", function() {
    $('#Drone')
      .attr('loop', 'true')
      .trigger('play');
  });
});

function loginLink() {
  if (!fbUser) {
    $('#boardLink').on('click', function (e) {
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
  } else {
    window.location = "/views/board.html";
  }
}
