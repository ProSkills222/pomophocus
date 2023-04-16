import { Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { Zoom } from "@mui/material";

function TaskUnit({ description, curr, est }) {
  const [isFocus, setIsFocus] = useState(false);
  const handleOnFocus = () => {
    setIsFocus(!isFocus);
  };
  return (
    <Zoom in={true}>
      <Container
        onClick={handleOnFocus}
        sx={[styles.container, isFocus && styles.focusTask]}
      >
        <Typography sx={[styles.itemText]}>{description}</Typography>
        <Typography sx={[styles.itemText]}>
          {curr}/{est}
        </Typography>
      </Container>
    </Zoom>
  );
}

export default TaskUnit;

const styles = {
  container: {
    mt: 1,
    padding: "10px 0px",
    backgroundColor: "white",
    opacity: "0.6",
    borderRadius: 1.5,

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderLeft: 5,
    borderLeftColor: "black",
    cursor: "pointer",
  },

  itemText: {
    color: "black",
    fontFamily: "Noto Sans Display, sans-serif",
    fontWeight: 600,
  },
  focusTask: {
    backgroundColor: "white",
    opacity: "1",
  },
};
