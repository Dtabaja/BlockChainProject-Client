import {Navbar,Nav} from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HashClass from './hash/hash';
import BlockClass from './Block/BlockClass';
import BlockChainClass from  './BlockChain/BlockChainClass';
import Distributed from './Distributed/DistributedClass';
import Tokens from './Tokens/tokens';
import CoinBase from './CoinBase/CoinBase';
import Keys from './Keys/Keys';
import Signatures from './Signatures/SignatureClass';
import Transactions from './Transactions/transactionClass';


const NavBarComp =() =>{
  return(
    <Router>
    <div >
 <Navbar bg="dark" variant= {"dark"} expand="lg">
  <Navbar.Brand href="#home">BlockChain</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link as = {Link} to= {"/hash"}>Hash</Nav.Link>
      <Nav.Link as = {Link} to= {"/block"}>Block</Nav.Link>
      <Nav.Link as = {Link} to= {"/blockChain"}>BlockChain</Nav.Link>
      <Nav.Link as = {Link} to= {"/distributed"}>Distributed</Nav.Link>
      <Nav.Link as = {Link} to= {"/tokens"}>Tokens</Nav.Link>
      <Nav.Link as = {Link} to= {"/coinBase"}>CoinBase</Nav.Link>
      <Nav.Link as = {Link} to= {"/keys"}>Keys</Nav.Link>
      <Nav.Link as = {Link} to= {"/signatures"}>Signatures</Nav.Link>
      <Nav.Link as = {Link} to= {"/transactions"}>Transactions</Nav.Link>
       </Nav>
      </Navbar.Collapse>
</Navbar>
    </div>
    <div>
       <Switch>
          <Route path="/hash">
            <HashClass/>
          </Route>
          <Route path="/block">
            <BlockClass/>
          </Route>
           <Route path="/blockChain">
            <BlockChainClass/>
          </Route>
          <Route path="/distributed">
            <Distributed/>
            </Route>
            <Route path="/tokens">
            <Tokens/>
            </Route>
           <Route path="/coinBase">
            <CoinBase/>
            </Route>  
            <Route path="/keys">
            <Keys/>
            </Route> 
            <Route path="/signatures">
            <Signatures/>
            </Route> 
            <Route path="/transactions">
            <Transactions/>
            </Route> 
             <Route path="/">
            <HashClass/>
          </Route>
        </Switch>
    </div>
    </Router>

  )

}
export default NavBarComp;