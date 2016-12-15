import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }
  render() {
    return (
      <div>
        <div>Hope you had fine watching your favorite content</div>
        <div> comeback again...</div>
      </div>
            )
  }
}
export default connect(null, actions)(Signout);
