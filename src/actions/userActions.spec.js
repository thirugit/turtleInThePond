import { TAKE_COMMAND, ROTATE_TURTLE, SOUTH, NORTH, REPORT_ERROR, EAST, WEST } from '../constants/actions_constants';

const proxyquire = require('proxyquire').noCallThru();

const appState = {
  direction: SOUTH,
  x: 2,
  y: 3,
  turtleClass: 'face-south',
  toDo: 'left',
  start: true,
  turtlePosition: 'south',
  turtleCommand: 'left'
};
const sandbox = sinon.sandbox.create();
const {
  getTurtleClass,
  rotateTurtleLeft,
  rotateTurtleRight,
  takeCommand,
  reportError,
  executeCommand,
  isValidDirection,
  checkForValidCoordinates,
  report } = proxyquire('./userActions', {});
const dispatchSpy = sandbox.spy();
const getState = () => (appState);
describe('report', () => {
  beforeEach(() => {
    sinon.spy(console, 'log');
  });
  afterEach(() => {
    console.log.restore();
  });
  it('should write the output in console', () => {
    report()(dispatchSpy, getState);
    expect(console.log).to.be.called;
  });
});
describe('actions', () => {
  it('should call TAKE_COMMAND function', () => {
    takeCommand('left')(dispatchSpy, getState);
    expect(dispatchSpy).to.have.been.calledWith({ type: TAKE_COMMAND,
      toDo: 'left' });
  });
  it('should call REPORT_ERROR function', () => {
    reportError('abc')(dispatchSpy, getState);
    expect(dispatchSpy).to.have.been.calledWith({ type: REPORT_ERROR,
      error: 'abc' });
  });
  it('should return the turtle class for the direction', () => {
    expect(getTurtleClass('west')).to.equal('face-west');
    expect(getTurtleClass('east')).to.equal('face-east');
    expect(getTurtleClass('south')).to.equal('face-south');
    expect(getTurtleClass('north')).to.equal('face-north');
  });
  it('should return true if the direction is valid from command', () => {
    expect(isValidDirection('place 1,2,north')).to.equal(true);
    expect(isValidDirection('place 1,2,')).to.equal(false);
  });
  it('should return true if the coordinates from the command are valid', () => {
    expect(checkForValidCoordinates('place 1,2,north', 1)).to.equal(true);
    expect(checkForValidCoordinates('place 1,2,north', 0)).to.equal(true);
    expect(checkForValidCoordinates('place 22,20,')).to.equal(false);
  });
});
describe('rotate the turtle', () => {
  context('when the turtle is facing south', () => {
    it('should call rotate function', () => {
      rotateTurtleRight()(dispatchSpy, getState);
      expect(dispatchSpy).to.have.been.calledWith({ type: ROTATE_TURTLE,
        turtlePosition: 'west',
        turtleClass: 'face-west' });
    });
    it('should call rotate function', () => {
      rotateTurtleLeft()(dispatchSpy, getState);
      expect(dispatchSpy).to.have.been.calledWith({ type: ROTATE_TURTLE,
        turtlePosition: 'east',
        turtleClass: 'face-east' });
    });
  });
  context('when the turtle is facing north', () => {
    const appStateNorth = {
      direction: NORTH,
      x: 2,
      y: 3,
      turtleClass: 'face-north',
      turtlePosition: 'north'
    };
    const appStateNorthFn = () => (appStateNorth);
    it('should call rotate function', () => {
      rotateTurtleRight()(dispatchSpy, appStateNorthFn);
      expect(dispatchSpy).to.have.been.calledWith({ type: ROTATE_TURTLE,
        turtlePosition: 'east',
        turtleClass: 'face-east' });
    });
    it('should call rotate function', () => {
      rotateTurtleLeft()(dispatchSpy, appStateNorthFn);
      expect(dispatchSpy).to.have.been.calledWith({ type: ROTATE_TURTLE,
        turtlePosition: 'west',
        turtleClass: 'face-west' });
    });
  });
  context('when the turtle is facing east', () => {
    const appStateEast = {
      direction: EAST,
      x: 2,
      y: 3,
      turtleClass: 'face-east',
      turtlePosition: 'east'
    };
    const appStateEastFn = () => (appStateEast);
    it('should call rotate function', () => {
      rotateTurtleRight()(dispatchSpy, appStateEastFn);
      expect(dispatchSpy).to.have.been.calledWith({ type: ROTATE_TURTLE,
        turtlePosition: 'south',
        turtleClass: 'face-south' });
    });
    it('should call rotate function', () => {
      rotateTurtleLeft()(dispatchSpy, appStateEastFn);
      expect(dispatchSpy).to.have.been.calledWith({ type: ROTATE_TURTLE,
        turtlePosition: 'north',
        turtleClass: '' });
    });
  });
  context('when the turtle is facing west', () => {
    const appStateWest = {
      direction: WEST,
      x: 2,
      y: 3,
      turtleClass: 'face-west',
      turtlePosition: 'west'
    };
    const appStateWestFn = () => (appStateWest);
    it('should call rotate function', () => {
      rotateTurtleRight()(dispatchSpy, appStateWestFn);
      expect(dispatchSpy).to.have.been.calledWith({ type: ROTATE_TURTLE,
        turtlePosition: 'north',
        turtleClass: '' });
    });
    it('should call rotate function', () => {
      rotateTurtleLeft()(dispatchSpy, appStateWestFn);
      expect(dispatchSpy).to.have.been.calledWith({ type: ROTATE_TURTLE,
        turtlePosition: 'south',
        turtleClass: 'face-south' });
    });
  });
});
describe('executeCommand', () => {
  context('when the command is right', () => {
    const appStateRight = {
      x: 2,
      y: 3,
      turtleClass: 'face-south',
      toDo: 'right',
      turtlePosition: 'south',
      turtleCommand: 'right'
    };
    const appStateRightFn = () => (appStateRight);
    it('should call rotate right function', () => {
      rotateTurtleRight()(dispatchSpy, appStateRightFn);
      expect(dispatchSpy).to.have.been.calledWith({ type: ROTATE_TURTLE,
        turtlePosition: 'west',
        turtleClass: 'face-west' });
    });
  });
  context('when the command is left', () => {
    it('should call rotate left function', () => {
      executeCommand()(dispatchSpy, getState);
      expect(dispatchSpy).to.have.been.calledWith({ type: ROTATE_TURTLE,
        turtlePosition: 'east',
        turtleClass: 'face-east' });
    });
  });
});

