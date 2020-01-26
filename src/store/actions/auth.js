import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (token, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  token,
  userId,
});

export const authFail = (error) => ({
  type: actionTypes.AUTH_FAIL,
  error: error,
});
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return { type: actionTypes.AUTH_LOGOUT };
};
const checkAuthTimeout = (expirationTIme) => (dispatch) => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTIme * 1000);
};

export const auth = (email, password, isSignup) => (dispatch) => {
  const apiKey = 'AIzaSyDWEOWHKwLZXbAwbG8yWYTsWi7NErtaNNE';
  let apiUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;

  if (!isSignup) {
    apiUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
  }

  dispatch(authStart());

  const authData = { email, password, returnSecureToken: true };
  axios
    .post(`${apiUrl}`, authData)
    .then((response) => {
      const expirationDate = new Date(
        new Date().getTime() + response.data.expiresIn * 1000
      );

      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('userId', response.data.localId);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    })
    .catch((error) => {
      dispatch(authFail(error.response.data.error));
    });
};

export const setAuthRedirectPath = (path) => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path,
});

export const authCheckState = () => (dispatch) => {
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(logout());
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));

    if (expirationDate > new Date()) {
      const userId = localStorage.getItem('userId');

      dispatch(authSuccess(token, userId));
      const seconds = expirationDate.getTime() - new Date().getTime();
      dispatch(checkAuthTimeout(seconds / 1000));
    } else {
      dispatch(logout());
    }
  }
};
