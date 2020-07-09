import { NextApiHandler } from "next"
import { hash } from "bcryptjs"
import { sign } from "jsonwebtoken"

import { PrismaClient, User } from "@prisma/client"

const db = new PrismaClient()

const handler: NextApiHandler<{ token: string; user: User }> = async (
  req,
  res
) => {
  const { email, password, username, fullName } = req.body

  if (email && password && username && fullName) {
    if (email !== "" && password !== "" && username !== "" && fullName !== "") {
      const hashedPassword = await hash(password, 10)
      const newUser = await db.user.create({
        data: { email, password: hashedPassword, username, fullName },
      })
      const token = sign({ userId: newUser.id }, process.env.APP_SECRET || "")
      res.status(200).json({ token, user: newUser })
      return
    }
  }

  res.status(500).end()
}

export default handler
