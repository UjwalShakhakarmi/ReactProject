import { useState } from "react";

export default function App() {
  return <TipCalculator />;
}
function TipCalculator() {
  const [bill, setBill] = useState(0);
  const [tip1, setTip1] = useState(0);
  const [tip2, setTip2] = useState(0);
  //derived state
  const Total_tip = ((tip1 + tip2) / 2 / 100) * bill;
  function handleReset() {
    setBill("");
    setTip1(0);
    setTip2(0);
  }

  return (
    <div>
      <BillInput onsetBill={setBill} bill={bill} />
      <SelectPercentage tip1={tip1} onsetTip={setTip1}>
        How did you like the service?
      </SelectPercentage>
      <SelectPercentage tip2={tip2} onsetTip={setTip2}>
        How did your friend like the service?
      </SelectPercentage>
      <Output bill={bill} tip={Total_tip} />
      <Reset handleReset={handleReset} />
    </div>
  );
}
function BillInput({ onsetBill, bill }) {
  return (
    <div>
      <p>How much was the bill?</p>
      <input
        type="text"
        value={bill}
        onChange={(e) => onsetBill(Number(e.target.value))}
      />
    </div>
  );
}
function SelectPercentage({ onsetTip, tip, children }) {
  return (
    <div>
      <p>{children}</p>
      <select value={tip} onChange={(e) => onsetTip(Number(e.target.value))}>
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was Okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">It was Amazing! (20%)</option>
      </select>
    </div>
  );
}
function Output({ bill, tip }) {
  return (
    <h2>
      You Pay {bill} (${bill} + ${tip} tip)
    </h2>
  );
}
function Reset({ handleReset }) {
  return <button onClick={handleReset}>Reset</button>;
}
