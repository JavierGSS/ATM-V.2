const ATMDeposit = ({ onChange, isDeposit, atmMode, isValid }) => {
    const choice = ['Deposit', 'Cash Back'];
    console.log(`ATM isDeposit: ${isDeposit}`);
  
    let mode;
    atmMode == "Deposit" || atmMode == "Cash Back" ? mode = true : mode = false;
  
    return (
      <label className="label huge">
        {mode && <h3> {choice[Number(!isDeposit)]}</h3>}
        {mode && <input id="number-input" type="number" width="200" onChange={onChange}></input>}
        {mode && <input type="submit" width="200" value="Submit" id="submit-input" disabled={!isValid}></input>}
      </label>
    );
  };
  
  const Account = () => {
    const [deposit, setDeposit] = React.useState(0);
    const [totalState, setTotalState] = React.useState(0);
    const [isDeposit, setIsDeposit] = React.useState(true);
    const [atmMode, setAtmMode] = React.useState("");
    const [validTransaction, setValidTransaction] = React.useState(false);
  
    let status = `Account Balance $ ${totalState} `;
    console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  
    const handleChange = (event) => {
      if (Number(event.target.value) <= 0) {
        return setValidTransaction(false);
      }
      if (Number(event.target.value) > totalState && atmMode === "Cash Back") {
        setValidTransaction(false);
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
    };
  
    const handleModeSelect = (event) => {
      setAtmMode(event.target.value);
      event.target.value == "Deposit" ? setIsDeposit(true) : setIsDeposit(false);
      return event.target.value;
      event.preventDefault();
    }
    
    event.preventDefault();
  
    return (
      <form onSubmit={handleSubmit}>
        <h2 id="total">{status}</h2>
        <label>Select an action below to continue</label>
          <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
            <option id="no-selection" value=""></option>
            <option id="deposit-selection" value="Deposit">Deposit</option>
            <option id="cashback-selection" value="Cash Back">Cash Back</option>
          </select>
        <ATMDeposit
          onChange={handleChange}
          isDeposit={isDeposit}
          atmMode={atmMode}
          isValid={validTransaction}></ATMDeposit>
      </form>
    );
  };
  // ========================================
  ReactDOM.render(<Account />, document.getElementById('root'));