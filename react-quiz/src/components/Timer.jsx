import React, { useEffect } from "react";
import { useQuiz } from "../contexts/QuizContext";

export const Timer = () => {
  const { dispatch, SecondsRemaining } = useQuiz();
  const mins = Math.floor(SecondsRemaining / 60);
  const seconds = SecondsRemaining % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
};
