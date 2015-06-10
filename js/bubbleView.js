function renderBubble(bubble) {
  $('#board').append(
    "<div class='bubble' id=" + bubble.bubbleId + "> <div class='header'>" +
      "<a class='link'><img class='link-image' src='../images/add_link.png'></a></div>" +
    "</div>"
  )
  
  $(".bubble:last ").offset({
    top: bubble.location.top,
    left: bubble.location.left
  });

  var paddingPercent = 50*(1 - Math.cos(Math.PI/4))

  switch(bubble.type) {
    case "text":
      $content = $("<div class='content' contentEditable='true'>"+bubble.content+"</div>")
      borderSizeStopOverflowTop = paddingPercent + 15
      borderSizeStopOverflowBottom = paddingPercent + 5
      $content.css({
        'border-top': borderSizeStopOverflowTop + 'px solid transparent',
        'border-bottom': borderSizeStopOverflowBottom + 'px solid transparent'
      })
      $(".bubble:last").append($content);
      $(".bubble:last").append(
        "<div class='footer'>" +
          "<a class='scrollUp' href='#'> &#9650 </a>" +
          "<a class='scrollDown' href='#'> &#9660 </a>" +
        "</div>"
      );
      break;
    case "image":
      $content = $('<div class="content"></div>')
      $image = $('<img src="'+bubble.sourceUrl+'"></img>')
      $image.css({
        'max-height': '100%',
        'max-width': '100%',
      })
      $content.append($image);
      $(".bubble:last").append($content);
      break;
  }
  $(".bubble:last .content").css({'padding': paddingPercent + '%'})

  $(".bubble:last").css({
    "width": bubble.size.width,
    "height": bubble.size.height
  });

  // Persist position changes
  $('.bubble:last').draggable({
    handle: ".header",
    stop: function (e, ui) {
      board.updateBubble(e, ui);
    }
  });

  // Persist size changes
  $('.bubble:last').resizable({
    stop: function (e, ui) {
      board.updateBubble (e, ui);
    }
  });
  $('.bubble:last .content').append(bubble.content);

  // Persist content changes
  $('.bubble:last .content').on('blur', function (e) {
    board.updateContent($(e.target).parent());
  });

  $('.header').click( function(e) {
    $(window).resize();
  })

  $('.link').click( function(e) {
    e.stopImmediatePropagation();
    var clickedBubble = $(this).parent().parent().attr('id');
    console.log("From: ", board.from(), " last: ", board.last(), " clicked: ", clickedBubble);

    if (board.connectionExists(clickedBubble, board.last())) {
      console.log("Board exists...");
      board.removeConnection(clickedBubble, board.last()); 
      console.log("connection broken");
    } 
    
    else if (board.from()) {
      console.log("Complete connection...");
      board.completeConnection(clickedBubble);
    } 
    
    else {
      console.log("Starting connection...");
      board.startConnection(clickedBubble);
      console.log("board.fromId: ", board.from());
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

