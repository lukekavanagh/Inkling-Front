function Connection () {}

Connection.prototype.render = function (svg) {
  svg.drawLine({
    left_node: '#' + this.startBubbleId,
    right_node: '#' + this.endBubbleId
  });
}

var lastClickId = null;
