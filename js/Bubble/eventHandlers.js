Bubble.prototype.connect = function (targetId) {
  if (!lastClickId) {
    // Could be either making a connection or removing one
    lastClickId = targetId;
  }

  else if (board.removeConnection(targetId)) {
    console.log("Remove connection: ", lastClickId, " <=> ", targetId);
    lastClickId = null;
  }

  else {
    console.log("Create connection: ", lastClickId, " <=> ", targetId);
    board.addConnection(targetId);
    lastClickId = null;
  }
}

Bubble.prototype.scrollUp = function ($bubble) {
  var current = $bubble.find('.content').scrollTop();
  $bubble.find('.content').scrollTop(current - 25);
}

Bubble.prototype.scrollDown = function ($bubble) {
  var current = $bubble.find('.content').scrollTop();
  $bubble.find('.content').scrollTop(current + 25);
}
