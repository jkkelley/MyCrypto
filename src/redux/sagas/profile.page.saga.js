import { put, takeLatest, takeEvery } from "redux-saga/effects";
import axios from "axios";

// Profile UPDATE Request to server
function* updateProfilePage(action) {
  console.log(action);

  try {
    yield axios.put(`/api/CreateProfile/${action.payload.id}`, action.payload);
    dispatch({ type: "GET_CREATE_PROFILE" });
  } catch (error) {
    console.log(`We had a problem updating you're profile ${error}`);
  }
}

// Profile Delete Request to server
function* deleteProfileSaga(action) {
  console.log(action)
  try{
    yield axios.delete(`/api/CreateProfile/${action.payload}`)
    dispatch({ type: "GET_CREATE_PROFILE" });
  } catch(error) {
    console.log(`We had a problem with your DELETE request ${error}`)
  }
}

function* profilePageSaga() {
  // Saga to watch UPDATE Route to server
  yield takeLatest("UPDATE_PROFILE_PAGE", updateProfilePage);
  // Saga to watch DELETE Route to server
  yield takeLatest("DELETE_USERS_PROFILE", deleteProfileSaga)
}

// Export listeners to the root
export default profilePageSaga;
