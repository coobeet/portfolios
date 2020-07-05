import { NextApiRequest, NextApiResponse } from "next"
import { sign } from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"

type Data = {
  errors?: {
    [key: string]: string
  }
  data?: {
    [key: string]: any
  }
}

const db = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "POST") {
    res.status(400).json({ errors: { method: "Only POST method allowed." } })
  }

  const { email, password } = req.body as any
  if (!email) {
    res.status(400).json({ errors: { email: "Please provide email." } })
  }

  const user = await db.user.findOne({
    where: { email },
  })
  if (!user) {
    res.status(500).json({ errors: { email: "Email does not exist." } })
  }
  if (password !== user?.password) {
    res.status(500).json({ errors: { password: "Incorrect password." } })
  }

  const { password: _, ...userWithoutPassword } = user
  res.status(200).json({
    data: {
      token: sign({ userId: user.id }, process.env.APP_SECRET),
      user: userWithoutPassword,
    },
  })
}
