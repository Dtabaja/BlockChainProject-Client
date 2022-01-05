import React, { useState, useEffect, useCallback } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import style from '../BlockChain/card.module.css'
import { SignatureComponent } from "../Signatures/SignatureComponent";

const Transaction = () => {
  const [privateKey, setPrivateKey] = useState("");
  const [data, setData] = useState();
  const [sign, setSign] = useState("");
  const [isVerify, setIsVerify] = useState(true);
  const [wrongMessage, setWrongMessage] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/transaction/initTransaction")
      .then((res) => {
        setPrivateKey(res.data.prKey);
        setData([res.data.message]);
      });
  }, []);

  const onSign = useCallback(() => {
    const dataArr = [...data];
    axios
      .post("http://localhost:5000/transaction/sign", {
        message: data[0],
        prKey: privateKey,
      })
      .then((res) => {
        setSign(res.data.signature);
        dataArr[0][1] = res.data.puKey;
        setData(dataArr);
      });

    setWrongMessage(false);
  }, [data, privateKey]);

  const verify = useCallback(() => {
    const dataArr = [...data];
    axios
      .post("http://localhost:5000/transaction/verify", {
        message: data[0],
        puKey: data[0][1],
        signature: sign,
      })
      .then((res) => {
        setSign(res.data.signature);
        dataArr[0][1] = res.data.message[1];
        setIsVerify(res.data.ifVerify);
        setData(dataArr);
      });
    setWrongMessage(true);
  }, [data, sign]);

  const onChangePK = (e) => {
    setPrivateKey(e.target.value);

    axios
      .post("http://localhost:5000/transaction/getPublicKey", {
        prKey: privateKey,
      })
      .then((res) => (data[0][1] = res.data.puKey));

    setWrongMessage(false);
  };

  const onChangeData = (index = null, indexData, newValue, indexArr) => {
    const DataArrWithTx = [...data];
    DataArrWithTx[indexArr][indexData] = newValue;
    setData(DataArrWithTx);
    setWrongMessage(false);
  };

  const onChangeSign = (data) => {
    setWrongMessage(false);
    setSign(data.target.value);
  };
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
  const descriptionData = ["$", "from", "->"];

  const indexBlock = data.indexBlock;
  const indexRow = data.indexRow;

  const changeInput = (inputData, indexData, indexRow) => {
    const newValue = inputData.target.value;
    data.onchange(indexBlock, indexData, newValue, indexRow);
  };

  const rowForDisplay = descriptionData.map((description, index) => (
    <div class="flex-inline" className={style.space}>
    {/* making the symbols */}
    <label>
    {description}
      </label>
      <input
        type="text"
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
  const inputMessage = (
    <div className={style.marginInputLeft}>
      Message:
      <br />
      <br />
      <TableList
        data={data}
        onchange={onChangeData}
      />
      <br />
    </div>
  );

  const inputPK = (
    <div>
      <label>
        Private Key:
      </label>
      <br />
      <input
        type="text"
        id="privateKey"
        name="privateKey"
        value={privateKey}
        onChange={onChangePK}
        class = "col-md-10"

      />
    </div>
  );

  const inputSign = (
    <div>
      <label>
        Signature:
      </label>
      <br />
      <input
        type="text"
        id="inputSign"
        name="inputSign"
        value={sign}
        onChange={onChangeSign}
        class = "col-md-10"

      />
    </div>
  );
const InputResult = (component) => {
    return (
      <input
        type="text"
        name={component.key}
        value={component.result}
        readOnly={true}
       class = "col-md-10"

      />
    );
};
  const inputMessageSignature = (
    <div>
      <label>
        Message Signature:
      </label>
      <br />
      <InputResult result={sign} />
    </div>
  );

  const divInput1 = (
    <div>
      {inputMessage}
      {inputPK}
      <br />
      <Button onClick={() => onSign()}>
        Sign
      </Button>
    </div>
  );
  const divInput2 = (
    <div>
      {inputMessage}
      {inputSign}
      <br />
      <Button onClick={() => verify()}>
        Verify
      </Button>
    </div>
  );

  return (
    <div class="row">
      <SignatureComponent
        children={divInput1}
        result={inputMessageSignature}
        title="Sign"
      />
      <SignatureComponent
        color={isVerify}
        children={divInput2}
        wrongMessage={wrongMessage}
        title="Verify"
      />
    </div>
  );
};

export default Transaction;
