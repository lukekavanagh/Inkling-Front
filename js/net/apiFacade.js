var ApiFacade = (function() {
  var BACKEND_BASE_URI = 'https://crudbrain.herokuapp.com/api/v1';

  function getBoard (boardId, callback) {
    $.ajax({
      contentType: 'application/json',
      url: BACKEND_BASE_URI + '/boards/' + boardId,
      headers: {
        "Authentication": fbUser.access_token
      },
      success: function(data, textStatus, xhr){
        callback(data);
      },
      error: function(xhr, textStatus, errorThrown){
        console.log("GET failed: ", errorThrown, " with status: ", textStatus);
      }
    });
  }

  return {

    retrieveBoard: function(callback) {
      $.ajax({
        contentType: 'application/json',
        method: "POST",
        url: BACKEND_BASE_URI + '/boards',
        headers: {
          "Authentication": fbUser.access_token
        },
        complete: function (xhr, textStatus) {
          if (xhr.status === 409) {
            // Board exists for this user id
            getBoard(fbUser.id, callback);
          }
        },
        success: function (data, textStatus, xhr) {
          // No board found, new board created
          callback(data);
        },
        error: function(xhr, textStatus, errorThrown) {
          console.log("POST failed: ", errorThrown, " with status: ", textStatus);
        }
      })
    },

    putBoard: function(board, callback) {
      $.ajax({
        contentType: 'application/json',
        data: JSON.stringify(board),
        method: "PUT",
        url: BACKEND_BASE_URI + '/boards/' + fbUser.id,
        headers: {
          "Authentication": fbUser.access_token
        },
        success: function(data, textStatus, xhr) {
          callback(data);
        },
        error: function(xhr, textStatus, errorThrown) {
          console.log("PUT failed: ", errorThrown, " with status: ", textStatus);          
        }
      })
    }
  };

})();
