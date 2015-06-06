function renderBubble(bubble) {
  $('#board').append(
    "<div class='bubble' id=" + bubble.bubbleId + ">" +
    "<div class='header'> <a class='delete' contenteditable='false'>X </a><a class='link'>+</a> </div>" +
    "<div class='content' contentEditable='true'></div>"+
    "<div class='footer'>" +
    "<a class='scrollUp' href='#'> &#9650 </a>" +
    "<a class='scrollDown' href='#'> &#9660 </a>" +
    "</div></div>")

  $(".bubble:last ").offset({top: bubble.location.left, left: bubble.location.top});
  $('.bubble:last').draggable({
    handle: ".header"
  });
  $('.bubble:last').resizable();
  $('.bubble:last .content').append(bubble.content);

  $(function(){
    $('.delete')
    //.button()
    .click(function(event){
      event.stopImmediatePropagation();
      $(this).parent().parent().remove();
    });
  });

  $('.link').click( function(e) {
    e.stopImmediatePropagation();
    if (!connectionInProgress){
      currentConnection.startBubbleId = $(this).parent().parent().attr('id');
      connectionInProgress = true;
      console.log("Start bubble:" + currentConnection.startBubbleId);
      console.log("Connecting: " + connectionInProgress);
    }
    else {
      currentConnection.endBubbleId = $(this).parent().parent().attr('id');
      renderConnections(currentConnection.startBubbleId, currentConnection.endBubbleId, document.mySVG);
      connectionInProgress = false;
      // TODO: put copy of currentLink in board.connections,
      // and clear values in currentConnection
      console.log("End bubble:" + currentConnection.endBubbleId);
      console.log("Connecting: " + connectionInProgress);
    }
  });

  $(".scrollUp").bind("click", function(event) {
    event.preventDefault();
    var currentBubbleId = ($(this).parent().parent().attr('id'));
    var scrollHeight = $("#" + currentBubbleId).find(".content").scrollTop();
    $("#" + currentBubbleId).find(".content").scrollTop(scrollHeight - 25);
  })

  $(".scrollDown").bind("click", function(event) {
    event.preventDefault();
    var currentBubbleId = ($(this).parent().parent().attr('id'));
    var scrollHeight = $("#" + currentBubbleId).find(".content").scrollTop();
    $("#" + currentBubbleId).find(".content").scrollTop(scrollHeight + 25);
  });
};