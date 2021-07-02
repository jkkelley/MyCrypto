import { put, takeLatest, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* postCoinNote(action) {
  console.log(action.payload);
  try {
    yield axios.post(
      `/api/coinNotes/v1/${action.payload.name}/${action.payload.id}}`, action.payload
    );
  } catch (error) {
    console.log(`We had a problem sending your note to the server`, error);
  }
}

function* notesCoinPageSaga() {
  yield takeLatest("POST_COIN_NOTE", postCoinNote);
}

export default notesCoinPageSaga;
