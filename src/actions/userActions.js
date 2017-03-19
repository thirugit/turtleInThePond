import * as types from '../constants/actions_constants';

export function getTurtleClass(direction) {
  if (direction === types.WEST) {
    return types.FACE_WEST;
  } else if (direction === types.EAST) {
    return types.FACE_EAST;
  } else if (direction === types.SOUTH) {
    return types.FACE_SOUTH;
  }
  return types.FACE_NORTH;
}
export function placeTurtle(x, y, direc) {
  return (dispatch, getState) => {
    const { turtlePosition } = getState();
    const direction = (direc !== undefined ? direc : turtlePosition);
    const turtleClass = getTurtleClass(direction);
    dispatch({
      type: types.PLACE_TURTLE,
      x: parseInt(x, 10),
      y: parseInt(y, 10),
      direction,
      turtleClass
    });
  };
}

export function rotateTurtleLeft() {
  return (dispatch, getState) => {
    let pos;
    let face;
    const { turtlePosition } = getState();
    if (turtlePosition === types.NORTH) {
      pos = types.WEST;
      face = types.FACE_WEST;
    } else if (turtlePosition === types.EAST) {
      pos = types.NORTH;
      face = '';
    } else if (turtlePosition === types.SOUTH) {
      pos = types.EAST;
      face = types.FACE_EAST;
    } else if (turtlePosition === types.WEST) {
      pos = types.SOUTH;
      face = types.FACE_SOUTH;
    }
    dispatch({
      type: types.ROTATE_TURTLE,
      turtlePosition: pos,
      turtleClass: face
    });
  };
}
export function rotateTurtleRight() {
  return (dispatch, getState) => {
    let pos;
    let face;
    const { turtlePosition } = getState();
    if (turtlePosition === types.NORTH) {
      pos = types.EAST;
      face = types.FACE_EAST;
    } else if (turtlePosition === types.EAST) {
      pos = types.SOUTH;
      face = types.FACE_SOUTH;
    } else if (turtlePosition === types.SOUTH) {
      pos = types.WEST;
      face = types.FACE_WEST;
    } else if (turtlePosition === types.WEST) {
      pos = types.NORTH;
      face = '';
    }
    dispatch({
      type: types.ROTATE_TURTLE,
      turtlePosition: pos,
      turtleClass: face
    });
  };
}
export function takeCommand(value) {
  return (dispatch) => {
    dispatch({
      type: types.TAKE_COMMAND,
      toDo: value
    });
  };
}
export function reportError(value) {
  return (dispatch) => {
    dispatch({
      type: types.REPORT_ERROR,
      error: value
    });
  };
}
export function report() {
  return (dispatch, getState) => {
    const { xGridCoordinate, yGridCoordinate, turtlePosition, start } = getState();
    if (start === true) {
      console.log(`${xGridCoordinate},${yGridCoordinate},${turtlePosition.toUpperCase()}`);
    }
  };
}
// export function placeTurtleFromKeyboard(e, x, y) {
//   return (dispatch) => {
//     if (e.keyCode === 13) {
//       dispatch(placeTurtle(x, y));
//     }
//   };
// }
export function move() {
  return (dispatch, getState) => {
    const { turtlePosition, xGridCoordinate, yGridCoordinate, start } = getState();
    if (start === true) {
      if (turtlePosition === types.NORTH && yGridCoordinate !== 4) {
        dispatch(placeTurtle(xGridCoordinate, yGridCoordinate + 1));
      } else if (turtlePosition === types.SOUTH && yGridCoordinate !== 0) {
        dispatch(placeTurtle(xGridCoordinate, yGridCoordinate - 1));
      } else if (turtlePosition === types.EAST && xGridCoordinate !== 4) {
        dispatch(placeTurtle(xGridCoordinate + 1, yGridCoordinate));
      } else if (turtlePosition === types.WEST && xGridCoordinate !== 0) {
        dispatch(placeTurtle(xGridCoordinate - 1, yGridCoordinate));
      } else {
        dispatch(reportError('Stay in your safe zone, Turtle!'));
      }
    }
  };
}
export function isValidDirection(str) {
  if (str.split(' ')[1] !== undefined && str.split(' ')[1].split(',')[2] !== undefined) {
    const direction = str.split(' ')[1].split(',')[2];
    if (direction === types.NORTH || direction === types.EAST || direction === types.SOUTH ||
        direction === types.WEST) {
      return true;
    }
  }
  return false;
}
export function checkForValidCoordinates(str, pos) {
  if (str.split(' ')[1] !== undefined && str.split(' ')[1].split(',')[2] !== undefined) {
    const coordinate = str.split(' ')[1].split(',')[pos];
    if (!isNaN(coordinate) && coordinate <= 4 && coordinate >= 0) {
      return true;
    }
  }
  return false;
}
export function executeCommand() {
  return (dispatch, getState) => {
    const { turtleCommand, start } = getState();
    const turtleCommandInLowerCase = turtleCommand.toLowerCase();
    if (turtleCommandInLowerCase === types.LEFT && start === true) {
      dispatch(rotateTurtleLeft());
    } else if (turtleCommandInLowerCase === types.RIGHT && start === true) {
      dispatch(rotateTurtleRight());
    } else if (turtleCommandInLowerCase.split(' ')[0] === types.PLACE
      && checkForValidCoordinates(turtleCommandInLowerCase, 0)
      && checkForValidCoordinates(turtleCommandInLowerCase, 1)
      && isValidDirection(turtleCommandInLowerCase)) {
      dispatch(placeTurtle(turtleCommandInLowerCase.split(' ')[1].split(',')[0],
        turtleCommandInLowerCase.split(' ')[1].split(',')[1],
        turtleCommandInLowerCase.split(' ')[1].split(',')[2]));
    } else if (turtleCommandInLowerCase === types.MOVE && start === true) {
      dispatch(move());
    } else if (turtleCommandInLowerCase === types.REPORT && start === true) {
      dispatch(report());
    } else {
      dispatch(reportError('Please enter a valid command!'));
    }
  };
}

