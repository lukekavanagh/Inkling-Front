//I would separate the views into a subfolder (e.g. js/views)
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
  $(".bubble:last ").offset({
    top: bubble.location.top,
    left: bubble.location.left
  });
  $(".bubble:last").css({
    "width": bubble.size.width,
    "height": bubble.size.height
  });
  $('.bubble:last').draggable({
    handle: ".header",
    stop: function (e, ui) {
      board.updateBubble(e, ui);
    }
  });
  $('.bubble:last').resizable({
    stop: function (e, ui) {
      board.updateBubble (e, ui);
    }
  });
  $('.bubble:last .content').append(bubble.content);

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
      '<input type="text" id="sourceUrl" placeholder="image url here pal">' +
      '<input type="submit" value="yep">' +
    '</form>'
  );
  $form.css({
    'top': e.pageY,
    'left': e.pageX,
    'position': 'absolute'
  });
  $('#board').append($form);
  $('#sourceUrl').focus();
  console.log($form);
  $form.submit(function(){addUrlToModel(e)})
}

function addUrlToModel(e) {
  e.preventDefault();
  $('#imageUrl').hide();
  e.sourceUrl = $('#sourceUrl').val();
  console.log(e.sourceUrl);
  console.log(e.inputType);
  createBubble(e);
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
