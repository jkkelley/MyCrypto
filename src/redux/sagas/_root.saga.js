import { all } from "redux-saga/effects";
import coinPageSaga from "./coin.page.saga";
import createProfileSaga from "./form.submission.saga";
import loginSaga from "./login.saga";
import marketChartDataSaga from "./market.chart.data.saga"
import myStashPageSaga from "./myStash.page.saga";
import notesCoinPageSaga from "./notes.coin.page.saga";
import profilePageSaga from "./profile.page.saga";
import registrationSaga from "./registration.saga";
import userSaga from "./user.saga";
// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    myStashPageSaga(),
    coinPageSaga(),
    createProfileSaga(),
    loginSaga(), // login saga is now registered
    marketChartDataSaga(),
    notesCoinPageSaga(),
    profilePageSaga(),
    registrationSaga(),
    userSaga(),
  ]);
}
