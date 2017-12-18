import { connect } from 'react-redux';
import SelectAction from './../components/SelectAction';

function mapStateToProps(state = []) {
  return {
    accountId: state.auth.user.accounts ? state.auth.user.accounts[0].id : ''
  };
}

export default connect(mapStateToProps)(SelectAction);
