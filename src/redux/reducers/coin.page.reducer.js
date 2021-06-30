export const coinInfoReducer = (state = [], action) => {
  switch (action.type) {
    // Sets reducer state to action payload
    case "SET_COIN_INFO":
      return {  coin_info: action.payload };
    case "SET_ACCOUNT_COIN_AMOUNT":
      return { ...state, amount_owned: action.payload };
    case "CLEAR_COIN_INFO":
      return [];
    case "GET_COININFO_REDUCER":
      return state;
    default:
      return state;
  }
};
