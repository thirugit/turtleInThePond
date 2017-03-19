import { PLACE_TURTLE, ROTATE_TURTLE, TAKE_COMMAND, SOUTH } from '../constants/actionsConstants';
import reducer, { initialState } from './reducer';

const actionPayload = {
  direction: SOUTH,
  x: 2,
  y: 3,
  turtleClass: 'face-south',
  toDo: 'move',
  turtlePosition: 'south'
};

describe('reducer', () => {
  it('should handle PLACE_TURTLE', () => {
    const state = reducer(initialState, {
      type: PLACE_TURTLE,
      ...actionPayload
    });
    const expectedState = {
      ...initialState,
      xGridCoordinate: actionPayload.x,
      yGridCoordinate: actionPayload.y,
      turtleClass: actionPayload.turtleClass,
      turtlePosition: actionPayload.direction,
      start: true
    };
    expect(state).to.deep.equal(expectedState);
  });
  it('should handle ROTATE_TURTLE', () => {
    const state = reducer(initialState, {
      type: ROTATE_TURTLE,
      ...actionPayload
    });
    const expectedState = {
      ...initialState,
      turtleClass: actionPayload.turtleClass,
      turtlePosition: actionPayload.direction
    };
    expect(state).to.deep.equal(expectedState);
  });
  it('should handle TAKE_COMMAND', () => {
    const state = reducer(initialState, {
      type: TAKE_COMMAND,
      ...actionPayload
    });
    const expectedState = {
      ...initialState,
      turtleCommand: actionPayload.toDo
    };
    expect(state).to.deep.equal(expectedState);
  });
});
