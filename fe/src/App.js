import Header from "./components/Header/Header";
import classes from "./App.module.css";
import Timer from "./components/Timer/Timer";
import Task from "./components/Task/Task";
import { useSelector } from "react-redux";
import clsx from "clsx";
import TaskManagement from "./components/Task/TaskManagement";
import { AuthProvider } from "./context/AuthProvider";

function App() {
  const mode = useSelector((state) => state.timer.mode);
  return (
    <AuthProvider>
      <div className={clsx(classes.container, classes[mode])}>
        <Header />
        <div className={classes.content}>
          <Timer />
          <TaskManagement></TaskManagement>
        </div>
        <div className={classes.content}>
          <Task />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
