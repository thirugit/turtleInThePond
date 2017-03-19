import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { rotateTurtleLeft, rotateTurtleRight, move, report } from '../actions/userActions';
import Grid from './Grid';
import InputForm from './InputForm';

export class Layout extends Component {
  static propTypes = {
    turtlePosition: PropTypes.string,
    xGridCoordinate: PropTypes.number,
    yGridCoordinate: PropTypes.number,
    start: PropTypes.bool,
    turtleClass: PropTypes.string,
    turtleCommand: PropTypes.string,
    dispatchMoveRight: PropTypes.func,
    dispatchMoveLeft: PropTypes.func,
    dispatchMove: PropTypes.func,
    dispatchReport: PropTypes.func,
    error: PropTypes.string
  };
  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }
  handleKeyDown(event) {
    switch (event.keyCode) {
      case 37:
        this.props.dispatchMoveLeft();
        break;
      case 39:
        this.props.dispatchMoveRight();
        break;
      case 38:
        this.props.dispatchMove();
        break;
      case 40:
        this.props.dispatchReport();
        break;
      default:
        break;
    }
  }
  render() {
    return (<div className="pond-grid">
      <h1>Turtle in the Pond</h1>
      <InputForm {...this.props} />
      {this.props.error !== '' ? <p className="error">{this.props.error}</p> : <p className="error">&nbsp;</p>}
      <Grid {...this.props} /></div>);
  }
}
const mapStateToProps = state => ({
  turtlePosition: state.turtlePosition,
  xGridCoordinate: state.xGridCoordinate,
  yGridCoordinate: state.yGridCoordinate,
  start: state.start,
  turtleClass: state.turtleClass,
  turtleCommand: state.turtleCommand,
  error: state.error
});

export default connect(mapStateToProps, { dispatchReport: report,
  dispatchMoveLeft: rotateTurtleLeft,
  dispatchMoveRight: rotateTurtleRight,
  dispatchMove: move })(Layout);

