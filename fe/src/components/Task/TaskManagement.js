import { useState } from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import AddTaskForm from "./AddTaskForm";
import TaskUnit from "./TaskUnit";
import axios from "../../api/axios";
import { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

function TaskManagement() {
  const [visible, setVisible] = useState(false);
  const [tasks, setTasks] = useState([]);
  const { auth, setAuth } = useContext(AuthContext);

  useEffect(async () => {
    await axios
      .get("/getTask")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((e) => {
        console.log({ err: e.message });
        setTasks([]);
      });
  }, [auth]);

  const toggleDropDown = () => {
    setVisible((visible) => !visible);
  };

  const handleSubmit = async (newTask) => {
    await axios.post("/createTask", newTask).then(async (res) => {
      await axios
        .get("/getTask")
        .then((res) => {
          setTasks(res.data);
        })
        .catch((e) => {
          console.log({ err: e.message });
        });
    });
  };

  const renderForm = () => {
    if (visible) {
      return (
        <AddTaskForm
          render={visible}
          onCancel={toggleDropDown}
          onSubmit={handleSubmit}
        ></AddTaskForm>
      );
    }
  };

  return (
    <Container sx={styles.container}>
      <Container sx={[styles.header]}>
        <Typography>Tasks</Typography>
        <Button>
          <MoreVertRoundedIcon sx={styles.icon} />
        </Button>
      </Container>
      {tasks &&
        tasks.map((task) => (
          <TaskUnit
            key={task._id}
            description={task.description}
            curr={task.currPomos}
            est={task.estPomos}
          ></TaskUnit>
        ))}
      {renderForm()}

      <Button sx={styles.addBtn} onClick={toggleDropDown}>
        <Typography sx={styles.text}>Add new Task</Typography>
      </Button>
    </Container>
  );
}

export default TaskManagement;

const styles = {
  container: {
    marginTop: 1,
    // bgcolor: "blue",
    width: "80%",
    borderRadius: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "&.MuiContainer-root": {
      padding: 0,
    },
  },
  header: {
    borderBottom: 2,
    borderBootomColor: "white",
    width: "100%",
    bgColor: "aqua",

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    "&.MuiContainer-root": {
      padding: 0,
    },
  },
  text: {
    color: "white",
    fontSize: 14,
  },
  icon: {
    color: "white",
  },
  addBtn: {
    marginTop: 2,
    borderStyle: "dotted",
    border: 1,
    borderColor: "white",
    width: "100%",
    height: "3.4375rem",
    bgColor: "rgba(0, 0, 0, 0.2)",
  },
};
