import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';
import {useState, useEffect} from 'react';

function App() {
  // web3.eth.getAccounts().then(console.log);
  const[manager, setManager] = useState("");
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState("");
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  useEffect( ()=>{
    (async ()=>{

      const manager = await lottery.methods.manager().call();
      // .then((man) => setManager(man));

      const player = await lottery.methods.getPlayers().call();
      const balance = await web3.eth.getBalance(lottery.options.address);

      setManager(manager);
      setPlayers(player);
      setBalance(balance);                    
      // .then((play) => )
      
    })();
    return;
    
  },[]);

const onSubmit = async (e)=>{
  e.preventDefault();
  const accounts = await web3.eth.getAccounts();

  setMessage("waiting...");
  await lottery.methods.enter().send({
    from: accounts[0],
    value: web3.utils.toWei(value, 'ether')
  });

  setMessage("successfully entered1");

}

const pickWinner = async()=>{
  const accounts = await web3.eth.getAccounts();
  setMessage("waiting...");
  await lottery.methods.pickWinner().send({
    from: accounts[0]
  });

  setMessage("successfull...!")

}

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>This Contract is managed by {manager}
      
      There are currently {players.length} people enters competing to win {web3.utils.fromWei(balance, 'ether')} ether! </p>
      <hr/>
      <form onSubmit={onSubmit}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amaount of ether to enter</label>
          <input value={value} onChange={ e => setValue(e.target.value)}/>
        </div>
        <button>Enter</button>
      </form>
      <hr/>
      <h4>ready to pick a winner?</h4>
      <button onClick={pickWinner}>Pick a winner</button>
      <hr/>
      <h2>{message}</h2>
    </div>
  );
}

export default App;
