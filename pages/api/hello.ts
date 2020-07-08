import { NextApiHandler } from "next"

const helloHandler: NextApiHandler = async (req, res) => {
  res.status(200).json("Hello, World")
}

export default helloHandler
