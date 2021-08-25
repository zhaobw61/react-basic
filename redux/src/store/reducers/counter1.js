import * as actionTypes from '../action-types'
function reducer(state={number: 0}, action) {
  switch (action.type) {
    case actionTypes.ADD1:
      return {number:state.number + 1};
    case actionTypes.MINUS1:
      return {number:state.number - 1};
    default:
      return state;
  }
}

export default reducer;