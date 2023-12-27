// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(1);
  const [isloading, setIsLoading] = useState(false);
  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("USD");
  function handlefrom(e) {
    setFrom(e);
    console.log(from);
  }
  function handleto(e) {
    setTo(e);
    console.log(to);
  }

  useEffect(
    function () {
      async function convert() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
        );
        const data = await res.json();
        setResult(data.rates[to]);
        setIsLoading(false);
      }
      if (from === to) return setResult(amount);
      convert();
    },
    [from, to, amount]
  );
  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isloading}
      />

      <select
        value={from}
        onChange={(e) => handlefrom(e.target.value)}
        disabled={isloading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={to}
        onChange={(e) => handleto(e.target.value)}
        disabled={isloading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {result} {to}
      </p>
    </div>
  );
}
