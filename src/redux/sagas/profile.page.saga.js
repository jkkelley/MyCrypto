import { put, takeLatest, takeEvery } from "redux-saga/effects";
import axios from "axios";

// Profile UPDATE Request to server
function* updateProfilePage(action) {
  console.log(action);

  try {
    yield axios.put(`/api/createProfile/${action.payload.id}`, action.payload);
    dispatch({ type: "GET_CREATE_PROFILE" });
  } catch (error) {
    console.log(`We had a problem updating you're profile ${error}`);
  }
}

function* profilePageSaga() {
  // Sage to watch UPDATE Route to server
  yield takeLatest("UPDATE_PROFILE_PAGE", updateProfilePage);
}

// Export listeners to the root
export default profilePageSaga;
