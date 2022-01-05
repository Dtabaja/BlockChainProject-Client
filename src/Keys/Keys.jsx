import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./keys.module.css";
import { Button } from "react-bootstrap";


const Keys = () => {
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");

  useEffect(() => {
    random();
  }, []);

  const onChangeHash = (data) => {
    setPrivateKey(data.target.value);
    axios
      .post("http://localhost:5000/keys/publicKey", { prKey: privateKey })
      .then((res) => {
        setPublicKey(res.data.puKey);
      });
  };

  const random = () => {
    axios.get("http://localhost:5000/keys/initKeys").then((res) => {
      setPrivateKey(res.data.prKey);
      setPublicKey(res.data.puKey);
    });
  };
  
  const inputText = (
    <div>
      <label>Private Key:</label>
      <input
        type="text"
        id="privateKey"
        name="privateKey"
        value={privateKey}
        onChange={onChangeHash}
        className={style.inputData}
      />
      <Button onClick={random}>Random</Button>
    </div>
  );

  const inputResult = (
    <div>
      <label className={style.marginInput}>
        Public Key:
      </label>
     {publicKey}
    </div>
  );

  return (
      <div>
          <h1>Keys</h1>
    <div>
      {inputText} 
      <br></br>
    </div>
    <br></br>
    <div>
    {inputResult}
    </div>
    </div>
  );
};

export default Keys;
