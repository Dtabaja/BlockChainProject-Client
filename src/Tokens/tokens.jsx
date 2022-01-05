import React from "react";
import style from '../BlockChain/card.module.css'
import TokensClass from "./TokensClass";

const tokens = () => {
  const indexArrToken = ["A", "B", "C"];
  return (
    <div>
      <div><h1>Tokens</h1></div>
      {indexArrToken.map((value, index) => (
        <div key={index + 1}>
           <h2> Peer {value} </h2>
          <TokensClass indexBlockchain={index} key={value} />
        </div>
      ))}
    </div>
  );
};

export default tokens;
