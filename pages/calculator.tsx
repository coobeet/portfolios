import React from "react"
import { NextPage } from "next"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { Grid, Button, Typography } from "@material-ui/core"

const KEYPAD: string[][] = [
  ["(", "CE", ")", "C"],
  ["1", "2", "3", "+"],
  ["4", "5", "6", "-"],
  ["7", "8", "9", "×"],
  [".", "0", "=", "÷"],
]

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  pad: {
    width: 480,
    height: 480,
  },
  result: {
    display: "flex",
    alignItems: "center",
    height: 80,
    paddingLeft: 16,
    background: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  key: {
    width: 120,
    height: 80,
    borderRadius: 0,
  },
  text: {
    fontSize: 32,
  },

  [theme.breakpoints.down("xs")]: {
    pad: {
      width: 360,
      height: 360,
    },
    result: {
      height: 60,
      paddingLeft: 8,
    },
    key: {
      width: 90,
      height: 60,
    },
    text: {
      fontSize: 32,
    },
  },
}))

const CalculatorPage: NextPage = () => {
  const classes = useStyles()
  const [result, setResult] = React.useState<string>("")

  const handleClickFunctions: any = {
    "=": () => {
      try {
        setResult(String(eval(result)))
      } catch (error) {
        setResult("error")
      }
    },
    C: () => {
      setResult("")
    },
    CE: () => {
      setResult(result.slice(0, result.length - 1))
    },
    "×": () => {
      setResult(result.concat("*"))
    },
    "÷": () => {
      setResult(result.concat("/"))
    },
    default: (name: string) => {
      setResult(result.concat(name))
    },
  }

  const handleClick = (name: string) => {
    handleClickFunctions[name]
      ? handleClickFunctions[name]()
      : handleClickFunctions.default(name)
  }

  return (
    <div className={classes.root}>
      <Grid container className={classes.pad}>
        <Grid item xs={12} className={classes.result}>
          <Typography className={classes.text}>Result: {result}</Typography>
        </Grid>
        {KEYPAD.map((row, index) => (
          <Grid key={index} item xs={12} className={classes.key}>
            {row.map((value) => (
              <Button
                key={value}
                variant="contained"
                color="primary"
                className={classes.key}
                onClick={() => handleClick(value)}
              >
                <Typography className={classes.text}>{value}</Typography>
              </Button>
            ))}
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default CalculatorPage
