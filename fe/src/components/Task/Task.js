import classes from "./Task.module.css";
import clsx from "clsx";

const AddTaskButton = ({ children, active, onClick, color }) => (
  <button onClick={onClick} className={clsx(classes.addTaskButton, color)}>
    {children}
  </button>
);

const Task = () => {
  return <div></div>;
};

export default Task;
