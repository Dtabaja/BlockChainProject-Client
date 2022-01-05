import React ,{useEffect, useState ,useCallback} from "react"
import { BlockComponent } from "../BlockChain/BlockComponent";
import axios from "axios";
import style from '../BlockChain/card.module.css'

const CoinBaseClass = (props) => {
  const [token, setToken] = useState([]);
  const indexBlockchain = props.indexBlockchain;

  useEffect(() => {
    let arrOfBlock;
    axios
      .get("http://localhost:5000/blockchain/initBlockchainCoinbase" , {
        params: {
          indexBlockchain: indexBlockchain,
        },
      })
      .then((res) => {
        arrOfBlock = res.data.blockchain.reduce((prev, current) => {
          current.background = current.isMine;
          return [...prev, current];
        }, []);
        setToken(arrOfBlock);
      });
  }, []);

  // on change data or block or nonce
  const getBlock = useCallback(
    (blockIndex) => {
      axios
        .post("http://localhost:5000/blockchain/getBlockchain", {
          newBlock: {
            numBlock: blockIndex,
            data: token[blockIndex].data,
            nonce: token[blockIndex].nonce,
            index: token[blockIndex].index,
          },
          indexBlockchain: indexBlockchain,
        })
        .then((res) => {
          const blockchain = res.data.blockchain.map((block) => {
            block.background = block.isMine;
            return block;
          });
          setToken(blockchain);
        });
    },
    [token]
  );

  //mine
  const mineBlock = useCallback(
    (blockIndex) => {
      axios
        .post("http://localhost:5000/blockchain/mine", {
          newBlock: {
            numBlock: blockIndex,
            data: token[blockIndex].data,
            nonce: token[blockIndex].nonce,
            index: token[blockIndex].index,
            indexBlockchain: indexBlockchain,
          },
          indexBlockchain: indexBlockchain,
        })
        .then((res) => {
          const newBlockArr = res.data.blockchain.map((block) => {
            block.background = block.isMine;
            return block;
          });

          setToken(newBlockArr);
        });
    },
    [token]
  );

  const onChangeValue = (e, index, value) => {
    const copyTokenArr = [...token];
    copyTokenArr[index][value] = e.target.value;
    setToken(copyTokenArr);
    getBlock(index);
  };

  const onChangeData = (index, indexData, newValue, indexArr) => {
    const copyTokenArr = [...token];
    copyTokenArr[index].data[indexArr][indexData] = newValue;
    setToken(copyTokenArr);
    getBlock(index);
  };

  const outputResult = (index) => (
    <div>
      <div class="row flex-nowrap">
        <label
          class="col-md-1 col-sm-1"
        >
          prev:
        </label>
        <InputResult
          result={token[index].precedingHash}
          // keyElement={index + "precedingHash"}
        />
      </div>
      <div class="row flex-nowrap">
        <label 
        htmlFor={index + "hash"} 
       // className={null} 
        class="col-md-1 col-sm-1">
          Hash:
        </label>
        <InputResult 
        result={token[index].hash} 
        keyElement={index + "hash"} />
      </div>
    </div>
  );
const InputResult = (component) => {
    return (
      <input
        type="text"
        name={component.key}
        value={component.result}
        readOnly={true}
        key={component.keyElement}
      //  className={style.notAllowed}
       class = "col-md-8 col-sm-1"

      />
    );
};
  const createInput = (index, keyValue, type) => (
    <div class="row flex-nowrap">
      <label htmlFor={index + keyValue}
       //className={null} 
       class="col-md-1">
        {keyValue.substring(0, 1).toUpperCase() + keyValue.substring(1)}:
      </label>
      <input
        type={type}
        id={index + keyValue}
        name={keyValue}
        value={token[index][keyValue]}
        onChange={(data) => onChangeValue(data, index, keyValue)}
     //   key={index + keyValue}
       class = "col-md-2"
      />
    </div>
  );

  const TableList = (data) => {
  const indexBlock = data.indexBlock;
  return (
    <div>
      {data.data && data.data.map((dataRow, index) => (
          <SingleRow
            data={dataRow}
            onchange={data.onchange}
            indexRow={index}
            indexBlock={indexBlock}
            key={index}
            isVerify={data.isVerify ? data.isVerify[index] : null}
          />
        ))}
    </div>
  );
};

const SingleRow = (data) => {
//  const coinbaseDataDescription = ["$", "->"];
  const descriptionData = ["$", "from", "->"];
    let description;
  const indexBlock = data.indexBlock;
  const indexRow = data.indexRow;

  const changeInput = (inputData, indexData, indexRow) => {
    const newValue = inputData.target.value;
    data.onchange(indexBlock, indexData, newValue, indexRow);
  };
  // if (data.data.length === 2) {
  //   description = coinbaseDataDescription;
 // } 
  //else {
    description = descriptionData;
  //}
  const rowForDisplay = description.map((description, index) => (
    <div class="flex-inline" key={index} className={style.space}>
    {/* making the symbols */}
    <label htmlFor={index + description} >
    {description}
      </label>
      <input
        type="text"
        key={index + description}
        name={index + description}
        value={data.data[index]}
        onChange={(inputDataRow) => changeInput(inputDataRow, index, indexRow)}
      />
    </div>
  ));
  return (
    <div className={style.marginInput} class="row flex-nowrap col-md-2">
      {rowForDisplay}
    </div>
  );
    }
const inputs = (index) => (
    <div>
      {createInput(index, "index", "number")}
      {createInput(index, "nonce", "number")}
    Tx:
      <TableList
        data={token[index].data}
        key={index}
        indexBlock={index}
        onchange={onChangeData}
      />
    </div>
  );

  return (
     <div class="flex-nowrap">
     {token.map((block, index) => (  
       <BlockComponent 
          result={outputResult(index)}
          children={inputs(index)}
          color={block.background}
          mineCall = {()=>mineBlock(index)}
          key={index}>  
          </BlockComponent>
  ))}
   </div>
  );
};

export default CoinBaseClass;
