import React ,{useEffect, useState ,useCallback} from "react"
import { BlockComponent } from "./BlockComponent";
import axios from "axios";
import style from '../BlockChain/card.module.css'


const BlockClass = (blockChainNumber)=> {
  const [blocks,setBlocks] =useState([]);
  const indexBlockchain =
    blockChainNumber.indexBlockchain !== undefined ? blockChainNumber.indexBlockchain : 0;

  useEffect(() =>{
     let arrOfBlock;
    axios
      .get("http://localhost:5000/blockchain/initBlockchain", {
        params: {
          indexBlockchain: indexBlockchain,
        },
      })
      .then((res) => {
        arrOfBlock = res.data.blockchain.reduce((prev, current) => {
          current.background = current.isMine;
          return [...prev, current];
        }, []);
        setBlocks(arrOfBlock);
      });
  }, []);
  
    const getBlock = useCallback(
      (blockIndex) => {
      axios
        .post("http://localhost:5000/blockchain/getBlockchain", {
          newBlock: {
            numBlock: blockIndex,
            data: blocks[blockIndex].data,
            nonce: blocks[blockIndex].nonce,
            index: blocks[blockIndex].index,
          },
          indexBlockchain: indexBlockchain,
        })
        .then((res) => {
          const blockchain = res.data.blockchain.map((block) => {
            block.background = block.isMine;
            return block;
          });
          setBlocks(blockchain);
        });
    },
    [blocks]
  );

    //mine 
   const mineBlock = useCallback(
    (indexBlock) => {
      axios
        .post("http://localhost:5000/blockchain/mine", {
          newBlock: {
            numBlock: indexBlock,
            data: blocks[indexBlock].data,
            nonce: blocks[indexBlock].nonce,
            index: blocks[indexBlock].index,
            indexBlockchain: indexBlockchain,
          },
          indexBlockchain: indexBlockchain,
        })
        .then((res) => {
          const netBlockArr = res.data.blockchain.map((block) => {
            block.background = block.isMine;
            return block;
          });

          setBlocks(netBlockArr);
        });
    },
    [blocks]
  );

  const onChangeValue = (input_data, index, value) => {
    blocks[index][value] = input_data.target.value;
    getBlock(index);
  };
  const outputResult = (index) => (
    <div>
      <div class="row flex-nowrap">
        <label
          htmlFor={index + "precedingHash"}
          class="col-md-1 col-sm-1"
        >prev:</label>
        <InputResult
          result={blocks[index].precedingHash}
        />
      </div>
      <div class="row flex-nowrap">
        <label
          class="col-md-1 col-sm-1"
        >Hash:</label>
        <InputResult
          result={blocks[index].hash}
        />
      </div>
    </div>
  );
  
  const InputResult = (component) => {
    return (
      <input
        type="text"
        value={component.result}
        readOnly={true}
       class = "col-md-8 col-sm-8"

      />
    );
};
  const createInput = (index, keyValue, type) => (
    <div class="row flex-nowrap">
      <label
        class="col-md-1">
      {keyValue.substring(0, 1).toUpperCase() + keyValue.substring(1)}:
      </label>
      <input
        type={type}
        value={blocks[index][keyValue]}
        onChange={(input_data) => 
          onChangeValue(input_data, index, keyValue)}
          class = "col-md-2"
      />
    </div>
  );
   const inputs = (index) => (
    <div>
      {createInput(index, "index", "number")}
      {createInput(index, "nonce", "number")}
      {createInput(index, "data", "text")}
    </div>
  );
  const allBlocks = (
 <div class="flex-nowrap">
     {blocks.map((block, index) => (  
       <BlockComponent 
            result={outputResult(index)}
            children={inputs(index)}
            color={block.background}
            mineCall = {()=>mineBlock(index)}
            >  
          </BlockComponent>
  ))}
   </div>
   )

  return <div>
  {allBlocks}
  </div>
}
export default BlockClass
