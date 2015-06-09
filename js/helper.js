var helper= {
	guid: function() {
	  function s4() {
	    return Math.floor((1 + Math.random()) * 0x10000)
	      .toString(16)
	      .substring(1);
	  }
	  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	    s4() + '-' + s4() + s4() + s4();
	}
}


function connectionRemover(bubbleOneId, bubbleTwoId){
	var links = board.connections;
	for (var i=0; i < links.length; i++) {
    if ((links[i].startBubbleId == bubbleOneId &&
      links[i].endBubbleId == bubbleTwoId) ||
      (links[i].endBubbleId == bubbleOneId &&
      links[i].startBubbleId == bubbleTwoId)) {
    	links.splice(i, 1);

      // Update canvas
      mySVG.removeLine({
        left_node: '#' + bubbleOneId,
        right_node: '#' + bubbleTwoId
      });
      mySVG.redrawLines();

      return "removed";
    }
	}
}
