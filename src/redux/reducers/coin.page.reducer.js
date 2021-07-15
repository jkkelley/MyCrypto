export const coinInfoReducer = (state = [], action) => {
  switch (action.type) {
    // Sets reducer state to action payload
    case "SET_ACCOUNT_COIN_AMOUNT":
      return  [action.payload] ;
    case "UPDATE_COIN_INFO":
      return { ...state, user_updated_coin_info: action.payload };
    case "CLEAR_COIN_INFO":
      return [];
    default:
      return state;
  }
};
