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
  let data = {
    amount: action.payload.amount,
    id: action.payload.id,
    crypto_name: action.payload.crypto_name,
  };
  console.log(`getCoinInfo2 Data => `, data);
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
    // yield console.log(`Coin data from server => `, coin_page_coin_info.data[0]);
    yield put({ type: "SET_VALUE_AMOUNT_OWNED", payload: response.data });
    // yield put({ type: "GET_COIN_INFO_REDUCER" });
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
    coin_symbol: action.payload.coin_symbol,
    coin_image: action.payload.coin_image,
  };
  try {
    // const response = yield axios.post(
    //   `/api/CoinPage/Buy/${data.crypto_name}/${action.payload.id}`,
    //   data
    // );
    const response = yield axios.post(
      `/api/CoinPage/Buy/${data.crypto_name}/${action.payload.id}`,
      data
    );
      // console.log(`server response on buying coin =>`, response.data )

      /**
       * Dev Note to self, This info comes back quickly, the following info
       * takes quite a bit of time.
       * We get a -1 response from server because we can't buy the amount listed.
       */
    if (response.data[0] === -1) {
      yield put({ type: "CANT_BUY_COIN_AMOUNT" });
    } else {
      // Set reducer with our data from database
      yield put({ type: "SET_ACCOUNT_COIN_AMOUNT", payload: response.data });
      // console.log(response.data);
      yield put({
        type: "FETCH_COIN_INFO2",
        payload: data,
      });
      yield put({ type: "GET_COIN_INFO_REDUCER" });

      // Updates users coin info
      yield put({ type: "UPDATE_COIN_INFO", payload: action.payload });

      // profileData needs to update our DOM
      yield put({ type: "GET_CREATE_PROFILE" });
    }
  } catch (error) {
    console.log(`Sorry, POST request error with coin buy`, error);
  }
}

function* sellCoinAmount(action) {
  // Set our action.payload to a data object
  // to send on our POST promise
  console.log(`Selling Coin info`, action.payload);
  const data = {
    amount: action.payload.amount,
    crypto_name: action.payload.name,
    id: action.payload.id,
  };
  try {
    yield axios.put(
      `/api/CoinPage/sellCoin/${action.payload.crypto_name}/${action.payload.id}`,
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
  console.log(`Trying to buy more coins => `, action.payload);
  const data = {
    amount: action.payload.amount,
    id: action.payload.id,
    crypto_name: action.payload.crypto_name,
  };
  try {
    yield axios.put(`/api/CoinPage/v1/buyMoreCoins`, data);
    // Update coin client side data
    yield put({
      type: "FETCH_COIN_INFO2",
      payload: action.payload,
    });
    // // Updates users coin info
    yield put({ type: "GET_CREATE_PROFILE" });
  } catch (error) {
    console.log(`We buy more coins for you =>`, error);
  }
}

function* deleteCoin(action) {
  const data = {
    crypto_name: action.payload.crypto_name,
    id: action.payload.id,
  };
  console.log(`Info from coin to delete => `, data);
  try {
    yield axios.delete(`/api/CoinPage/v1/${data.crypto_name}/${data.id}`, data);
    yield put({ type: "CLEAR_COIN_INFO" });
    // // Updates users coin info
    yield put({ type: "GET_CREATE_PROFILE" });
  } catch (error) {
    console.log(`Sorry, we couldn't delete your coin.`, error);
  }
}

function* coinPageSaga() {
  // yield takeLatest("FETCH_COIN_INFO", getCoinInfo);
  // yield takeLatest("FETCH_COIN_INFO2", getCoinInfo2);
  
  yield takeEvery("FETCH_COIN_INFO", getCoinInfo);
  yield takeEvery("FETCH_COIN_INFO2", getCoinInfo2);

  yield takeLatest("UPDATE_COIN_AMOUNT", updateCoinAmount);
  yield takeLatest("POST_COIN_AMOUNT", postAmountToBuy);
  yield takeLatest("SELL_COIN_AMOUNT", sellCoinAmount);
  yield takeLatest("DELETE_THIS_COIN", deleteCoin);
}

export default coinPageSaga;
