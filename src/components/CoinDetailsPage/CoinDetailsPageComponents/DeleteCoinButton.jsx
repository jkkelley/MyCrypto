function DeleteCoinButton({ useStyles, Button }) {
  // Bring in Custom CSS classes
  const classes = useStyles();
  // Function to handleDelete click
  const handleDelete = () => {
    // console.log(`You clicked handleDelete`);
  };
  return (
    <>
      <Button className={classes.root1} onClick={handleDelete}>
        Delete
      </Button>
    </>
  );
}

export default DeleteCoinButton;
