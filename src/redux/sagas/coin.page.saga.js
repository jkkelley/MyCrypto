import { put, takeLatest} from "redux-saga/effects";
import axios from "axios";

function* getCoinInfo3(action) {
  console.log(`What we get for coin info => `, action.payload);
  let data = {
    amount: action.payload.amount,
    id: action.payload.id,
    crypto_name: action.payload.crypto_name,
  };
  try {
    // Set a response for our axios get promise
    const coin_page_coin_info = yield axios.get(
      `/api/CoinPage/coinPageCoinInfo/v2/${action.payload.crypto_name}/${action.payload.id}`
    );
    // Set reducer with our data from database
    yield put({
      type: "SET_ACCOUNT_COIN_AMOUNT",
      payload: coin_page_coin_info.data,
    });

    yield put({
      type: "FETCH_COIN_NOTE",
      payload: {
        crypto_name: action.payload.crypto_name,
        id: coin_page_coin_info.data[0].id,
      },
    });
  } catch (error) {
    console.log(`Sorry we had a problem with GET coin info`, error);
  }
}

// No Coins buy amount
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
      `/api/CoinPage/Buy2/${data.crypto_name}/${action.payload.id}`,
      data
    );

    /**
     * We get a -1 response from server because we can't buy the amount listed.
     */
    if (response.data[0] === -1) {
      yield put({ type: "CANT_BUY_COIN_AMOUNT" });
    } else {
      // Set reducer with our data from database
      yield put({ type: "SET_ACCOUNT_COIN_AMOUNT", payload: response.data });
      console.log(`data set, whats fetch coin doing now?`);
      yield put({
        type: "FETCH_COIN_INFO3",
        payload: data,
      });
      // Updates users coin info
      yield put({ type: "UPDATE_COIN_INFO", payload: action.payload });

      // profileData needs to update our DOM
      yield put({ type: "GET_CREATE_PROFILE" });
    }
  } catch (error) {
    console.log(`Sorry, POST request error with coin buy`, error);
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
      type: "FETCH_COIN_INFO3",
      payload: action.payload,
    });
    yield put({ type: "GET_CREATE_PROFILE" });
  } catch (error) {
    console.log(`We buy more coins for you =>`, error);
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
      `/api/CoinPage/sellCoin/v2/${action.payload.crypto_name}/${action.payload.id}`,
      data
    );
    yield put({ type: "FETCH_COIN_INFO3", payload: action.payload });
    // Show updated account_balance by GET request dispatch.
    yield put({ type: "GET_CREATE_PROFILE" })
  } catch (error) {
    console.log(`We had an error Selling that coin amount`, error);
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
    yield put({type: "CLEAR_NOTES_FROM_COIN"})
    yield put({ type: "FETCH_COIN_INFO3", payload: action.payload });
    yield put({ type: "GET_CREATE_PROFILE" });
  } catch (error) {
    console.log(`Sorry, we couldn't delete your coin.`, error);
  }
}

function* coinPageSaga() {
  // Get coin info
  yield takeLatest("FETCH_COIN_INFO3", getCoinInfo3);
  // Post coin info
  yield takeLatest("POST_COIN_AMOUNT", postAmountToBuy);
  // If they own coins already, New put route
  yield takeLatest("UPDATE_COIN_AMOUNT", updateCoinAmount);
  // Update coin info, can't go below 0
  yield takeLatest("SELL_COIN_AMOUNT", sellCoinAmount);
  // Delete coin info, start fresh. Current Value of
  // Coins will be deposited in account_balance.
  yield takeLatest("DELETE_THIS_COIN", deleteCoin);
}

export default coinPageSaga;
