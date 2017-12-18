import { requestStates } from '../sagas/requestSaga';
import selectn from 'selectn';
export const LOGIN = requestStates('login', 'auth');
export const LOGOUT = requestStates('logout', 'auth');
export const CHECK_AUTHENTICATION = requestStates('checkAuth', 'auth');

const initialState = {
  user: {},
  isFetching: false,
  isAuthenticated: false
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CHECK_AUTHENTICATION.SUCCESS:
    case LOGIN.SUCCESS: {
      const user = selectn('response.user', action);
      return {
        user,
        isAuthenticated: true,
        errorMessage: ''
      };
    }
    case LOGIN.FAILURE: {
      return {
        isAuthenticated: false,
        errorMessage: 'Invalid credentials, please try again'
      };
    }
    case LOGOUT.SUCCESS:
    case CHECK_AUTHENTICATION.FAILURE: {
      return Object.assign({}, state, {
        isAuthenticated: false
      });
    }
    default:
      return state;
  }
};

export function loginUser(data) {
  return {
    type: LOGIN.REQUEST,
    states: LOGIN,
    url: 'http://localhost:3000/auth',
    containerName: 'signIn',
    params: {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({value: data})
    }
  };
}

export function checkAuth() {
  return {
    type: CHECK_AUTHENTICATION.REQUEST,
    states: CHECK_AUTHENTICATION,
    url: 'http://localhost:3000/checkAuth',
    containerName: 'signIn',
    params: {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    }
  };
}
