import { NextApiRequest, NextApiResponse } from "next"
import { sign } from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"

const db = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body as any

  if (email) {
    const user = await db.user.findOne({
      where: { email },
    })
    if (password === user.password) {
      const token = sign({ userId: user.id }, process.env.APP_SECRET)
      const { password: _, ...userWithoutPassword } = user
      res.status(200).json({ token, user: userWithoutPassword })
    }
  }

  res.status(400).json({ errorMsg: "Incorrect credentials." })
}
