Board.prototype.addConnection = function (id) {
  var c = new Connection();
  $.extend(c, {
    startBubbleId: lastClickId,
    endBubbleId: id
  });
  this.connections.push(c);
  this.save();
  c.render(mySVG);
}

Board.prototype.removeConnection = function (id) {
  for (var i = 0; i < this.connections.length; i++) {
    var a = [this.connections[i].startBubbleId, this.connections[i].endBubbleId].sort();
    var b = [lastClickId, id].sort();

    if (a[0] === b[0] && a[1] === b[1]) {
      this.connections.splice(i, 1);
      mySVG.removeLine({ 
        left_node: '#' + a[0],
        right_node: '#' + a[1]
      });
      this.save();
      return true;
    }
  }
  return false;
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
