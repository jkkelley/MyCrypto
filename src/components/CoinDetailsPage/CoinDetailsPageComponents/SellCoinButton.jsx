function SellCoinButton({ useStyles, Button }) {
  // Bring in Custom CSS classes
  const classes = useStyles();
  // Function to handleBuy click
  const handleSell = () => {
    console.log(`You clicked handleSell`);
  };
  return (
    <>
      <Button className={classes.root2} onClick={handleSell}>
        Sell
      </Button>
    </>
  );
}

export default SellCoinButton;
