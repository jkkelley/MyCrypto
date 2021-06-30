export const coinInfoReducer = (state = [], action) => {
  switch (action.type) {
    // Sets reducer state to action payload
    case "SET_COIN_INFO":
      return action.payload;
    case "CLEAR_COIN_INFO":
      return [];
    default:
      return state;
  }
};

