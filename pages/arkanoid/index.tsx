import React from "react"
import { NextPage } from "next"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { Grid, Paper, Typography, Button } from "@material-ui/core"
import classes from "*.module.css"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
  },
  paper: {
    width: 640,
    height: 480,
  },
  text: {
    margin: "80px 0",
    fontSize: 80,
    textAlign: "center",
  },
  button: {
    width: 240,
    height: 64,
    fontSize: 24,
    margin: 16,
  },
}))

const ArkanoidPage: NextPage = () => {
  const classes = useStyles()

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Paper className={classes.paper}>
        <Typography className={classes.text}>Arkanoid</Typography>
        <Grid container justify="center" alignItems="center">
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Score Board
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            Start Game
          </Button>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default ArkanoidPage
