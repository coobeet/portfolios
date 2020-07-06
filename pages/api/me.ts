import { NextApiRequest, NextApiResponse } from "next"
import { verify } from "jsonwebtoken"

import { db } from "prisma"
import { env } from "utils"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.cookies

  if (token) {
    const { userId } = verify(token, env.APP_SECRET) as any
    const user = await db.user.findOne({ where: { id: Number(userId) } })
    if (user) {
      res.status(200).json({ user })
      return
    }
  }

  // Default error handling
  res.status(401).json({ message: "Not Authorized!" })
}
