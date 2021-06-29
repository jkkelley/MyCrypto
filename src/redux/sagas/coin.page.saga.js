import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* getCoinInfo(action) {
    console.log(action.payload)
    try {
        // Set a response for our axios get promise
        const response = yield axios.get(`/api/CoinPage/UpdatedAmount/${action.payload}`)
        // Set reducer with our data from database
        yield put({type: "SET_COIN_INFO", payload: response.data})
    } catch(error) {
        console.log(`Sorry we had a problem with GET coin info`, error)
    }
}

function* coinPageSaga() {
    yield takeLatest("FETCH_COIN_INFO", getCoinInfo)
}

export default coinPageSaga