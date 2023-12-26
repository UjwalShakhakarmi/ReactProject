import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import StarRating from "./starRating.jsx";

function Test() {
  const [movieRating, setMovieRating] = useState(0);
  return (
    <div>
      <StarRating color="blue" maxRating={5} onSetRating={setMovieRating} />
      <p>The movie rating was {movieRating}</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    {/* <Test />
    <StarRating
      maxRating={5}
      messages={["Terrible", "Bad", "OKay", "Good", "Amazing"]}
      defaultRating={3}
    />
    <StarRating maxRating={10} className="test" />
    <StarRating /> */}
  </React.StrictMode>
);
