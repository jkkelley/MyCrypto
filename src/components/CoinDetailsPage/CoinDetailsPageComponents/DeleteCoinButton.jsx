import Swal from "sweetalert2";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function DeleteCoinButton({ Button, classes, coins }) {
  // Bringing in History
  const history = useHistory()
  // Bring in dispatch
  const dispatch = useDispatch();
  // Bring in params
  const params = useParams();
  // Bring in user
  const user = useSelector((store) => store.user);

  // Function to handleDelete click
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `ALL Note and ${params.id.toUpperCase()} data for this coin will be deleted!`,
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
            id: user.id,
          };
          console.log(data);
          dispatch({ type: "DELETE_THIS_COIN", payload: data });
          history.push("/coinMarket")
        });
      } else {
        return;
      }
    });
  };
  return (
    <>
      <Button className={classes.notesButton} onClick={handleDelete}>
        Delete
      </Button>
    </>
  );
}

export default DeleteCoinButton;
