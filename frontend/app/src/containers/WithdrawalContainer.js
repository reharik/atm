import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAccount, makeWithdrawal } from './../modules/atmModule';
import Withdrawal from '../components/Withdrawal';

class WithdrawalContainer extends Component {
  componentDidMount() {
    this.props.fetchAccount(this.props.accountId);
  }

  render() {
    return (<Withdrawal
      balance={this.props.balance}
      dailyWithdrawalLimit={this.props.dailyWithdrawalLimit}
      dailyWithdrawalLeft={this.props.dailyWithdrawalLeft}
      dailyLimitReached={this.props.dailyLimitReached}
      accountId={this.props.accountId}
      displayName={this.props.displayName}
      makeWithdrawal={this.props.makeWithdrawal}
    />);
  }
}

const mapStateToProps = (state, props) => {
  return {
    balance: state.account.balance || 0,
    dailyWithdrawalLimit: state.account.dailyWithdrawalLimit || 0,
    dailyWithdrawalLeft: state.account.dailyWithdrawlLeft || 0,
    dailyLimitReached: state.account.dailyWithdrawlLeft <= 0,
    displayName: state.account.displayName || '',
    accountId: props.params.id
  };
};

WithdrawalContainer.propTypes = {
  balance: PropTypes.number,
  dailyWithdrawalLimit: PropTypes.number,
  dailyWithdrawalLeft: PropTypes.number,
  dailyLimitReached: PropTypes.bool,
  accountId: PropTypes.string,
  displayName: PropTypes.string,
  fetchAccount: PropTypes.func,
  makeWithdrawal: PropTypes.func
};

export default connect(
  mapStateToProps,
  {
    fetchAccount,
    makeWithdrawal
  }
)(WithdrawalContainer);

