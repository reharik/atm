import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkAuth } from './../modules/authModule';
import SignInContainer from './SignInContainer';
import Layout from './../components/Layout';
import { browserHistory } from 'react-router';

class AppContainer extends Component {
  componentDidMount() {
    this.loadData();
  }

  componentWillReceiveProps(newProps) {
    if(!this.props.isAuthenticated && newProps.isAuthenticated) {
      browserHistory.push(`/home`);
    }
  }

  loadData() {
    if(!this.props.isAuthenticated) {
      this.props.checkAuth();
    }
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Layout {...this.props} />;
    }
    return <SignInContainer />;
  }
}

AppContainer.propTypes = {
  checkAuth: PropTypes.func,
  isAuthenticated: PropTypes.bool
};

function mapStateToProps(state = []) {
  return {
    accountId: state.auth.user.accounts ? state.auth.user.accounts[0].id : '',
    isAuthenticated: state.auth.isAuthenticated
  };
}

export default connect(mapStateToProps, {
  checkAuth
})(AppContainer);
