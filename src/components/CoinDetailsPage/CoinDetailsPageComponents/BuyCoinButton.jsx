import Swal from "sweetalert2";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import "./CoinDetailsPageCSS/CoinDetailsPage.css"

function BuyCoinButton({ Button, classes }) {
  // Bring in dispatch
  const dispatch = useDispatch();
  // Bring in params
  const params = useParams();
  const user = useSelector((store) => store.user);

  // Function to validate numbers and one decimal
  function validateCoinAmount(coinAmountToBuy) {
    // We have a regex to check that there is only one ".",
    // Also allows up to 8 digits past the decimal to the right.
    const regex = /^\d*(\.\d{1,8})?$/;
    console.log(coinAmountToBuy);
    return regex.test(coinAmountToBuy);
  }
  // Function to handleBuy click
  const handleBuy = async () => {
    dispatch({ type: "RESET_ERROR_COIN_MESSAGE" });
    console.log(`You clicked handleBuy no coins`);
    console.log(`coinsFromGecko buyCoinButton => `);
    const { value: coinAmountToBuy } = await Swal.fire({
      title: `${params.id}`,
      input: "text",
      inputValue: "",
      // inputValue: profileData[0]?.users_first_name,
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
            type: "POST_COIN_AMOUNT",
            payload: {
              amount: Number(value),
              crypto_name: params.id,
              id: user.id,
            },
          });
        }
      },
    });
  };
  return (
    <>
      <Button className={classes.buySellDeleteBtn} onClick={handleBuy}>
        Buy
      </Button>
    </>
  );
}

export default BuyCoinButton;
