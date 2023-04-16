import { useState } from 'react'
import { Container, Box, Typography, Button } from "@mui/material"
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import AddTaskForm from './AddTaskForm';
import TaskUnit from './TaskUnit';
import axios from '../../api/axios';

function TaskManagement() {
    const [visible, setVisible] = useState(false);
    const [tasks, setTasks] = useState([])

    const toggleDropDown = () => {
        setVisible(!visible)
        console.log(visible)
    }

    const handleSubmit = (newTask) => {
        axios.post("/createTask", newTask)
    }

    


    const renderForm = () => {
        if (visible) {
            return (
                <AddTaskForm render={visible} onCancel={toggleDropDown} onSubmit={handleSubmit}></AddTaskForm>
            )
        }
    }

    return (
        <Container sx={styles.container}>
            <Container sx={[styles.header]}>
                <Typography >Tasks</Typography>
                <Button>
                    <MoreVertRoundedIcon sx={styles.icon} />
                </Button>
            </Container>
            {true &&  <TaskUnit
                description= "dsa course"
                curr={0}
                est={1}
            ></TaskUnit>}
            {renderForm()}

            <Button
                sx={styles.addBtn}
                onClick={toggleDropDown}
            >
                <Typography sx={styles.text}>Add new Task</Typography>
            </Button>
        </Container>
    )
}

export default TaskManagement

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
            padding: 0
          }
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
            padding: 0
          }
    },
    text: {
        color: "white",
        fontSize: 14
    },
    icon: {
        color: "white"
    },
    addBtn: {
        marginTop: 2,
        borderStyle: "dotted",
        border: 1,
        borderColor: "white",
        width: "100%",
        bgColor: "#A74242"
    }
}