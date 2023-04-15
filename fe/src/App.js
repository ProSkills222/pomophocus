import Header from "./components/Header/Header";
import classes from "./App.module.css";
import Timer from "./components/Timer/Timer";
import Task from "./components/Task/Task";
import { useSelector } from "react-redux";
import clsx from "clsx";

function App() {
  const mode = useSelector((state) => state.timer.mode);

  return (
    <div className={clsx(classes.container, classes[mode])}>
      <Header />
      <div className={classes.content}>
        <Timer />
      </div>
      <div className={classes.content}>
        <Task />
      </div>
    </div>
  );
}

export default App;
