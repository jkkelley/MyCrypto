export const coinNotes = (state = [], action) => {
  switch (action.type) {
    case "SET_NOTES_FROM_COIN":
      return action.payload;
    case "CLEAR_NOTES_FROM_COIN":
      return [];
    default:
      return state;
  }
};
