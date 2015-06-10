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

function facebookSdk(callback) {
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1642565209312684',  // Inkling (PRODUCTION)
      //appId      : '1643906175845254',    // CRUDbrain (test)
      cookie     : true,
      xfbml      : true,                  // parse social plugins on this page
      version    : 'v2.2'
    });

    FB.getLoginStatus(function(response) {
      setUser(response);
      if (!fbUser) {
        window.location = "/";
      } else {
        callback();
      }
    });
  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    //js.src = "//connect.facebook.net/en_US/sdk.js";     // PRODUCTION
    js.src = "http://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}
