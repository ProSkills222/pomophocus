import { Button, Container, TextField, Typography, Zoom } from '@mui/material'
import { useState } from 'react'
import React from 'react'


function AddTaskForm({ render, onCancel, onSubmit }) {
  const [inputName, setInputName] = useState("")
  const [inputEst, setInputEst] = useState(0)

  const handleOnSubmit = () => {
    const newTask = {
      description: inputName,
      estPomos: inputEst,
      currPomos: 0
    }    
    onSubmit(newTask)
    onCancel()
  }

  const handleNameChange = (event) => {
    setInputName(event.target.value);
  }

  const handleEstChange = (event) => {
    setInputEst(event.target.value);
  }

  return (
    <Zoom in={render}>
      <Container
        sx={styles.form}
      >
        <Container
          sx={styles.inputForm}
        >
          <TextField
            value={inputName}
            label="Name task"
            variant="standard"
            onChange={handleNameChange}
            sx={styles.inputName}
            required={true}></TextField>
          <Typography sx={{ color: "black", mt: 1 }} fontWeight="bold">Est Pomodoro</Typography>

          <Container>
            <TextField
              value={inputEst}
              type='number'
              onChange={handleEstChange}
              sx={styles.inputNumber} />
          </Container>
        </Container>

        <Container
          sx={styles.submitSection}
        >
          <Button sx={styles.btntext} onClick={onCancel}>Cancel</Button>
          <Button sx={styles.btntext} onClick={handleOnSubmit}>Save</Button>
        </Container>
      </Container>
    </Zoom>
  )
}

export default AddTaskForm

const styles = {
  form: {
    backgroundColor: "white",
    marginTop: 1,
    borderRadius: 1.5,
    boxSizing: "border-box",
    "&.MuiContainer-root": {
      padding: 0
    }
  },
  inputForm: {
    marginTop: 1
  },
  submitSection: {
    backgroundColor: "rgb(239,239,239)",
    width: "100%",
    borderRadius: 1.5,
    mt: 2,

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },

  inputName: {
    '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderBottomColor: 'black',
      },
    },
    width: "100%"
  },
  inputNumber: {
    padding: 0,
    mt: 1,
    width: "100%"
  },

  normalText: {
    color: "black",
    fontWeight: "bold"
  },
  btntext: {
    color: "#99908B"
  }



}

