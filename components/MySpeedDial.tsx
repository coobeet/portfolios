import React from "react"
import Router from "next/router"
import { useSelector } from "react-redux"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import SpeedDial from "@material-ui/lab/SpeedDial"
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon"
import SpeedDialAction from "@material-ui/lab/SpeedDialAction"
import HomeIcon from "@material-ui/icons/Home"
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered"
import DialpadIcon from "@material-ui/icons/Dialpad"
import SportsEsportsIcon from "@material-ui/icons/SportsEsports"
import AccountBoxIcon from "@material-ui/icons/AccountBox"
import EditIcon from "@material-ui/icons/Edit"

import { RootState } from "store"
import { signedIn } from "store/userSlice"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "fixed",
      bottom: theme.spacing(2),
      left: theme.spacing(2),
    },
  })
)

const actions = [
  { icon: <HomeIcon />, name: "Home" },
  { icon: <FormatListNumberedIcon />, name: "Todos" },
  { icon: <DialpadIcon />, name: "Calculator" },
  { icon: <SportsEsportsIcon />, name: "Arkanoid" },
  { icon: <AccountBoxIcon />, name: "Resumake" },
]

export default ({ hidden }: { hidden: boolean }) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const { user } = useSelector((state: RootState) => state)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleClick = (index: number) => {
    const pathname =
      actions[index].name === "Home"
        ? "/"
        : `/${actions[index].name.toLowerCase()}`

    setOpen(false)
    Router.push(pathname)
  }

  return (
    <SpeedDial
      ariaLabel="SpeedDial"
      className={classes.root}
      hidden={hidden}
      icon={<SpeedDialIcon openIcon={<EditIcon />} />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
    >
      {signedIn(user)
        ? actions.map((action, index) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => handleClick(index)}
            />
          ))
        : [0, 2, 3].map((index) => (
            <SpeedDialAction
              key={actions[index].name}
              icon={actions[index].icon}
              tooltipTitle={actions[index].name}
              onClick={() => handleClick(index)}
            />
          ))}
    </SpeedDial>
  )
}
