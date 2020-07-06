import React from "react"
import Router from "next/router"
import { Input, Button } from "@material-ui/core"

export default () => {
  const [value, setValue] = React.useState("")

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setValue(event.target.value)
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    if (event.key === "Enter") {
      Router.push(value)
    }
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    Router.push(value)
  }

  return (
    <div>
      <Button
        variant="contained"
        style={{ marginRight: "8px" }}
        onClick={handleClick}
      >
        GoTo
      </Button>
      <Input
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
      ></Input>
    </div>
  )
}
