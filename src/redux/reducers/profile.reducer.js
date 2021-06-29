export const profileData = (state = [], action) => {
  // A check to see which action.type we received
  switch (action.type) {
    case "SET_PROFILE_INFO":
      return action.payload;
    case "CLEAR_PROFILE_INFO":
      return [];
    case "GET_PROFILE_INFO":
      return state;
    default:
      return state;
  }
};
