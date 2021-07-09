export const formSubmission = (state = [], action) => {
  // A check to see which action.type we received
  switch (action.type) {
    case "SET_FIRST_NAME_CREATE_PROFILE":
      return { ...state, first: action.payload };
    case "SET_PROFILE_IMAGE_CREATE_PROFILE":
      return { ...state, image: action.payload };
    case "SET_LAST_NAME_CREATE_PROFILE":
      return { ...state, last: action.payload };
    case "SET_NICKNAME_CREATE_PROFILE":
      return { ...state, nickname: action.payload };
    case "SET_EMAIL_CREATE_PROFILE":
      return { ...state, email: action.payload };
    case "SET_PHONE_NUMBER_CREATE_PROFILE":
      return { ...state, phone_number: action.payload };
    case "CLEAR_FORM_SUBMISSION":
      return [];
    case "GET_FORM_STATE":
      return state;
    default:
      return state;
  }
};
