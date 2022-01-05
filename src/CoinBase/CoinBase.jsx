import React from "react";
import style from '../BlockChain/card.module.css'
import CoinBaseClass from "./CoinBaseClass";

const coinbase = () => {
  const indexArrToken = ["A", "B", "C"];
  return (
    <div>
      <div><h1>CoinBase</h1></div>
      {indexArrToken.map((value, index) => (
        <div>
           <h2> Peer {value} </h2>
          <CoinBaseClass indexBlockchain={index}/>
        </div>
      ))}
    </div>
  );
};

export default coinbase;
