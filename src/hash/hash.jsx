import React ,{useState, useEffect } from "react"
import axios from "axios";
const HashClass = ()=> {
    const [dataHash, setDataHash] = useState("");
    const [hash,setHash]=useState("");
    useEffect(() => {
       axios.post("http://localhost:5000/hash",{data:dataHash})
      .then((res) => setHash(res.data));
  }, [dataHash]);

return(
    <div>
        <h1>Hash</h1>
         <form>
                <label>
                    Data:
                    <input type="text" name="name" id = "input" 
                    onChange={()=>{setDataHash(document.getElementById("input").value)
                     }
                    }
                         />
                </label>
            </form>
             <form>
                <label>
                    Hash: <label>{hash}</label>
                </label>
            </form>
    </div>
 
  )
  
}
export default HashClass


