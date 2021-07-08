export const marketChartStatus = (state = false, action) => {
  switch (action.type) {
    case "SET_MARKET_CHART_DATA_STATUS":
      return action.payload;
    case "CLEAR_MARKET_CHART_DATA_STATUS":
      return false;
    default:
      return state;
  }
};
