import { put, takeLatest, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* getMyStashCoinDetails(action) {
  console.log(`getMyStashCoinDetails data => `, action.payload);
  try {
    const responses = yield axios.get(`/api/myStash/v1/${action.payload.user_id}`)
    yield console.log(responses)
  } catch (error) {
    console.log(`We couldn't grab your MyStash details`, error);
  }
}

function* myStashPageSaga() {
  // Saga to watch for all users coins
  yield takeLatest("GET_MYSTASH_PAGE_DETAILS", getMyStashCoinDetails);
}

export default myStashPageSaga;
