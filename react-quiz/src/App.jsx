import { useEffect, useReducer } from "react";
import Header from "./Header";
import Index from "./index";
import Loader from "./Loader";
import Error from "./Error";
import Questions from "./Questions";
import { StartScreen } from "./StartScreen";
import { NextButton } from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import { Footer } from "./components/Footer";
import { Timer } from "./components/Timer";
const SECS_PER_QUESTIONS = 30;
const initalState = {
  questions: [],
  //"Loading","error",'ready','active','finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  SecondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        SecondsRemaining: state.questions.length * SECS_PER_QUESTIONS,
      };
    case "newAnswer":
      //to know the current question
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initalState,
        questions: state.questions,
        highScore: 0,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        SecondsRemaining: state.SecondsRemaining - 1,
        status: state.SecondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, highScore, SecondsRemaining },
    dispatch,
  ] = useReducer(reducer, initalState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Index className="main">
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} SecondsRemaining={SecondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Index>
    </div>
  );
}
