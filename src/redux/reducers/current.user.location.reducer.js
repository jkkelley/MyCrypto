
export const currentUserLocationReducer = (state = {}, action) => {
  switch (action.type) {
    case "CURRENT_USER_LOCATION":
      return action.payload;
    case "CLEAR_CURRENT_USER_LOCATION":
      return {};
    default:
      return state;
  }
};
