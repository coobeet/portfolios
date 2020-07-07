import { shield, useShield } from "utils"
import HomePage from "pages/index"

export default shield()((props: any) => {
  const { authorized, fallback } = props

  useShield({ authorized, fallback })
  if (!authorized) return <HomePage />

  return (
    <div>
      <h1>Resumake</h1>
    </div>
  )
})
