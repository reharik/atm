import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SignInForm extends Component {
  state = { pin: '' };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.loginUser(this.state.pin);
  };

  onChange = (e) => {
    let value = e.target.value;
    this.setState({pin: value});
  };

  render() {
    return (
      <div className="signIn">
        {this.props.errorMessage
          ? <div id="error">
            <span>Sorry the following error occurred:</span>
            <br />
            <span>{this.props.errorMessage}</span>
          </div>
          : null }

        <form onSubmit={this.handleSubmit}>
          <div className="signIn__form__header">
            <label className="signIn__form__header__label">Please enter your pin</label>
          </div>
          <div type="flex" className="signIn__form__row">
            <label>PIN: </label>
            <input onChange={this.onChange} value={this.state.pin} />
          </div>
          <div>
            <button type="submit" className="signIn__form__footer__button">
              Sign In
            </button>
          </div>
        </form>
      </div>
    );
  }
}

SignInForm.propTypes = {
  loginUser: PropTypes.func,
  errorMessage: PropTypes.string
};

export default SignInForm;
