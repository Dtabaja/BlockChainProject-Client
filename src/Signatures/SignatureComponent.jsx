import style from '../BlockChain/card.module.css'
import { Button,Card } from "react-bootstrap";
import React ,{useState} from "react"


export const SignatureComponent = (data) => {
  let border;
  if (data.wrongMessage) {
    border = data.color ? style.cardBorderCorrect : style.cardBorderError;
  }

  return (
    <Card
      border={data.background}
      className={`${style.cardSpace} ${border}`}
    >
      <Card.Body class="col-md-20">
        <Card.Title className={style.title}>{data.title}</Card.Title>
        <div className={style.spaceDiv}>{data.children}</div>
        <div className={style.spaceDiv}>{data.result}</div>
      </Card.Body>
    </Card>
  );
};
export default SignatureComponent;
