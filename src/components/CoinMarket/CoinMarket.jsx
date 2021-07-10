import React, { useEffect, useState } from "react";
import axios from "axios";
import CoinMarket2 from "./CoinMarket2";
import "./CoinMarket.css";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import NavDrawer from "../NavDrawer/NavDrawer";

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function CoinMarket() {
  //#region useState area
  const [coinsFromGecko, setCoinsFromGecko] = useState([]);
  const [resultsSearch, setResultsSearch] = useState("");
  //#endregion

  // Bring the store in
  const profileData = useSelector((store) => store.profileData);

  const handleChange = (event) => {
    setResultsSearch(event.target.value);
  };

  const coinsSort = coinsFromGecko.filter((coins) =>
    /**
     * Coins come back from the api lowercase,
     * this ensures that we can find a match
     * if it exist, no match === nothing shown!
     */
    coins.name.toLowerCase().includes(resultsSearch.toLowerCase())
  );

  //#region useEffect Area
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage='1h%2C%2024h%2C%207d%2C%2030d%2C%201y'"
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
      {!profileData.length ? (
        <Redirect to="/createProfile" />
      ) : (
        <div className="create-profile-container">
          <NavDrawer props={true} />
          <div className="create-form">
            <div className="coin-container">
              <h3>Looking for a Coin?</h3>
              <div className="coin-results">
                <form>
                  <input
                    placeholder="..."
                    className="coin-search-input"
                    onChange={handleChange}
                  ></input>
                </form>
              </div>
              {coinsSort.map((coins) => {
                return (
                  <CoinMarket2
                    key={coins.id}
                    name={coins.name}
                    price={coins.current_price}
                    coins={coins}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CoinMarket;
