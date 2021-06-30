import { put, takeLatest, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* getCoinInfo(action) {
  console.log(action.payload);
  try {
    // Set a response for our axios get promise
    const response = yield axios.get(
      `/api/CoinPage/UpdatedAmount/${action.payload.name}/${action.payload.id}`
    );
    // Set reducer with our data from database
    yield put({ type: "SET_COIN_INFO", payload: response.data });
  } catch (error) {
    console.log(`Sorry we had a problem with GET coin info`, error);
  }
}

function* postAmountToBuy(action) {
  // Set our action.payload to a data object
  // to send on our POST promise
  const data = {
    amount: action.payload.amount,
    name: action.payload.name,
    id: action.payload.id,
  };
  try {
    const response = yield axios.post(
      `/api/CoinPage/Buy/${action.payload.name}/${action.payload.id}`,
      data
    );
    // Set reducer with our data from database
    yield put({ type: "SET_COIN_INFO", payload: response.data });
    // profileData needs to update our DOM
    yield put({type: "GET_CREATE_PROFILE"})
  } catch (error) {
    console.log(`Sorry, POST request error with coin buy`, error);
  }
}

function* coinPageSaga() {
  yield takeLatest("FETCH_COIN_INFO", getCoinInfo);
  yield takeLatest("POST_COIN_AMOUNT", postAmountToBuy);
}

export default coinPageSaga;
