import React from "react";
import View from "./view";
import { bindActionCreators } from "redux";
import { showSpinAction } from "../../redux/reducers/spin";
import { connect } from "react-redux";
class App extends React.Component {
  render() {
    return <View {...this.props} />;
  }
}
function mapStateToProps(state) {
  return {
    show: state.spin.show
  };
}
function mapDispatchToProps(dispatch) {
  return {
    showSpin: bindActionCreators(showSpinAction, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
