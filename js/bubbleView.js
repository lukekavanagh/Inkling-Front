function renderBubble(bubble) {
  $('#board').append(
    "<div class='bubble' id=" + bubble.bubbleId + "> <div class='header'>" +
    "<a class='link'><img class='link-image' src='../images/add_link.png'></a></div>" +
    "<div class='content' contentEditable='true'></div>"+
    "<div class='footer'>" +
    "<a class='scrollUp' href='#'> &#9650 </a>" +
    "<a class='scrollDown' href='#'> &#9660 </a>" +
    "</div></div>"
  )
  console.log(bubble);
  $(".bubble:last ").offset({
    top: bubble.location.top,
    left: bubble.location.left
  });
  $(".bubble:last").css({
    "width": bubble.size.width,
    "height": bubble.size.height
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

function renderInputOptions(e) {
  if ($('#inputOptionBox').length === 0) {
    var $inputOptionBox = $('<div id="inputOptionBox"></div>');
    var $textOption = $('<i id="text" class="fa fa-align-left"></i>');
    var $photoOption = $('<i id="photo" class="fa fa-camera"></i>');
    var $magicCameraInput = $('<input type="file" capture="camera" accept="image/*" id="takePictureField">')
    var $audioOption = $('<i id="audio" class="fa fa-microphone"></i>')
    var $videoOption = $('<i id="video" class="fa fa-video-camera"></i>')
    var $imageOption = $('<i id="image" class="fa fa-picture-o"></i>')
    $inputOptionBox.append($textOption);
    $inputOptionBox.append($photoOption);
    $inputOptionBox.append($audioOption);
    $inputOptionBox.append($videoOption);
    $inputOptionBox.append($imageOption);
    $photoOption.append($magicCameraInput);
    $photoOption.append("<img id='yourimage'>");
    $('#board').append($inputOptionBox);
  } else {
    var $inputOptionBox = $('#inputOptionBox');
    var $textOption = $('#text');
    var $photoOption = $('#photo');
    var $audioOption = $('#audio')
    var $videoOption = $('#video')
    var $imageOption = $('#image')
  }

  $inputOptionBox.show()

  $textOption.on('click', function(e){
    e.stopImmediatePropagation();
    $inputOptionBox.hide()
    e.inputType = "text";
    createBubble(e)
  });

  $imageOption.on('click', function(e) {
    e.stopImmediatePropagation();
    $inputOptionBox.hide()
    e.inputType = "image";
    showAddUrlForm(e)
  })

  $photoOption.on('click', function(e) {
    e.stopImmediatePropagation()
    $inputOptionBox.hide()
  })

  var xPos = e.pageY + 'px';
  var yPos = e.pageX + 'px';
  $('#inputOptionBox').css({
    'top': xPos,
    'left': yPos
  })
  var options = [
    $textOption,
    $photoOption,
    $audioOption,
    $videoOption,
    $imageOption
  ]
  animateOptions(options);
}

function showAddUrlForm(e) {
  e.stopImmediatePropagation()
  $form = $(
    '<form id="imageUrl">' +
      '<input type="text" id="sourceUrl">' +
      '<input type="submit" value="yep">' +
    '</form>'
  )
  $('#imageUrl')
  console.log('show url form');
}

function animateOptions(options) {
  resetOptionPosition(options)
  var iconSize = 16; // px
  // http://www.mathopenref.com/coordpolycalc.html for cartesian polygon coords below
  var finalCentrePositions = [
    [0,   -20],
    [19,  -6 ],
    [12,  16 ],
    [-12, 16 ],
    [-19, -6 ]
  ]
  var finalTopLeftCoords = finalCentrePositions.map(function(el) {
    return el.map(function(coord) {
      return coord - iconSize/2
    });
  });
  for (var i = 0; i < finalTopLeftCoords.length; i++) {
    options[i].animate({
      'left': finalTopLeftCoords[i][1],
      'top': finalTopLeftCoords[i][0]
    }, 400)
  }
}

function resetOptionPosition(options) {
  for (var i = 0; i < options.length; i++) {
    options[i].css({
      'top': 0,
      'left': 0
    })
  };
}
