function renderInputOptions(e) {
  if ($('#inputOptionBox').length === 0) {
    var $inputOptionBox = $('<div id="inputOptionBox"></div>');
    var $textOption = $('<i id="text" class="fa option fa-align-left"></i>');
    var $photoOption = $('<i id="photo" class="fa option fa-camera"></i>');
    var $audioOption = $('<i id="audio" class="fa option fa-microphone"></i>')
    var $videoOption = $('<i id="video" class="fa option fa-video-camera"></i>')
    var $imageOption = $('<i id="image" class="fa option fa-picture-o"></i>')
    $inputOptionBox.append($textOption);
    $inputOptionBox.append($photoOption);
    $inputOptionBox.append($audioOption);
    $inputOptionBox.append($videoOption);
    $inputOptionBox.append($imageOption);
    // $photoOption.append($magicCameraInput);
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
  $('.option').addClass('fa-2x') //fa-2x/3x/4x/5x

  $textOption.on('click', function(e){
    e.stopImmediatePropagation();
    $inputOptionBox.hide()
    e.inputType = "text";
    board.addBubble(e);
  });

  $imageOption.on('click', function(e) {
    e.stopImmediatePropagation();
    $inputOptionBox.hide()
    e.inputType = "image";
    showAddUrlForm(e)
  })

  //$photoOption.on('click', function(e) {
    //e.stopImmediatePropagation()
    //$inputOptionBox.hide()
  //})

}

function showAddUrlForm(e) {
  e.stopImmediatePropagation()
  $form = $(
    '<form id="imageUrl">' +
      '<input type="text" id="sourceUrl" style="color:black" placeholder="image url here pal">' +
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
  $form.submit(function(eSubmit){
    eSubmit.preventDefault();
    addUrlToModel(e);
  })
}

function addUrlToModel(e) {
  e.preventDefault();
  $('#imageUrl').hide();
  e.sourceUrl = $('#sourceUrl').val();
  console.log(e.sourceUrl);
  console.log(e.inputType);
  board.addBubble(e);
}

function animateOptions(options) {
  resetOptionPosition(options)
  var iconSize = 16; // px
  var scale = 2.5
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
      return (coord - iconSize/2) * scale
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
