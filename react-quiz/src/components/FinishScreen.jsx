import React from "react";
import { useQuiz } from "../contexts/QuizContext";

export default function FinishScreen() {
  const { points, maxPossiblePoints, highScore, dispatch } = useQuiz();
  let emoji;
  const percentage = (points / maxPossiblePoints) * 100;
  if (percentage === 100) emoji = "🤑";
  if (percentage >= 80 && percentage < 100) emoji = "💰";

  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPossiblePoints} (
        {Math.round(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}
