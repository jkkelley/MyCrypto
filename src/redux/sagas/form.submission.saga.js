import { put, takeLatest, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* postCreateForm(action) {
  try {
    yield axios.post(`/api/createProfile`, action.payload);
  } catch (error) {
    console.log(`We had an postCreateForm error...`, error);
  }
}

function* createFormSaga() {
  yield takeLatest("POST_CREATE_PROFILE", postCreateForm);
}

// Export listeners to the root
export default createFormSaga;
