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

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function createBubble(e){
  var randId = guid();
  var bubble = new Bubble(e.pageY, e.pageX, randId);
  renderBubble(bubble);
  board.bubbles.push(bubble);

}

function Bubble (x,y, randId){
  this.bubbleId=randId;
  this.content ="this is the content this is the content this is the content this is the contentth this is the content this is the content this is the content this is the contentth this is the content this is the content this is the content this is the contentth this is the content this is the content this is the content this is the contentththis is the content this is the content this is the content this is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the content";
  this._id = "";
  this.size = {
    left: x,
    top: y
  };
  this.location = {
    left: x,
    top: y
  };
};

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
