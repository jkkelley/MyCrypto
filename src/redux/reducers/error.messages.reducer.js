export const errorMessageReducer = (state = {}, action) => {
  switch (action.type) {
    case "CANT_BUY_COIN_AMOUNT":
      return {
        message: "Sorry, You do not have the funds available to buy this coin.",
      };
    case "RESET_ERROR_COIN_MESSAGE":
      return {};
    default:
      return state;
  }
};
