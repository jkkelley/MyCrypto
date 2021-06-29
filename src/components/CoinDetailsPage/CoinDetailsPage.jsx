import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";
import axios from "axios";

// Custom CSS

// Components import Area

// Material-ui Imports
import Button from "@material-ui/core/Button";
// Sweetalert2
import Swal from "sweetalert2";

function CoinDetailsPage() {
  const [coinsFromGecko, setCoinsFromGecko] = useState([]);
  const params = useParams();
  console.log(params);
  // Bring in useHistory
  const history = useHistory();
  // Bring in dispatch
  const dispatch = useDispatch();
  // We need to bring the store in.
  const profileData = useSelector((store) => store.profileData);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${params.id}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      )
      .then((response) => {
        console.log(`coingecko says response`, response.data);
        setCoinsFromGecko(response.data);
      })
      .catch((error) => {
        console.log(`Ohh No, coingecko failed me! ${error}`);
        alert(`We've had problem, sorry`);
      });
  }, []);

  return (
    <>
      <p>Coin Details Page</p>
      <p>{profileData[0]?.account_balance}</p>

      <h3>{coinsFromGecko[0]?.name}</h3>
      <p>
        {coinsFromGecko[0]?.current_price.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </p>
    </>
  );
}

export default CoinDetailsPage;
