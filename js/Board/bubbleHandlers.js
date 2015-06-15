Board.prototype.addBubble = function (e) {
  var bubble = new Bubble();
  $.extend(bubble, {
    bubbleId: guid(),
    location: {
      left: e.pageX,
      top: e.pageY
    },
    size: {
      height: "160px",
      width: "160px"
    },
    type: e.inputType,
    sourceUrl: "" || e.sourceUrl
  });
  this.bubbles.push(bubble);
  this.save();
  bubble.render();
}

Board.prototype.removeBubble = function (id) {
  for (var i = 0; i < this.bubbles.length; i++) {
    if (id === this.bubbles[i].bubbleId) {

      // Delete all connections to this bubble
      for (var j = 0; j < this.connections.length; j++) {
        if (this.bubbles[i].bubbleId === this.connections[j].startBubbleId ||
            this.bubbles[i].bubbleId === this.connections[j].endBubbleId) {

          this.connections.splice(j, 1);
          mySVG.removeLine({ 
            left_node: '#' + this.connections[j].startBubbleId,
            right_node: '#' + this.connections[j].endBubbleId
          });
        }
      }

      this.bubbles.splice(i, 1);
      this.save();
      return;
    }
  }
}

Board.prototype.updateBubble = function (e, ui) {
  for (var i = 0; i < this.bubbles.length; i++) {
    if (e.target.id === this.bubbles[i].bubbleId) {
      if (ui.position) {
        // TODO: bubble position might be a bit off?
        this.bubbles[i].location.top = ui.position.top;
        this.bubbles[i].location.left = ui.position.left;
      }

      // Draggable event
      if (ui.size) {
        this.bubbles[i].size.width = ui.size.width;
        this.bubbles[i].size.height = ui.size.height;
      }

      board.save();
    }
  }
}

Board.prototype.updateContent = function (bubble) {
  for (var i = 0; i < this.bubbles.length; i++) {
    if (bubble[0].id === this.bubbles[i].bubbleId) {
      this.bubbles[i].content = bubble.context.innerHTML;
      board.save();
      return;
    }
  }
}

