import { connect } from 'react-redux';
import { loginUser } from './../modules/authModule';
import SignInForm from './../components/SignInForm';

const mapStateToProps = state => {
  return {
    errorMessage: state.auth.errorMessage
  };
};

const SignInContainer = connect(mapStateToProps, { loginUser })(SignInForm);

export default SignInContainer;
