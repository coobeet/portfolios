import React from "react"

import { shield, useShield } from "utils"
import HomePage from "pages/index"

const Calculator = (props: any) => {
  console.log(props)

  const { authorized, fallback } = props
  useShield({ authorized, fallback })
  if (!authorized) return <HomePage />

  return (
    <div>
      <h1>Calculator</h1>
    </div>
  )
}

export default shield()(Calculator)
