function BuyCoinButton({ useStyles, Button }) {
  // Bring in Custom CSS classes
  const classes = useStyles();
  // Function to handleBuy click
  const handleBuy = () => {
    console.log(`You clicked handleBuy`);
  };
  return (
    <>
      <Button className={classes.root1} onClick={handleBuy}>
        Buy
      </Button>
    </>
  );
}

export default BuyCoinButton;
