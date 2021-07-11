<div className="account-balance-container">
{/* <PriceOfCoin coinName={params.id} /> */}
{/* <h3>{params.id.toUpperCase()}</h3> */}
{/* <p>
{coinInfoReducer[0][1]?.current_price_of_coin.toLocaleString(
  "en-US",
  {
    style: "currency",
    currency: "USD",
  }
)}
</p> */}
</div>

{/* {!coinInfoReducer[0][1] && !marketChartDataReducer.length ? (
    <>
      <p>Loading...</p>
    </>
  ) : (
    <div>
      <ChartData
        coinName={params.id}
        marketChartDataReducer={marketChartDataReducer}
        coinPrice={coinInfoReducer[0][1]?.current_price_of_coin}
        marketChartStatus={marketChartStatus}
      />
    </div>
  )} */}

{/* If the User doesn't own any coins, disable user coin section */}
{/* <div className="buy-sell-delete-options-container">
    <>
      {!coinInfoReducer.length ? (
        <BuyCoinButton useStyles={useStyles} Button={Button} />
      ) : (
        <>
          <Grid className={classes.buySellDeleteBtn}>
            <BuyMoreCoinsButton
              Button={Button}
              useStyles={useStyles}
            />
            <SellCoinButton useStyles={useStyles} Button={Button} />
            <DeleteCoinButton
              coins={coins}
              useStyles={useStyles}
              Button={Button}
            />
          </Grid>
        </>
      )}
      {errorMessageReducer.message ? (
        <>
          <div>
            <p>{errorMessageReducer.message}</p>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  </div> */}

{/* {coinInfoReducer[0][1] && !errorMessageReducer.message ? (
    <>
      {!coinInfoReducer.length ? (
        <CircularProgress className={classes.loadingStill} />
      ) : (
        <TableContainer className={classes.table} component={Paper}>
          <Table aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell flexGrow={1} className={classes.name}>
                  {params.id}
                </TableCell>

                <TableCell
                  className={classes.valueCoin}
                  justifyContent="flex-end"
                  align="right"
                >
                  {coinInfoReducer[0][1]?.valueOfCurrentCoin?.toLocaleString(
                    "en-US",
                    {
                      style: "currency",
                      currency: "USD",
                    }
                  )}
                </TableCell>
                <TableCell
                  border={0}
                  className={classes.amountCoin}
                  justifyContent="flex-end"
                  align="right"
                >
                  {coinInfoReducer[0][0].amount_owned?.toLocaleString(
                    {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 8,
                    }
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  ) : (
    <TableContainer component={Paper} className={classes.table}>
      <Table aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell flexGrow={1} className={classes.name}>
              {params.id}
            </TableCell>

            <TableCell
              className={classes.valueCoin}
              justifyContent="flex-end"
              align="right"
            >
              {<div>$0.00</div>}
            </TableCell>
            <TableCell
              className={classes.amountCoin}
              justifyContent="flex-end"
              align="right"
            >
              {<div>0</div>}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )} */}

{/* {!coinInfoReducer.length ? (
    ""
  ) : (
    <>
      <div className="notes-container">
        <NotesFromServer useStyles={useStyles} />
      </div>

      <div className="notes-from-server">
        {coinNotes?.map((notes, index) => {
          return (
            <CoinPageNotes
              key={index}
              index={index}
              notes={notes}
            />
          );
        })}
      </div>
    </>
  )} */}