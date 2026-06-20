import "./App.css";
import Carousel from "./components/Carousel";
import SubmitMessage from "./components/SubmitMessage";
import SelectAll from "./components/SelectAll";
import DebounceTest from "./components/DebounceTest";
import InfinityScroll from "./components/InfinityScroll";
import InfinityScroll2 from "./components/InfinityScroll2";
import Tabs from "./components/Tabs";
import LoginForm from "./components/LoginForm";
import Dropdown from "./components/Dropdown";
import Dimension from "./components/Dimension";
import OutSide from "./components/OutSide";

// 문제 풀이용 컴포넌트
import { Problem as LazyStateInitProblem, Solution as LazyStateInitSolution } from "./problems/lazy-state-init";

function App() {
  return (
    <div className="App">
      {/* 기존 컴포넌트들 */}
      {/* <Carousel /> */}
      {/* <SelectAll /> */}

      {/* 문제 3-1: Lazy State Initialization */}
      {/* Problem을 Solution으로 바꿔서 정답 확인 가능 */}
      <LazyStateInitProblem />
    </div>
  );
}

export default App;
