var connectionInProgress = false;
var currentConnection = {
  startBubbleId: "",
  endBubbleId: ""
};
var board;

$(document).ready(function() {
  this.mySVG = $('body').connect();
  board = {
    _id: "",
    connections: [],
    bubbles: [],
  };

  $("#board").on("click", createBubble);

  $('#board').on("click", '.bubble', function(e) {
    e.stopImmediatePropagation();
  });

});

function createBubble(e){
  var randId = helper.guid();
  var bubble = new Bubble(e.pageY, e.pageX, randId);
  renderBubble(bubble);
  board.bubbles.push(bubble);
}




