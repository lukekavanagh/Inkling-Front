function renderInputOptions() {

  var $inputOptionBox = $('<div id="inputOptionBox"></div>');
  var $textOption = $('<i id="text" class="fa fa-align-left"></i>');
  var $photoOption = $('<i id="photo" class="fa fa-camera"></i>');
  var $magicCameraInput = $('<input type="file" capture="camera" accept="image/*" id="takePictureField">')
  var $audioOption = $('<i id="audio" class="fa fa-microphone"></i>')
  var $videoOption = $('<i id="video" class="fa fa-video-camera"></i>')
  var $imageOption = $('<i id="image" class="fa fa-picture-o"></i>')
  var $form = $(
    '<form id="imageUrl">' +
      '<input type="text" id="sourceUrl" placeholder="image url here pal">' +
      '<input type="submit" value="yep">' +
    '</form>'
  );
  $inputOptionBox.append($textOption);
  $inputOptionBox.append($photoOption);
  $inputOptionBox.append($audioOption);
  $inputOptionBox.append($videoOption);
  $inputOptionBox.append($imageOption);
  // $photoOption.append($magicCameraInput);
  $photoOption.append("<img id='yourimage'>");
  $('#board').append($form);
  $('#board').append($inputOptionBox);
  $('.fa').addClass('fa-2x') //fa-2x/3x/4x/5x

  $textOption.on('click', function(e){
    hideOptionsPreventDefault(e)
    e.inputType = "text";
    createBubble(e)
  });

  $imageOption.on('click', function(e) {
    hideOptionsPreventDefault(e)
    e.inputType = "image";
    showAddUrlForm(e)
  })

  $photoOption.on('click', function(e) {
    e.stopImmediatePropagation()
    $inputOptionBox.hide()
  })

}

function toggleInputOptions(e) {
  $('#imageUrl').hide()
  if(!$('nav').hasClass('open')){
    $('#inputOptionBox').toggleClass('showing')
    if($('#inputOptionBox').hasClass('showing')) {
      showInputOptionBox(e)
    } else {
      $('#inputOptionBox').hide()
    }
  }
}

function showInputOptionBox(e) {
  $('#inputOptionBox').show()

  var xPos = e.pageY + 'px';
  var yPos = e.pageX + 'px';
  $('#inputOptionBox').css({
    'top': xPos,
    'left': yPos
  })
  animateOptions();
}

function hideOptionsPreventDefault(e) {
  e.stopImmediatePropagation();
  $('#inputOptionBox').hide()
} 

function showAddUrlForm(e) {
  e.stopImmediatePropagation()
  $('#imageUrl').css({
    'top': e.pageY,
    'left': e.pageX,
    'position': 'absolute'
  });
  $('#imageUrl').show();
  $('#sourceUrl').focus();
  $('#imageUrl').submit(function(eSubmit){
    eSubmit.preventDefault();
    addUrlToModel(e);
    $('#imageUrl').hide()
  })

}

function addUrlToModel(e) {
  e.preventDefault();
  $('#imageUrl').hide();
  e.sourceUrl = $('#sourceUrl').val();
  console.log(e.sourceUrl);
  console.log(e.inputType);
  createBubble(e);
}

function animateOptions() {
  var options = $('#inputOptionBox .fa')
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
    $(options[i]).animate({
      'left': finalTopLeftCoords[i][1],
      'top': finalTopLeftCoords[i][0]
    }, 400)
  }
}

function resetOptionPosition(options) {
  for (var i = 0; i < options.length; i++) {
    $(options[i]).css({
      'top': 0,
      'left': 0
    })
  };
}
