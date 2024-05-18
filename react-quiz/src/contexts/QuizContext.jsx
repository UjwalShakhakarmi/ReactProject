import { createContext, useContext, useEffect, useReducer } from "react";
const SECS_PER_QUESTIONS = 30;

const QuizContext = createContext();
const initalState = {
  //"Loading","error",'ready','active','finished
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  SecondsRemaining: null,
};
//handle all the business logic and state transactions
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
function QuizProvider({ children }) {
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
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        SecondsRemaining,
        numQuestions,
        maxPossiblePoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("Quiz context was used outside the QuizProvider");
  return context;
}
export { QuizProvider, useQuiz };
