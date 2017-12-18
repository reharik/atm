import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Deposit extends Component {
  state = { deposit: 0 };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.makeDeposit(this.state.deposit, this.props.accountId);
  };

  onChange = (e) => {
    let value = e.target.value;
    this.setState({deposit: parseInt(value)});
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.props.errorMessage
            ? <div id="error">
              <span>Sorry the following error occurred:</span>
              <br />
              <span>{this.props.errorMessage}</span>
            </div>
            : null
          }
          <div>
            <label>{`Current Balance for Account '${this.props.displayName}': $${this.props.balance}`}</label>
          </div>
          <div>
            <label>Please enter amount of deposit</label>
          </div>
          <div>
            <input type="number" onChange={this.onChange} value={this.state.deposit} />
          </div>
          <div>
            <button type="submit">
              Make deposit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Deposit.propTypes = {
  balance: PropTypes.number,
  accountId: PropTypes.string,
  displayName: PropTypes.string,
  error: PropTypes.string,
  makeDeposit: PropTypes.func,
  errorMessage: PropTypes.string
};

export default Deposit;
