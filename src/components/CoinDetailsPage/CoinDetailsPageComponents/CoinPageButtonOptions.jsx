import BuyCoinButton from "./BuyCoinButton";
import BuyMoreCoinsButton from "./BuyMoreCoinsButton";
import DeleteCoinButton from "./DeleteCoinButton";
import SellCoinButton from "./SellCoinButton";

import { Button, Grid } from "@material-ui/core";

function CoinPageButtonOptions({
  Button,
  classes,
  coinInfoReducer,
  coins,
  errorMessageReducer,
}) {
  return (
    <>
      {coinInfoReducer[0][1] === undefined ? (
        <BuyCoinButton Button={Button} classes={classes} />
      ) : (
        <>
          <Grid className={classes.buySellDeleteBtn}>
            <BuyMoreCoinsButton Button={Button} classes={classes} />
            <SellCoinButton Button={Button} classes={classes} />
            <DeleteCoinButton coins={coins} Button={Button} classes={classes} />
          </Grid>
        </>
      )}
    </>
  );
}

export default CoinPageButtonOptions;

/**
 *           {errorMessageReducer.message ? (
            <>
              <div>
                <p>{errorMessageReducer.message}</p>
              </div>
            </>
          ) : (
            ""
          )}
 */
