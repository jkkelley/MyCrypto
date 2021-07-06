export const coinInfoReducer = (state = [], action) => {
  switch (action.type) {
    // Sets reducer state to action payload
    case "SET_VALUE_AMOUNT_OWNED":
      return { ...state, value_of_amount_owned: action.payload };
    case "SET_ACCOUNT_COIN_AMOUNT":
      return { ...state, amount_owned: action.payload };
    case "UPDATE_COIN_INFO":
      return { ...state, user_updated_coin_info: action.payload };
    case "GET_COIN_INFO_REDUCER":
      return { ...state };
    case "COIN_CLICK_INFO_PAGE_2":
      return { ...state, coin_click: action.payload };
    case "CLEAR_COIN_INFO":
      return [];

    default:
      return state;
  }
};
