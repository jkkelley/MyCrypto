import CircularProgress from "@material-ui/core/CircularProgress";

function PriceOfCoin({ classes, coinInfoReducer, coinName }) {
  return (
    <>
      <h3>{coinName.toUpperCase()}</h3>
      {!coinInfoReducer[0][1] ? (
        <CircularProgress className={classes.loadingStill} />
      ) : (
        <p>
          {coinInfoReducer[0][1]?.current_price_of_coin?.toLocaleString(
            "en-US",
            {
              style: "currency",
              currency: "USD",
            }
          )}
        </p>
      )}
    </>
  );
}

export default PriceOfCoin;
