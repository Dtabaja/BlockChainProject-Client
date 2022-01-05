import React, { useState, useEffect, useCallback } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import style from '../BlockChain/card.module.css'
import { SignatureComponent } from "./SignatureComponent";

const SignaturesClass = () => {
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [message, setMessage] = useState("");
  const [sign, setSign] = useState("");
  const [isVerify, setIsVerify] = useState(true);
  const [wrongMessage, setWrongMessage] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/signature/initSignature").then((res) => {
      setPrivateKey(res.data.prKey);
      setPublicKey(res.data.puKey);
    });
  }, []);

  const onSign = useCallback(() => {
    setWrongMessage(false);
    axios
      .post("http://localhost:5000/signature/sign", {
        message: message,
        prKey: privateKey,
      })
      .then((res) => {
        setPublicKey(res.data.puKey);
        setSign(res.data.signature);
      });
  }, [message, privateKey]);

  const verify = useCallback(() => {
   setWrongMessage(true);
    axios
      .post("http://localhost:5000/signature/verify", {
        message: message,
        puKey: publicKey,
        signature: sign,
      })
      .then((res) => {
        setPublicKey(res.data.puKey);
        setMessage(res.data.message);
        setIsVerify(res.data.ifVerify);
        setSign(res.data.signature);
      });
  }, [message, publicKey, sign]);

  const onChangePK = (data) => {
    setPrivateKey(data.target.value);
    setWrongMessage(false);
  };

  const onChangePublicKey = (data) => {
    setPublicKey(data.target.value);
    setWrongMessage(false);
  };

  const onChangeMessage = (data) => {
    setMessage(data.target.value);
    setWrongMessage(false);
  };

  const onChangeSign = (data) => {
    setSign(data.target.value);
   setWrongMessage(false);
  };

  const inputPublicKey = (
    <div>
      <label 
      >Public Key:</label>
      <br/>
      <input
        type="text"
        id="publicKey"
        name="publicKey"
        value={publicKey}
        onChange={onChangePublicKey}
        class = "col-md-8"
      />
    </div>
  );

  const inputMessage = (
    <div>
      <label 
      >
        Message:
      </label>
      <br/>
      <input
        type="text"
        id="message"
        name="message"
        value={message}
        onChange={onChangeMessage}
        class = "col-md-8"
      />
    </div>
  );

  const inputPK = (
    <div>
      <label 
      >Private Key:
      </label>
      <br/>
      <input
        type="text"
        id="privateKey"
        name="privateKey"
        value={privateKey}
        onChange={onChangePK}
        class = "col-md-8"
      />
    </div>
  );

  const inputSign = (
    <div>
      <label >
        Signature:
      </label>
      <br />
      <input
        type="text"
        id="inputSign"
        name="inputSign"
        value={sign}
        onChange={onChangeSign}
        class = "col-md-8"
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
       class = "col-md-8"

      />
    );
};
  const inputMessageSignature = (
    <div>
      <label>Message Signature:
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
      <Button 
      key="sign" 
      onClick={() => onSign()}>
        Sign
      </Button>
    </div>
  );
  const divInput2 = (
    <div>
      {inputMessage}
      {inputPublicKey}
      {inputSign}
      <br />
      <Button
        onClick={() => verify()}
      >Verify
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
        title=" Verify"
      />
    </div>
  );
};

export default SignaturesClass;
