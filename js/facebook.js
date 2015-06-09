var fbUser;

function setUser(response) {
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {

      // Logged into CRUDbrain and Facebook.
      fbUser = {
        id: response.authResponse.userID,
        access_token: response.authResponse.accessToken
      };

    }
  });
}

















