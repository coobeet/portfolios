import { NextApiRequest, NextApiResponse } from "next"
import { sign } from "jsonwebtoken"

import { db } from "prisma"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body

  if (email) {
    const user = await db.user.findOne({ where: { email } })
    if (user && password === user.password) {
      const token = sign({ userId: user.id }, process.env.APP_SECRET || "")
      res.status(200).json({ token, user })
      return
    }
  }

  // Default error handling
  res.status(401).json({ message: "Not Authorized!" })
}
