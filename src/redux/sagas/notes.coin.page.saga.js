import { put, takeLatest, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* postCoinNote(action) {
  console.log(action.payload);
  try {
    yield axios.post(
      `/api/coinNotes/v1/${action.payload.crypto_name}/${Number(action.payload.id)}`,
      action.payload
    );
    yield put({ type: "FETCH_COIN_NOTE", payload: action.payload });
  } catch (error) {
    console.log(`We had a problem sending your note to the server`, error);
  }
}

function* fetchCoinNote(action) {
  console.log(action);
  try {
    const response = yield axios.get(
      `/api/coinNotes/v1/${action.payload.crypto_name}/${Number(action.payload.id)}`
    );
    yield put({ type: "SET_NOTES_FROM_COIN", payload: response.data });
  } catch (error) {
    console.log(`We couldn't get your Notes`, error);
  }
}

function* updateCoinNote(action) {
  console.log(`update note => `, action.payload);
  try {
    yield axios.put(
      `/api/coinNotes/v1/update/note/${action.payload.name}/${action.payload.id}`,
      action.payload
    );
    yield put({type: "FETCH_COIN_NOTE", payload: action.payload})
  } catch (error) {
    console.log(`Couldn't Update your note, sorry`, error);
  }
}

function* deleteCoinNote(action) {
  console.log(`delete note => `, action.payload)
  try {
    yield axios.delete(`/api/coinNotes/v1/delete/${action.payload.name}/${action.payload.note_id}/${action.payload.coin_page_id}`)
    yield put({type: "FETCH_COIN_NOTE", payload: action.payload})
  } catch(error) {
    console.log(`Sorry, We couldn't delete your Note...`, error)
  }
}

function* notesCoinPageSaga() {
  yield takeLatest("POST_COIN_NOTE", postCoinNote);
  yield takeLatest("FETCH_COIN_NOTE", fetchCoinNote);
  yield takeLatest("UPDATE_COIN_NOTE", updateCoinNote);
  yield takeLatest("DELETE_COIN_NOTE", deleteCoinNote)
}

export default notesCoinPageSaga;
