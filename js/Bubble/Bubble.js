function Bubble (){ }

Bubble.prototype.render = function() {
  var $board = $('#board');

  var $bubble = $('<div>')
    .attr({
      id: this.bubbleId,
      class: 'bubble'
    })
    .offset({
      top: this.location.top,
      left: this.location.left
    })
    .css({
      'width': this.size.width,
      'height': this.size.height
    })
    .draggable({
      handle: ".header",
      stop: function (e, ui) {
        // Persist position changes
        board.updateBubble(e, ui);
      }
    })
    .resizable({
      stop: function (e, ui) {
        // Persist size changes
        board.updateBubble (e, ui);
      }
    });

  this.populate($bubble);
  $board.append($bubble);
}

Bubble.prototype.populate = function ($bubble) {
  var paddingPercent = 50*(1 - Math.cos(Math.PI/4))
  var self = this;

  var $header = $('<div>')
    .attr({ 
      class: 'header' 
    })
    .click( function(e) {
      $(window).resize();
    }
  );

  var $link = $('<a>')
    .attr({ 
      class: 'link' 
    }
  );

  $bubble
    .on('click', $link, function (e) {
      // For clarity: 'this' is the bubble div
      self.connect(this.id);
    }
  );

  var $icon = $('<i>').attr({ class: 'fa fa-link link-image' });

  var $content = $('<div>')
    .attr({ 
      class: 'content' 
    })
    .css({
      padding: paddingPercent + '%'
    })
    .on('click', function (e) {
      e.stopImmediatePropagation();
    })
    .on('blur', function (e) {
      // Persist content changes
      e.stopImmediatePropagation();
      board.updateContent($(e.target).parent());
    });

  var $footer = $('<div>').attr({ class: 'footer' });

  var $scrollUp = $('<a>')
    .attr({ 
      class: 'scrollUp', 
      href: '#' 
    })
    .html('&#9650')
    .on('click', function (e) {
      e.stopImmediatePropagation();
      self.scrollUp($bubble)
    }
  );
    
  var $scrollDown = $('<a>')
    .attr({ 
      class: 'scrollDown', 
      href: '#' 
    })
    .html('&#9660')
    .on('click', function (e) {
      e.stopImmediatePropagation();
      self.scrollDown($bubble)
    }
  );

  this.specialise($content, paddingPercent);
  $bubble.append(
    $header.append($link.append($icon)), 
    $content, 
    $footer.append($scrollUp, $scrollDown)
  );

}

Bubble.prototype.specialise = function ($content, paddingPercent) {
  switch(this.type) {
    case 'text':
      $content.attr({
        contentEditable: 'true'
      }).css({
        'border-top': (paddingPercent + 15) + 'px solid transparent',
        'border-bottom': (paddingPercent + 5) + 'px solid transparent'
      }).html(this.content);
      break;

    case 'image':
      var $image = $('<img>').attr({
        class: 'bubble-image',
        src: this.sourceUrl
      }).css({
        'max-height': '100%',
        'max-width': '100%',
      });
      $content.append($image);
      break;
  }
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
