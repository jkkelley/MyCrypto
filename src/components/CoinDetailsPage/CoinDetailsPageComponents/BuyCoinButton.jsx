import Swal from "sweetalert2";
import { useHistory, useParams } from "react-router-dom";
// import "./CoinDetailsPageCSS/CoinDetailsPage.css"

function BuyCoinButton({ useStyles, Button }) {
  const params = useParams();

  // Bring in Custom CSS classes
  const classes = useStyles();

  // Function to validate numbers and one decimal
  function validateCoinAmount(coinAmountToBuy) {
    // const regex = /\d*\.?\d?/g;
    // const regex = /^\d+([.]?\d{0,2})?$/g;
    const regex = /^\d*(\.\d{1,8})?$/;
    console.log(coinAmountToBuy.length);
    return regex.test(coinAmountToBuy);
  }
  // Function to handleBuy click
  const handleBuy = async () => {
    console.log(`You clicked handleBuy`);

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
        if (!value) {
          return "You need to write something!";
        }
        if (!validateCoinAmount(value)) {
          return "Need valid amount";
        }
      },
    });
  };
  return (
    <>
      <Button onClick={handleBuy}>Buy</Button>
    </>
  );
}

export default BuyCoinButton;
