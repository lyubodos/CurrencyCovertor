import './App.css';

import { useEffect, useState } from 'react';

import CurrencyRow from "./CurrentRow";

const envVals = {
  API_KEY: "2cfeca28147f62a75937feef6731a20f"
}

const BASE_URL = `http://api.exchangeratesapi.io/v1/latest?access_key=${envVals.API_KEY}`;


function App() {

  const [currOptions, setCurrOptions] = useState([]);
  const [fromCurr, setFromCurr] = useState();
  const [toCurr, setToCurr] = useState();
  const [exRate, setExRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountFromCurr, setAmmountFromCurr] = useState(true);

  console.log(exRate);

  let toAmount, fromAmount;

  if (amountFromCurr) {
    fromAmount = amount;
    toAmount = amount * exRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exRate;
  };

  useEffect( () => {

    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const firstCurrency = Object.keys(data.rates)[0];

        setFromCurr(data.base);
        setCurrOptions([data.base, ...Object.keys(data.rates)]);
        setToCurr(firstCurrency);
        setExRate(data.rates[firstCurrency])
      })

  }, []);


  useEffect(() => {

    if(fromCurr !== null && toCurr !== null){
      fetch(`${BASE_URL}?base=${fromCurr}&symbols=${toCurr}`)
      .then(res => res.json())
      .then(data => setExRate(data.rates[toCurr]))

    }
 
  } ,[fromCurr, toCurr]);

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmmountFromCurr(false);
  }


  function handleAmountChange(e) {
    setAmount(e.target.value);
    setAmmountFromCurr(true);
  }
  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow currOptions={currOptions} onChangeCurrency={e => setFromCurr(e.target.value)} selectedCurr={fromCurr}  amount ={fromAmount} onChangeAmount={handleAmountChange}/>
      <div className="equals">=</div>
      <CurrencyRow currOptions={currOptions} onChangeCurrency={e => setToCurr(e.target.value)} selectedCurr={toCurr} amount ={toAmount} onChangeAmount={handleToAmountChange}/>
    </>
  );
}

export default App;
