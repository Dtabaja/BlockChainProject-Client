import React from "react";
import BlockchainClass from "../BlockChain/BlockChainClass";
import style from '../BlockChain/card.module.css'

const distributedClass = () => {
  const peerIndex = ["A", "B", "C"];
  return (
    <div>
      <div> <h1>Distributed Blockchain</h1></div>
      {peerIndex.map((value, index) => (
        <div >
          <h2> Peer  {value} </h2>
          <BlockchainClass indexBlockchain={index + 1}
            />
        </div>
      ))}
    </div>
  );
};

export default distributedClass;
