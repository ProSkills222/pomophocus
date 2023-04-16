import { Container, Typography } from '@mui/material'
import React from 'react'
import { Zoom } from '@mui/material'

function TaskUnit({description, curr, est }) {
    return (
        <Zoom in= {true}>
            <Container sx={styles.container}>
                <Typography sx = {[styles.itemText]}>{description}</Typography>
                <Typography sx = {[styles.itemText]}>{curr}/{est}</Typography>
            </Container>
        </Zoom>
    )
}

export default TaskUnit

const styles = {
    container:{
        mt: 1,
        padding: "10px 0px",
        backgroundColor: "white",
        borderRadius: 1.5,

        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderLeft: 5,
        borderLeftColor: "black"
    },

    itemText:{
        color: "black",
        fontFamily: "Noto Sans Display, sans-serif",
        fontWeight: 600
    }
}