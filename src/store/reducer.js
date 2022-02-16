import * as actions from "./actions";

const initialState = {
  users: [],
  curMaxIDValue: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_USER:
      return {
        users: state.users.concat(action.payload),
        curMaxIDValue: action.payload.id,
      };
    case actions.REMOVE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export default reducer;
