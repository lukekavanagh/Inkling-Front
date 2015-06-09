function renderConnections(firstBubbleId, secondBubbleId, mySVG) {
  mySVG.drawLine({
    left_node:'#' + firstBubbleId,
    right_node:'#' + secondBubbleId,
  });
}

function refreshConnections() {
   for (var i = 0; i < board.connections.length; i++) {
     renderConnections(board.connections[i].startBubbleId, board.connections[i].endBubbleId, mySVG);
   }
}
