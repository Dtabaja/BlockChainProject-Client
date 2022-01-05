import React ,{useState,useEffect,useCallback} from "react"
import { Button } from "react-bootstrap";
import axios from "axios";
export const DIFFICULTY=4;



const BlockClass = ()=> {
  const [dataHash, setDataHash] = useState("");
  const [block, setBlock] = useState("");
  const [hash, setHash] = useState("");
  const [nonce, setNonce] = useState("");
  const [isMine, setIsMine] = useState(false);

   //init Block
   useEffect(() => {
    axios.get("http://localhost:5000/block/initBlock").then((res) => {
      setBlock(res.data.index);
      setNonce(res.data.nonce);
      setHash(res.data.hash);
      setDataHash(res.data.data);
     
    });
  }, []);  

  // on change data or block or nonce
  useEffect(() => {
    console.log(block)
    console.log(nonce)
    console.log(dataHash)
    axios
      .post("http://localhost:5000/block/getBlock",{
        index:block,
        nonce:nonce,
        data:dataHash,
      })
      .then((res) => {
        setHash(res.data.hash);
      });
  },[isMine]);
 
   const mineBlock = useCallback(() => {
    axios
      .post("http://localhost:5000/block/mine", {
        data: dataHash,
        index: block,
        nonce: nonce,
      })
      .then((res) => {
        setBlock(res.data.index);
        setNonce(res.data.nonce);
        setDataHash(res.data.data);
        setHash(res.data.hash);
      });
  }, [dataHash, block, nonce]);
  const onChangeData = (data) => {
    setIsMine(!isMine);
    setDataHash(data);
  };

  const onChangeNonce = (nonce) => {
    setIsMine(!isMine);
    setNonce(nonce);
  };

  const onChangeBlock = (block) => {
    setIsMine(!isMine);
    setBlock(block);
  };

  return(
    <div style={hash.substring(0, DIFFICULTY) !== Array(DIFFICULTY + 1).join('0')?
     { border: '10px solid red',marginLeft:10,marginTop:10}:
     {border: '10px solid Lightgreen',marginLeft:10,marginTop:10}}>
        <h1>Block</h1>
           <div className="Block">
               <form >
                <label>
                    Block:
                    <input value={block} type="text" name="name" id = "BlockInput" 
                    onChange={()=>{
                         onChangeBlock(document.getElementById("BlockInput").value)
                     }
                    }
                         />
                </label>
            </form>
           <form >
                <label>
                   Nonce:
                    <input value={nonce} type="text" name="name" id = "nonceInput" 
                    onChange={()=>{
                         onChangeNonce(document.getElementById("nonceInput").value)
                     }
                    }
                         />
                </label>
            </form>
            <form >
                <label>
                    Data:
                    <input value={dataHash} type="text" name="name" id = "dataInput" 
                    onChange={()=>{
                          onChangeData(document.getElementById("dataInput").value)
                    }
                    }
                         />
                </label>
            </form>
            
           <label>
                    Hash: <label>{hash}</label>
                </label>
            </div>
            <div>
                <Button type="submit" onClick={()=>{mineBlock()}}>Mine</Button>
            </div>
    </div>
  )
}
export default BlockClass
