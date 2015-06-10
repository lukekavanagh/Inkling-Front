var board = (function () {

  var boardData = {};
  var fromId = null;
  var lastClicked = null;

  function save() {
    ApiFacade.putBoard(boardData, function (payload) {
      // TODO: use response here in some fashion? Error handling?
      console.log("Payload returning from save(): ", payload);
    });
  }

  function load() {
    // Don't make an API call if _id already set
    if (!boardData._id) {
      ApiFacade.retrieveBoard(function (payload) {
        if (payload) {
          console.log("Payload returning from load(): ", payload);
          $.extend(boardData, payload);
          render();
          eventHandlers();
        } else {
          // TODO: handle error. Retry?
          console.log("Empty payload in board.load()");
        }
      });
    }
  }

  function render() {
    if (boardData.bubbles) {
      for (var i = 0; i < boardData.bubbles.length; i++) {
        renderBubble(boardData.bubbles[i]);
      }
    }
    if (boardData.connections) {
      for (var i = 0; i < boardData.connections.length; i++) {
        renderConnections(boardData.connections[i].startBubbleId, boardData.connections[i].endBubbleId, mySVG);
      }
    }
  }

  function addBubble(bubble) {
    boardData.bubbles.push(bubble);
    save();
  }

  function removeBubble(id) {
    for (var i = 0; i < boardData.bubbles.length; i++) {
      if (id === boardData.bubbles[i].bubbleId) {

        // Delete all connections to this bubble
        for (var j = 0; j < boardData.connections.length; j++) {
          if (boardData.bubbles[i].bubbleId === boardData.connections[i].startBubbleId ||
              boardData.bubbles[i].bubbleId === boardData.connections[i].endBubbleId) {
            removeConnection(boardData.connections[i].startBubbleId, boardData.connections[i].endBubbleId);
          }
        }

        boardData.bubbles.splice(i, 1);
        save();
        return;
      }
    }
  }

  function getBubbles() {
    return boardData.bubbles;
  }

  function updateBubble(e, ui) {
    for (var i = 0; i < boardData.bubbles.length; i++) {
      if (e.target.id === boardData.bubbles[i].bubbleId) {
        if (ui.position) {
          // TODO: bubble position might be a bit off?
          boardData.bubbles[i].location.top = ui.position.top;
          boardData.bubbles[i].location.left = ui.position.left;
        }

        // Draggable event
        if (ui.size) {
          boardData.bubbles[i].size.width = ui.size.width;
          boardData.bubbles[i].size.height = ui.size.height;
        }

        save();
      }
    }
  }

  function updateContent(bubble) {
    for (var i = 0; i < boardData.bubbles.length; i++) {
      if (bubble[0].id === boardData.bubbles[i].bubbleId) {
        boardData.bubbles[i].content = bubble.context.innerHTML;
        save();
        return;
      }
    }
  }

  function startConnection(startId) {
    lastClicked = startId; // fromId gets reset in completeConnection
    fromId = startId;
  }

  function completeConnection(toId) {
    boardData.connections.push({
      startBubbleId: fromId,
      endBubbleId: toId
    });
    save();
    console.log("Connections: ", boardData.connections);
    renderConnections(fromId, toId, mySVG);
    fromId = null;
  }

  function connectionExists(fromId, toId) {
    for (var i = 0; i < boardData.connections.length; i++) {
      // TODO: optimise
      var a = [boardData.connections[i].startBubbleId, boardData.connections[i].endBubbleId].sort();
      var b = [fromId, toId].sort();

      if (a[0] === b[0] && a[1] === b[1]) {
        console.log("FOUND CONNECTION");
        return true;
      }

      return false;
    }
  }

  function removeConnection(first, second) {
    for (var i=0; i < boardData.connections.length; i++) {
      if ((boardData.connections[i].startBubbleId == first &&
        boardData.connections[i].endBubbleId == second) ||
        (boardData.connections[i].endBubbleId == first &&
        boardData.connections[i].startBubbleId == second)) {

        boardData.connections.splice(i, 1);
        save();

        // Update canvas
        mySVG.removeLine({
          left_node: '#' + first,
          right_node: '#' + second
        });
        mySVG.redrawLines();

        return "removed";
      }
    }
  }

  function getConnections() {
    return boardData.connections;
  }

  function from() {
    return fromId;
  }

  function last() {
    return lastClicked;
  }

  return {
    // Public methods
    save: save,
    load: load,
    addBubble: addBubble,
    removeBubble: removeBubble,
    getBubbles: getBubbles,
    updateBubble: updateBubble,
    startConnection: startConnection,
    completeConnection: completeConnection,
    connectionExists: connectionExists,
    removeConnection: removeConnection,
    getConnections: getConnections,
    updateContent: updateContent,
    from: from,
    last: last
  };
})();

