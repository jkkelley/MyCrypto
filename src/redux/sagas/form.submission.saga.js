import { put, takeLatest, takeEvery } from "redux-saga/effects";
import axios from "axios";

// POST request to server
function* postCreateProfile(action) {

  try {
    yield axios.post(`/api/createProfile`, action.payload);
    // Clear formSubmission
    yield put({ type: "CLEAR_FORM_SUBMISSION" });
    // Grab profileData reducer after post request to update
    // the user has made a profile.
    yield put({ type: "GET_CREATE_PROFILE" });
  } catch (error) {
    console.log(
      `We had an postCreateForm error, /api/createProfile ... `,
      error
    );
  }
}

// Profile GET Request to server
function* getCreateProfile(action) {
  try {
    const response = yield axios.get("/api/createProfile");
    console.log(`Server Says...`, response);
    // Set profile to reducer
    yield put({ type: "SET_PROFILE_INFO", payload: response.data });
  } catch (error) {
    console.log(`We had a GET error, /api/createProfile ... `, error);
  }
}

function* createProfileSaga() {
  // Saga to watch GET Route to server.
  yield takeLatest("GET_CREATE_PROFILE", getCreateProfile);
  // Saga to watch POST Route to server.
  yield takeLatest("POST_CREATE_PROFILE", postCreateProfile);
}

// Export listeners to the root
export default createProfileSaga;
