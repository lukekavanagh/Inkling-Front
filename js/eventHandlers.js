// Called after board.load() returns success
function eventHandlers() {
  $("#trashcan").droppable({
    drop: function(e, ui){
      e.stopImmediatePropagation();
      $(ui.draggable).remove();
      board.removeBubble(ui.draggable.context.id);
    },
    tolerance: 'touch'
  });

  $('#logoutButton').click(function (e) {
    e.stopImmediatePropagation();

    FB.logout(function (response) {
      fbUser = null;
      window.location = '/';
    });
  });

  $('#board').on('click', renderInputOptions);
}
