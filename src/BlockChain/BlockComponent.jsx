import React  from "react"
import { Card,Button} from "react-bootstrap";
import style from './card.module.css'


 export const  BlockComponent =(component) => {
       const border = component.color ? style.cardBorderCorrect : style.cardBorderError;
      return(    
     <Card
      background={component.border}
      className={`${style.cardSpace} ${border}`}>
      <Card.Body>
        <div className={style.spaceDiv}>{component.children}</div>
        <div className={style.spaceDiv}>{component.result}</div>
      </Card.Body>
      <Card.Footer>
        <Button
          onClick={component.mineCall}>Mine</Button>
      </Card.Footer>
    </Card>
    )
} 
  export default BlockComponent

