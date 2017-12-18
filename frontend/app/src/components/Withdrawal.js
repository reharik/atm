import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Withdrawal extends Component {
  state = {withdrawal: 0};

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.withdrawal <= this.props.dailyWithdrawalLeft) {
      this.props.makeWithdrawal((this.state.withdrawal * -1), this.props.accountId);
    }
  };

  onChange = (e) => {
    let value = e.target.value;
    this.setState({withdrawal: value});
  };

  render() {
    return (
      <div>
        {this.props.error
          ? <div id="error">
            <span>Sorry the following error occurred:</span>
            <br />
            <span>{this.props.error}</span>
          </div>
          : null }
        <div>
          <label>Current Balance for Account {this.props.displayName}: ${this.props.balance}.</label>
        </div>
        {this.props.balance <= 0
          ? <label>
            {`We're sorry you currently have no balance.`}
          </label>
          : this.props.dailyLimitReached
            ? <label>
              {`Your daily withdrawal limit of $${this.props.dailyWithdrawalLimit} has been reached.`}
            </label>
            : <form onSubmit={this.handleSubmit}>
              <div>
                <label>
                  You currently have ${this.props.dailyWithdrawalLeft} left available on you daily withdrawal limit.
                </label>
              </div>
              <div>
                <label>Please enter amount for withdrawal</label>
              </div>
              <div>
                <input onChange={this.onChange} value={this.state.withdrawal} type="number" />
              </div>
              <div>
                <button type="submit">
                  Make withdrawal
                </button>
              </div>
            </form>
        }
      </div>
    );
  }
}

Withdrawal.propTypes = {
  balance: PropTypes.number,
  accountId: PropTypes.string,
  displayName: PropTypes.string,
  error: PropTypes.string,
  makeWithdrawal: PropTypes.func,
  dailyWithdrawalLimit: PropTypes.number,
  dailyWithdrawalLeft: PropTypes.number,
  dailyLimitReached: PropTypes.bool
};

export default Withdrawal;
