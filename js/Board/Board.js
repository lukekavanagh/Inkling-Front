function Board() {} 

Board.prototype.save = function () {
  ApiFacade.putBoard(this, function (payload) {
    // TODO: use response here in some fashion? Error handling?
  });
}

Board.prototype.load = function () {
  ApiFacade.retrieveBoard(this.loadCallback.bind(this));
}

Board.prototype.loadCallback = function (payload) {
  if (payload) {
    // Add methods to models
    $.extend(this, payload);

    if (this.bubbles) {
      for (var i = 0; i < this.bubbles.length; i++) {
        var bubble = new Bubble();
        $.extend(this.bubbles[i], bubble);
      }
    } else {
      this.bubbles = [];
    }

    if (this.connections) {
      for (var i = 0; i < this.connections.length; i++) {
        var connection = new Connection();
        $.extend(this.connections[i], connection);
      }
    } else {
      this.connections = [];
    }

    this.render();

    // TODO: remove once empty!
    eventHandlers();
  } else {
    // TODO: handle error. Retry?
  }
}

Board.prototype.render = function () {
  if (this.bubbles) {
    for (var i = 0; i < this.bubbles.length; i++) {
      this.bubbles[i].render();
    }
  }
  if (this.connections) {
    for (var i = 0; i < this.connections.length; i++) {
      this.connections[i].render(mySVG);
    }
  }
}

