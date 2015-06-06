

function renderConnections(firstBubbleId, secondBubbleId, mySVG) {
  mySVG.drawLine({
    left_node:'#' + firstBubbleId,
    right_node:'#' + secondBubbleId,
  });
}