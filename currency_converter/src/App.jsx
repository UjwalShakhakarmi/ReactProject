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
import countryToCurrency from "country-to-currency";
import React from 'react'
import  { useState, useEffect } from 'react';
import axios from 'axios';
import countryToCurrency from "country-to-currency";


export default function CountryTest() {
    const [usdAmount, setUsdAmount] = useState(1);
  const [cnyAmount, setCnyAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const country = 'CN'; // Set the desired country code
        const response = await axios.get(
          'https://open.er-api.com/v6/latest/USD'
        );
        const currencyCode = countryToCurrency[country];

        const rate = response.data.rates[currencyCode];
        setExchangeRate(rate);
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    };

    fetchExchangeRate();
  }, []);

  useEffect(() => {
    if (exchangeRate !== null) {
      const convertedAmount = usdAmount * exchangeRate;
      setCnyAmount(convertedAmount);
    }
  }, [usdAmount, exchangeRate]);


