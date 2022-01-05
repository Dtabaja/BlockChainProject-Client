import React ,{useEffect, useState ,useCallback} from "react"
import { BlockComponent } from "../BlockChain/BlockComponent";
import axios from "axios";
import style from '../BlockChain/card.module.css'

const TokensClass = (props) => {
  const [token, setToken] = useState([]);
  const indexBlockchain = props.indexBlockchain;

  useEffect(() => {
    let arrOfBlock;
    axios
      .get("http://localhost:5000/blockchain/initBlockchainToken" , {
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
          const blockchain = res.data.blockchain.map((block, index) => {
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
          const newBlockArr = res.data.blockchain.map((block, index) => {
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
          class="col-md-1 col-sm-8"
        >
          prev:
        </label>
        <InputResult
          result={token[index].precedingHash}
        />
      </div>
      <div class="row flex-nowrap">
        <label 
        class="col-md-1 col-sm-8">
          Hash:
        </label>
        <InputResult 
        result={token[index].hash} 
        />
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
        name={keyValue}
        value={token[index][keyValue]}
        onChange={(data) => onChangeValue(data, index, keyValue)}
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
            isVerify={data.isVerify ? data.isVerify[index] : null}
          />
        ))}
    </div>
  );
};

const SingleRow = (data) => {
  const descriptionData = ["$", "from", "->"];

  const indexBlock = data.indexBlock;
  const indexRow = data.indexRow;

  const changeInput = (inputData, indexData, indexRow) => {
    const newValue = inputData.target.value;
    data.onchange(indexBlock, indexData, newValue, indexRow);
  };

  const rowForDisplay = descriptionData.map((description, index) => (
    <div class="flex-inline" key={index} className={style.space}>
    {/* making the symbols */}
    <label >
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
    <div class="row flex-nowrap col-md-2">
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
          >  
          </BlockComponent>
  ))}
   </div>
  );
};

export default TokensClass;
