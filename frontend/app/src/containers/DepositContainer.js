import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAccount, makeDeposit } from './../modules/atmModule';
import Deposit from './../components/Deposit';

class DepositContainer extends Component {
  componentDidMount() {
    this.props.fetchAccount(this.props.accountId);
  }

  render() {
    return (<Deposit
      balance={this.props.balance}
      accountId={this.props.accountId}
      displayName={this.props.displayName}
      makeDeposit={this.props.makeDeposit}
    />);
  }
}

const mapStateToProps = (state, props) => {

  return {
    balance: state.account.balance || 0,
    accountId: props.params.id,
    errorMessage: typeof state.account === 'string' ? state.account : '',
    displayName: state.account.displayName || ''
  };
};

DepositContainer.propTypes = {
  balance: PropTypes.number,
  accountId: PropTypes.string,
  displayName: PropTypes.string,
  makeDeposit: PropTypes.func,
  fetchAccount: PropTypes.func
};

export default connect(
  mapStateToProps,
  {
    fetchAccount,
    makeDeposit
  }
)(DepositContainer);

