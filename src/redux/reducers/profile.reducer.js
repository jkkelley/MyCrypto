export const profileData = (state = [], action) => {
  // A check to see which action.type we received
  switch (action.type) {
    case "SET_PROFILE_INFO":
      return action.payload;
    default:
      return state;
  }
};
