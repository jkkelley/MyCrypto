import { coinInfoReducer } from "./coin.page.reducer";
import { combineReducers } from "redux";
import { coinNotes } from "./notes.coin.page.reducer";
import { currentUserLocationReducer } from "./current.user.location.reducer";
import { formSubmission } from "./form.submission.reducer";
import { marketChartDataReducer } from "./market.chart.data.reducer"
import {marketChartStatus} from "./market.data.fulfilled.reducer"
import { myStashReducer } from "./myStash.page.reducer";
import { myStashCoinPriceReducer } from "./current.value.ofCoin.reducer";
import { profileData } from "./profile.reducer";

import errors from "./errors.reducer";
import user from "./user.reducer";

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  coinInfoReducer, // users coin info
  marketChartDataReducer, // past 23 hours of prices from coingecko api call
  marketChartStatus, // marketChartData status
  myStashReducer, // users myStash coins info
  myStashCoinPriceReducer,
  coinNotes, // contains users notes
  currentUserLocationReducer, // contains users current location
  formSubmission, // contains form for creating a user_profile
  errors, // contains registrationMessage and loginMessage
  profileData, // contains profile data from table user_profile
  user, // will have an id and username if someone is logged in
});

export default rootReducer;
