import reducer from './auth.js';
import * as actionTypes from '../actions/actionTypes';

describe('Auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
    });
  });

  it('should store token upon login', () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectionPath: '/',
        },
        { type: actionTypes.AUTH_SUCCESS, token: 'Token', userId: 'UserId' }
      )
    ).toEqual({
      token: 'Token',
      userId: 'UserId',
      error: null,
      loading: false,
      authRedirectionPath: '/',
    });
  });
});
