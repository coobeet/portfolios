import axios, { AxiosError } from "axios"
import Cookies from "js-cookie"

export default () => {
  async function handleClick() {
    try {
      const res = await axios.post("/api/signin", {
        email: "frank@fake.com",
        password: "frank",
      })
      console.log(res)
      const { token } = res.data
      Cookies.set("token", token)
    } catch (e) {
      const res = (e as AxiosError).response
      console.log(res)
    }
  }

  return (
    <div>
      <button onClick={handleClick}>signin</button>
    </div>
  )
}
