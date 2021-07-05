import Swal from "sweetalert2";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function BuyMoreCoinsButton({ useStyles, Button }) {
  // Bring in dispatch
  const dispatch = useDispatch();
  // Bring in params
  const params = useParams();
  const user = useSelector((store) => store.user);

  // Bring in Custom CSS classes
  const classes = useStyles();

  // Function to validate numbers and one decimal
  function validateCoinAmount(coinAmountToBuy) {
    // We have a regex to check that there is only one ".",
    // Also allows up to 8 digits past the decimal to the right.
    const regex = /^\d*(\.\d{1,8})?$/;
    console.log(coinAmountToBuy);
    return regex.test(coinAmountToBuy);
  }

  // Function to handle Buying more coins
  const handleBuyingMoreCoins = async () => {
    console.log(`handleBuyingMoreCoins`);
    const { value: coinAmountToBuy } = await Swal.fire({
        title: `${params.id}`,
        input: "text",
        inputValue: "",
        confirmButtonText: "Buy",
        showCancelButton: true,
        allowOutsideClick: true,
        allowEnterKey: true,
        backdrop: true,
        inputValidator: (value) => {
          // No input, return them a message.
          if (!value) {
            return "You need to write something!";
          }
          // If the user doesn't enter correct amount,
          // They're greeted with a message.
          if (!validateCoinAmount(value)) {
            return "Need valid amount";
          } else {
            // We got a valid value, need to dispatch to saga.
            console.log(Number(value));
            dispatch({
              type: "UPDATE_COIN_AMOUNT",
              payload: { amount: Number(value), crypto_name: params.id, id: user.id},
            });
          }
        },
      });
  };

  return (
    <>
      <Button onClick={handleBuyingMoreCoins}> Buy</Button>
    </>
  );
}

export default BuyMoreCoinsButton;
