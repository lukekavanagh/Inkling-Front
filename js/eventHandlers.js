// Called after board.load() returns success
function eventHandlers() {
  $("#trashcan").droppable({
    drop: function(e, ui){
      $(ui.draggable).remove();
      board.removeBubble(ui.draggable.context.id);
    }
  });

  $('#logoutButton').click(function (e) {
    e.stopImmediatePropagation();

    FB.logout(function (response) {
      fbUser = null;
      window.location = '/';
    });
  });


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

  $("#board").on("click", renderInputOptions);
}
