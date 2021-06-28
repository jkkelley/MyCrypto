import { put, takeLatest, takeEvery } from "redux-saga/effects";
import axios from "axios";

// POST request to server
function* postCreateProfile(action) {
  console.log(action.user.id);
  try {
    yield axios.post(`/api/createProfile`, action.payload);
  } catch (error) {
    console.log(
      `We had an postCreateForm error, /api/createProfile ... `,
      error
    );
  }
}

// GET Request to server
function* getCreateProfile(action) {
  try {
    const response = yield axios.get("/api/createProfile");
    console.log(`Server Says... ${response}`);
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
