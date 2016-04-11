import jwt_decode from 'jwt-decode';

const LOGIN_URL = "http://localhost:8000/auth/authenticate";
const REFRESH_TOKEN_URL = "http://localhost:8000/auth/refresh-token";
const REFRESH_INTERVAL = 30 // refresh token 30 seconds before it expires

export default {
  // User object will let us check authentication status
  user: {
    id: '',
    authenticated: false,
    username: '',
    role: ''
  },

  login(ctx, username, password) {
    var self = this; // We do this to be able to use the `this` instance

    // Set login JSON request
    var creds = {
      "username": username,
      "password": password
    };

    // Send login request
    return ctx.$http.post(LOGIN_URL, creds).then(function(resp){
      // Get the token from the response
      var token = resp.data.token;

      // Set localStorage token value
      localStorage.setItem('token', token);

      updateUserToLoggedIn(self, token);

      self.calculateRefreshTime(ctx);

      return resp; // return the requet response
    }, function(err){
      return err; // Just return the error we handle it in the component
    });
  },

  logout() {
    localStorage.removeItem('token');
    this.user.authenticated = false;
    this.user.username = '';
    this.user.id = '';
    this.user.role = '';
  },

  checkAuth(ctx) {
    var self = this;
    // refresh to make sure its still valid
    self.refreshToken(ctx).then(function(resp){
      // check for errors
      if(resp.data.message){
        self.logout();
      } else {
        updateUserToLoggedIn(self, resp.data.token);
      }
    })
  },

  refreshToken(ctx) {
    var self = this;
    // Get the token from localStorage
    // and create token object
    var token = {
      'token': localStorage.getItem('token')
    }

    // We check if the context passed in is a instanciated vue instance
    // or if its a global vue instance
    if (ctx.http == undefined) {
      return ctx.$http.post(REFRESH_TOKEN_URL, token, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}).then(function(resp){
        // Set the new token
        localStorage.setItem('token', resp.data.token);

        // Claculate next fresh token
        self.calculateRefreshTime(ctx);

        return resp;
      }, function(err){
        return err;
      });
    }

    return ctx.http.post(REFRESH_TOKEN_URL, token, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}).then(function(resp){
      // Set the new token
      localStorage.setItem('token', resp.data.token);

      // Claculate next fresh token
      self.calculateRefreshTime(ctx);

      return resp;
    }, function(err){
      return err;
    });
  },

  calculateRefreshTime(ctx){
    var self = this;
    // Get the token from the localStorage
    var token = localStorage.getItem('token');

    // Decode the token
    var decodedJWT = jwt_decode(token);

    // Get expiriation time
    var expTime = decodedJWT.exp;

    // Get the time when to refresh the token
    var refreshTime = ((expTime - Date.now() / 1000 | 0) - REFRESH_INTERVAL) * 1000;

    setTimeout(function() {
      self.refreshToken(ctx)
    }, refreshTime)
  }
}

function updateUserToLoggedIn(self, token) {
  // Set user.authenticated to TRUE
  self.user.authenticated = true;

  // decode token and set user properties
  var decodedJWT = jwt_decode(token);
  self.user.username = decodedJWT.username;
  self.user.id = decodedJWT.sub;
  self.user.role = decodedJWT.role;
}
