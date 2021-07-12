import CircularProgress from "@material-ui/core/CircularProgress";

function PriceOfCoin({ classes, coinInfoReducer, coinName , Typography}) {
  return (
    <>
      <Typography className={classes.name2}>{coinName.toUpperCase()} </Typography>
      {!coinInfoReducer[0][1] ? (
        <CircularProgress className={classes.loadingStill} />
      ) : (
        <Typography className={classes.name2}>
          {coinInfoReducer[0][1]?.current_price_of_coin?.toLocaleString(
            "en-US",
            {
              style: "currency",
              currency: "USD",
            }
          )}
          </Typography>

      )}
    </>
  );
}

export default PriceOfCoin;
