import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { placeTurtle } from '../actions/userActions';

export function Grid({ dispatchPlace, xGridCoordinate, yGridCoordinate,
start, turtleClass }) {
  const indents = [];
  const turtleCls = `turtle-img content ${turtleClass}`;
  for (let yAxis = 4; yAxis >= 0; yAxis -= 1) {
    for (let xAxis = 0; xAxis <= 4; xAxis += 1) {
      indents.push(
        <div key={xAxis + '' + yAxis} id={xAxis + '' + yAxis} onClick={() => dispatchPlace(xAxis, yAxis)} className="square">
          <div className={start === true && xGridCoordinate === xAxis && yGridCoordinate === yAxis ?
          turtleCls : 'content'}>
            <div className="table">
              <div className="table-cell" />
            </div>
          </div>
        </div>);
    }
  }
  return (<div>{indents}</div>);
}
Grid.propTypes = {
  dispatchPlace: PropTypes.func,
  xGridCoordinate: PropTypes.number,
  yGridCoordinate: PropTypes.number,
  turtlePosition: PropTypes.string,
  turtleClass: PropTypes.string,
  start: PropTypes.bool

};
const mapStateToProps = state => ({
  turtlePosition: state.turtlePosition,
  xGridCoordinate: state.xGridCoordinate,
  yGridCoordinate: state.yGridCoordinate,
  turtleClass: state.turtleClass,
  start: state.start
});
export default connect(mapStateToProps, { dispatchPlace: placeTurtle })(Grid);
