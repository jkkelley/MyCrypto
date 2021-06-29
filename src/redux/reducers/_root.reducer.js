
import { coinInfoReducer } from './coin.page.reducer';
import { combineReducers } from 'redux';
import { formSubmission } from './form.submission.reducer';
import { profileData } from './profile.reducer';

import errors from './errors.reducer';
import user from './user.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  coinInfoReducer,
  formSubmission, // contains form for creating a user_profile
  errors, // contains registrationMessage and loginMessage
  profileData, // contains profile data from table user_profile
  user, // will have an id and username if someone is logged in
});

export default rootReducer;
