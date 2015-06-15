var fbUser;

function setUser(response) {
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      // Logged into Inkling and Facebook.
      fbUser = {
        id: response.authResponse.userID,
        access_token: response.authResponse.accessToken
      };
    }
  });
}

function facebookSdk(callback, redirect) {
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1642565209312684',  // Inkling (PRODUCTION)
      cookie     : true,
      xfbml      : true,                  // parse social plugins on this page
      version    : 'v2.2'
    });

    FB.getLoginStatus(function(response) {
      setUser(response);

      if (!fbUser && redirect) {
        window.location.replace('/');
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
    js.src = "https://connect.facebook.net/en_US/sdk.js";     
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}
