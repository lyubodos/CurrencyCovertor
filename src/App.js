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


  console.log(currOptions);

  useEffect( () => {
    
    fetch(BASE_URL)
    .then(res => res.json())
    .then(data => {

    setFromCurr(data.base)
    setCurrOptions([data.base, ...Object.keys(data.rates)])  
    
  })

  }, [])


  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow currOptions={currOptions} />
      <div className="equals">=</div>
      <CurrencyRow  currOptions={currOptions} />
    </>
  );
}

export default App;
