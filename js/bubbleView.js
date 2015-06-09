function renderBubble(bubble) {
  $('#board').append(
    "<div class='bubble' id=" + bubble.bubbleId + "> <div class='header'>" +
    "<a class='link'><img class='link-image' src='../images/add_link.png'></a></div>" +
    "<div class='content' contentEditable='true'></div>"+
    "<div class='footer'>" +
    "<a class='scrollUp' href='#'> &#9650 </a>" +
    "<a class='scrollDown' href='#'> &#9660 </a>" +
    "</div></div>")

  $(".bubble:last ").offset({
    top: bubble.location.left,
    left: bubble.location.top
  });
  $('.bubble:last').draggable({
    handle: ".header"
  });
  $('.bubble:last').resizable();
  $('.bubble:last .content').append(bubble.content);

  $('.header').click( function(e) {
    $(window).resize();
  })

  $('.link').click( function(e) {
    e.stopImmediatePropagation();
    if (!connectionInProgress){
      currentConnection.startBubbleId = $(this).parent().parent().attr('id');
      connectionInProgress = true;
    } else if(connectionRemover(currentConnection.startBubbleId, $(this).parent().parent().attr('id')) == "removed"){
      console.log("connection broken");
      connectionInProgress = false;
    } else {
      currentConnection.endBubbleId = $(this).parent().parent().attr('id');
      renderConnections(currentConnection.startBubbleId, currentConnection.endBubbleId, mySVG);
      connectionInProgress = false;
      board.connections.push({
        startBubbleId: currentConnection.startBubbleId,
        endBubbleId: currentConnection.endBubbleId
      });
      currentConnection.startBubbleId = "";
      currentConnection.endBubbleId = "";
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
}
