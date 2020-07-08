import { NextApiHandler } from "next"
import { hash } from "bcryptjs"

import { PrismaClient, User } from "@prisma/client"

const db = new PrismaClient()

const handler: NextApiHandler<User> = async (req, res) => {
  const { email, password, username, fullName } = req.body

  if (email && password && username && fullName) {
    if (email !== "" && password !== "" && username !== "" && fullName !== "") {
      const hashedPassword = await hash(password, 10)
      const newUser = await db.user.create({
        data: { email, password: hashedPassword, username, fullName },
      })
      res.status(200).json(newUser)
      return
    }
  }

  res.status(500).end()
}

export default handler
