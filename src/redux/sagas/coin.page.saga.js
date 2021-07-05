import { put, takeLatest, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* getCoinInfo(action) {
  console.log(action.payload);
  try {
    // Set a response for our axios get promise
    const coin_page_coin_info = yield axios.get(
      `/api/CoinPage/coinPageCoinInfo/${action.payload.name}/${action.payload.id}`
    );
    const response = yield axios.get(
      `/api/CoinPage/UpdatedAmount/${action.payload.name}/${action.payload.id}`
    );

    // Set reducer with our data from database
    yield put({
      type: "SET_ACCOUNT_COIN_AMOUNT",
      payload: coin_page_coin_info.data,
    });
    yield put({ type: "SET_VALUE_AMOUNT_OWNED", payload: response.data });

    // yield put({ type: "GET_COIN_INFO_REDUCER" });
  } catch (error) {
    console.log(`Sorry we had a problem with GET coin info`, error);
  }
}

function* getCoinInfo2(action) {
  console.log(`What we get for coin info => `, action.payload);
  try {
    // Set a response for our axios get promise
    const coin_page_coin_info = yield axios.get(
      `/api/CoinPage/coinPageCoinInfo/${action.payload.crypto_name}/${action.payload.id}`
    );
    const response = yield axios.get(
      `/api/CoinPage/UpdatedAmount/${action.payload.crypto_name}/${action.payload.id}`
    );

    // Set reducer with our data from database
    yield put({
      type: "SET_ACCOUNT_COIN_AMOUNT",
      payload: coin_page_coin_info.data,
    });
    yield put({
      type: "FETCH_COIN_NOTE",
      payload: coin_page_coin_info.data[0],
    });
    yield console.log(`Coin data from server => `, coin_page_coin_info.data[0])
    yield put({ type: "SET_VALUE_AMOUNT_OWNED", payload: response.data });
    yield put({ type: "GET_COIN_INFO_REDUCER" });
  } catch (error) {
    console.log(`Sorry we had a problem with GET coin info`, error);
  }
}

function* postAmountToBuy(action) {
  // Set our action.payload to a data object
  // to send on our POST promise
  const data = {
    amount: action.payload.amount,
    crypto_name: action.payload.crypto_name,
    id: action.payload.id,
  };
  try {
    const response = yield axios.post(
      `/api/CoinPage/Buy/${data.crypto_name}/${action.payload.id}`,
      data
    );
    // Set reducer with our data from database
    yield put({ type: "SET_ACCOUNT_COIN_AMOUNT", payload: response.data });
    console.log(response.data)
    yield put({
      type: "FETCH_COIN_INFO2",
      payload: action.payload,
    });
    yield put({ type: "GET_COIN_INFO_REDUCER" });

    // Updates users coin info
    yield put({ type: "UPDATE_COIN_INFO", payload: action.payload });

    // profileData needs to update our DOM
    yield put({ type: "GET_CREATE_PROFILE" });
  } catch (error) {
    console.log(`Sorry, POST request error with coin buy`, error);
  }
}

function* sellCoinAmount(action) {
  // Set our action.payload to a data object
  // to send on our POST promise
  const data = {
    amount: action.payload.amount,
    name: action.payload.name,
    id: action.payload.id,
  };
  try {
    yield axios.put(
      `/api/CoinPage/sellCoin/${action.payload.name}/${action.payload.id}`,
      data
    );
    yield put({ type: "FETCH_COIN_INFO2", payload: action.payload });
    // Updates users coin info
    yield put({ type: "UPDATE_COIN_INFO", payload: action.payload });
    // Show updated account_balance by GET request dispatch.
    yield put({ type: "GET_CREATE_PROFILE" });
  } catch (error) {
    console.log(`We had an error Deleting coin amount`, error);
  }
}

function* updateCoinAmount(action) {
  console.log(`Trying to buy more coins => `, action.payload)
  try {
    const response = yield axios.put(`/api/CoinPage/v1/buyMoreCoins`)
  } catch(error) {
    console.log(`We buy more coins for you =>`, error)
  }
}

function* coinPageSaga() {
  yield takeLatest("FETCH_COIN_INFO", getCoinInfo);
  yield takeLatest("FETCH_COIN_INFO2", getCoinInfo2);
  yield takeLatest("UPDATE_COIN_AMOUNT", updateCoinAmount)
  yield takeLatest("POST_COIN_AMOUNT", postAmountToBuy);
  yield takeLatest("SELL_COIN_AMOUNT", sellCoinAmount);
}

export default coinPageSaga;
