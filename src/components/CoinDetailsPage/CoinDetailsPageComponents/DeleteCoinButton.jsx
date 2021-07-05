import Swal from "sweetalert2";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function DeleteCoinButton({ coins, useStyles, Button }) {
  // Bring in dispatch
  const dispatch = useDispatch();
  // Bring in params
  const params = useParams();

  const user = useSelector((store) => store.user);
  console.log(`Coin name =>`, coins);
  // Bring in Custom CSS classes
  const classes = useStyles();
  // Function to handleDelete click
  const handleDelete = async (coins) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Deleted!",
          `${
            params.id.charAt(0).toUpperCase() + params.id.slice(1)
          } has been deleted.`,
          "success"
        ).then(() => {
          const data = {
            crypto_name: params.id,
            id: user.id
          }
          console.log(data)
          dispatch({type: "DELETE_THIS_COIN", payload: data})
        });
      } else {
        return;
      }
    });
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
