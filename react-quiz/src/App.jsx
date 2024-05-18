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
import { useQuiz } from "./contexts/QuizContext";

export default function App() {
  const { status } = useQuiz();
  return (
    <div className="app">
      <Header />
      <Index className="main">
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Questions />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Index>
    </div>
  );
}
