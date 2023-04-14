import Header from "./components/Header/Header";
import classes from "./App.module.css";
import Timer from "./components/Timer/Timer";
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
      {/* <div className={classes.content}>
        <Timer />
      </div> */}
    </div>
  );
}

export default App;
