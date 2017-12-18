import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

const SelectAction = ({ accountId, children }) => {
  const deposit = (e) => {
    e.preventDefault();
    browserHistory.push(`/deposit/${accountId}`);
  };

  const withdrawal = (e) => {
    e.preventDefault();
    browserHistory.push(`/withdrawal/${accountId}`);
  };

  return (
    <div>
      {children ||
        <div>
          <div>
            <label>Would you like to perform a </label>
          </div>
          <button type="submit" onClick={deposit}>
            Deposit
          </button>
          or
          <button type="submit" onClick={withdrawal}>
            Withdrawal
          </button>
        </div>
      }
    </div>
  );
};

SelectAction.propTypes = {
  loginUser: PropTypes.func,
  accountId: PropTypes.string,
  children: PropTypes.object
};

export default SelectAction;
