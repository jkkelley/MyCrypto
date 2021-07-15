import { Card, Paper, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  root2: {
    width: 350,
    height: 150,
    fontFamily: "'Exo', sans-serif",
    marginTop: 20,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  amountCoin: {
    fontFamily: "'Exo', sans-serif",
    fontSize: 20,
  },
  coinName: {
    fontFamily: "'Exo', sans-serif",
    fontSize: 20,
  },
  valueOfCoin: {
    fontFamily: "'Exo', sans-serif",
    fontSize: 20,
  },
}));

function CoinDetailsCard({ coinInfoReducer, coinName }) {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.root2} variant="outlined">
        <CardContent>
          <Paper className={classes.coinName} justifycontent="flex-start">
            {coinName.toUpperCase()}
          </Paper>
          {coinInfoReducer[0][1]?.valueOfCurrentCoin === undefined ? (
            <CardContent>
              <Paper className={classes.amountCoin} justifycontent="flex-end">
                $0.00
              </Paper>
            </CardContent>
          ) : (
            <CardContent>
              <Paper className={classes.amountCoin}>
                {coinInfoReducer[0][1]?.valueOfCurrentCoin?.toLocaleString(
                  "en-US",
                  {
                    style: "currency",
                    currency: "USD",
                  }
                )}
              </Paper>
            </CardContent>
          )}
          {coinInfoReducer[0][1]?.valueOfCurrentCoin === undefined ? (
            <Paper className={classes.valueOfCoin}>0</Paper>
          ) : (
            <Paper className={classes.valueOfCoin}>
              {coinInfoReducer[0][0]?.amount_owned?.toLocaleString({
                minimumFractionDigits: 0,
                maximumFractionDigits: 8,
              })}
            </Paper>
          )}
        </CardContent>
      </Card>
    </>
  );
}

export default CoinDetailsCard;
