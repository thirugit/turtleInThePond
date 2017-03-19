import { PLACE_TURTLE, ROTATE_TURTLE, TAKE_COMMAND, NORTH, REPORT_ERROR } from '../constants/actions_constants';

export const initialState = {
  turtlePosition: NORTH,
  xGridCoordinate: 0,
  yGridCoordinate: 0,
  turtleClass: '',
  start: false,
  turtleCommand: '',
  error: ''
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case PLACE_TURTLE: {
      return { ...state,
        start: true,
        xGridCoordinate: action.x,
        yGridCoordinate: action.y,
        turtlePosition: action.direction,
        turtleClass: action.turtleClass,
        error: ''
      };
    }
    case ROTATE_TURTLE: {
      return { ...state,
        turtlePosition: action.turtlePosition,
        turtleClass: action.turtleClass,
        error: ''
      };
    }
    case TAKE_COMMAND: {
      return { ...state,
        turtleCommand: action.toDo,
        error: ''
      };
    }
    case REPORT_ERROR: {
      return { ...state,
        error: action.error
      };
    }
    default: {
      return state;
    }
  }
}
