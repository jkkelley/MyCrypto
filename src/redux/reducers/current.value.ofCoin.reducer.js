export const myStashCoinPriceReducer = (state = [], action) => {
  switch (action.type) {
    case "MY_STASH_VALUE":
      return [Number(state) + Number(action.payload)];
    case "CLEAR_MY_STASH_COINS_PRICE":
      return [];
    default:
      return state;
  }
};
