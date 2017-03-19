import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { executeCommand, takeCommand } from '../actions/userActions';

export function InputForm({ dispatchGo, turtleCommand, dispatchInputChange }) {
  return (<div>
    <label className="hidden" htmlFor="txtCmd">Enter a command to position, move or change the direction of the turtle</label>
    <input type="text" id="txtCmd" onChange={e => dispatchInputChange(e.target.value)}
    placeholder="Enter command" className="input-box" value={turtleCommand} />
    <button type="submit" onClick={() => dispatchGo()} className="go-butn">GO</button>
  </div>);
}
InputForm.propTypes = {
  turtleCommand: PropTypes.string,
  dispatchGo: PropTypes.func,
  dispatchInputChange: PropTypes.func
};
const mapStateToProps = state => ({
  turtleCommand: state.turtleCommand
});
export default connect(mapStateToProps, { dispatchGo: executeCommand, dispatchInputChange: takeCommand })(InputForm);
