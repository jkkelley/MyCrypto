import { put, takeLatest, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* getMarketChartData(action) {
  console.log(`Got to getMarketChartData`);
  try {
    const marketChartData = yield axios.get(
      `/api/marketChart/v1/${action.payload}`
    );
    // console.log(`marketChartData => `, marketChartData.data);
    yield put({
      type: "SET_MARKET_CHART_DATA",
      payload:  marketChartData.data ,
    });
    yield put({ type: "SET_MARKET_CHART_DATA_STATUS", payload: true });
  } catch (error) {
    console.log(`Sorry we couldn't grab your Chart Data =>`, error);
  }
}

function* marketChartDataSaga() {
  yield takeLatest("FETCH_MARKET_CHART_DATA", getMarketChartData);
}

export default marketChartDataSaga;
