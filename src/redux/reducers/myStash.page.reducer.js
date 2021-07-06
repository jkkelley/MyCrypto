export const myStashReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_MYSTASH_COINS":
      return action.payload;
    case "CLEAR_MYSTASH_COINS":
      return [];
    default:
      return state;
  }
};
