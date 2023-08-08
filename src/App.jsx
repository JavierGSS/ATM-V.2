import React from 'react';
import './App.css';

const ATMDeposit = ({ onChange, isDeposit, atmMode, isValid }) => {
  const choice = ['Depósito', 'Retiro'];
  console.log(`ATM isDeposit: ${isDeposit}`);

  let mode;
  atmMode == "Deposit" || atmMode == "Cash Back" ? mode = true : mode = false;

  return (
    <label className="label huge">
      {mode && <h3> {choice[Number(!isDeposit)]}</h3>}
      {mode && <input id="number-input" type="number" width="200" placeholder="Ingrese cantidad..." onChange={onChange}></input>}
      {mode && <input type="submit" width="200" value="Submit" id="submit-input" disabled={!isValid}></input>}
    </label>
  );
};

const App = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Saldo total: $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);

  const handleChange = (event) => {
    if (Number(event.target.value) <= 0) {
      alert(`Por favor introduzca una cantidad positiva.`);
      return setValidTransaction(false);
    }
    if (Number(event.target.value) > totalState && atmMode === "Cash Back") {
      setValidTransaction(false);
      alert(`Por favor introduzca una cantidad inferior o igual a ${totalState}`);
    } else {
      setValidTransaction(true);
    }
    
    console.log(`handleChange ${event.target.value}`);
    setDeposit(Number(event.target.value));
  };

  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    event.target.reset();
    event.preventDefault();
  };

  const handleModeSelect = (event) => {
    setAtmMode(event.target.value);
    event.target.value == "Deposit" ? setIsDeposit(true) : setIsDeposit(false);
    return event.target.value;

  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 style={{color: 'rgb(35, 35, 87)'}}>App Banco Chévere</h1>
      <h2 id="total">{status}</h2>
      <label>Elija el servicio deseado:</label><br/><br/>
        <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
          <option id="no-selection" value=""></option>
          <option id="deposit-selection" value="Deposit">Depósito</option>
          <option id="cashback-selection" value="Cash Back">Retiro</option>
        </select>
      <ATMDeposit
        onChange={handleChange}
        isDeposit={isDeposit}
        atmMode={atmMode}
        isValid={validTransaction}>"
      </ATMDeposit>
    </form>
  );
};

export default App;
