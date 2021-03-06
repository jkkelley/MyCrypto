export const marketChartDataReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_MARKET_CHART_DATA":
      return action.payload;
    case "GET_MARKET_CHART_REDUCER":
      return state;
    case "CLEAR_MARKET_CHART_REDUCER":
      return [];
    default:
      return state;
  }
};
