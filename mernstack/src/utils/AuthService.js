import decode from 'jwt-decode';
import { browserHistory } from 'react-router';
import Auth0Lock from 'auth0-lock';
const ID_TOKEN_KEY = 'id_token';
import axios from 'axios';

// eslint-disable-next-line
var options = {
  auth: {
    params: {scope: 'openid profile'},
    redirectUrl: `${window.location.origin}`,
      responseType: 'token'
  }
}; 

const lock = new Auth0Lock('LOpU37x7pD5fRJugBbcX8wU0R3mCoPrP', 'steinkampc.auth0.com', {
    auth: {
      redirectUrl: `${window.location.origin}`,
      responseType: 'token',
      params: {scope: 'openid profile'}
    }
  }
);

lock.on('authenticated', authResult => {
  debugger;
  setIdToken(authResult.idToken);
  var email;
  var nickname;
  if(authResult.idTokenPayload.user_id.split("|")[0] === "facebook"){
    email = authResult.idTokenPayload.email;
    nickname = authResult.idTokenPayload.name;
  } else if(authResult.idTokenPayload.user_id.split("|")[0] === "google-oauth2"){
    email = authResult.idTokenPayload.email;
    nickname = authResult.idTokenPayload.nickname;
  } else {
    email = authResult.idTokenPayload.name;
    nickname = authResult.idTokenPayload.username;
  }
  
  var user = {
    email: email,
    nickname: nickname,
    user_id: authResult.idTokenPayload.user_id
  };

  localStorage.setItem('User', JSON.stringify(user));
  var request = axios.post('http://chat-steinkampc.c9users.io:8080/api/users', {
    email: email,
    nickname: nickname
  });
  request.then(function(response) {
      if (response.data.message) {
        //alert(response.data.message);
        if(response.data.diffName){
          user = {
            email: email,
            nickname: response.data.nickname,
            user_id: authResult.idTokenPayload.user_id
          };
        }
        localStorage.setItem('User', JSON.stringify(user));
      }
    })
    .catch(function(error) {
      console.log(error);
    });
  
  browserHistory.push('/rooms/58ffee6bc14779275977dca1');
});

export function login(options) {
  lock.show(options);

  return {
    hide() {
      lock.hide();
    }
  };
}

export function logout() {
  clearIdToken();
  browserHistory.replace('/');
}

export function requireAuth(nextState, replace) {
  if (!isLoggedIn()) {
    replace({pathname: '/'});
  }
}

function setIdToken(idToken) {
  localStorage.setItem(ID_TOKEN_KEY, idToken);
}

export function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}

export function isLoggedIn() {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) { return null; }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}