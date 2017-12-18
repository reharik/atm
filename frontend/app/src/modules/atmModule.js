import { requestStates } from '../sagas/requestSaga';
import selectn from 'selectn';
export const FETCH_ACCOUNT = requestStates('fetch_account', 'atm');
export const MAKE_DEPOSIT = requestStates('make_deposit', 'atm');
export const MAKE_WITHDRAWAL = requestStates('make_withdrawal', 'atm');

const initialState = {};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_ACCOUNT.SUCCESS: {
      return selectn('response.account', action);
    }
    default:
      return state;
  }
};

export function fetchAccount(data) {
  return {
    type: FETCH_ACCOUNT.REQUEST,
    states: FETCH_ACCOUNT,
    url: `http://localhost:3000/fetchaccount/${data}`,
    params: {
      method: 'GET',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'}
    }
  };
}

const successFunction = (action) => {
  let id = JSON.parse(action.params.body).accountId;
  return fetchAccount(id);
};

export function makeDeposit(amount, accountId) {
  return {
    type: MAKE_DEPOSIT.REQUEST,
    states: MAKE_DEPOSIT,
    url: 'http://localhost:3000/makedeposit',
    successFunction,
    params: {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({ amount, accountId })
    }
  };
}

export function makeWithdrawal(amount, accountId) {
  return {
    type: MAKE_WITHDRAWAL.REQUEST,
    states: MAKE_WITHDRAWAL,
    url: 'http://localhost:3000/makewithdrawal',
    successFunction,
    params: {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({ amount, accountId })
    }
  };
}
