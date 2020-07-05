import { NextApiRequest, NextApiResponse } from "next"
import { verify } from "jsonwebtoken"

import { PrismaClient } from "@prisma/client"
import { env } from "utils"

const db = new PrismaClient()

function redirectToSignin(res: NextApiResponse) {
  res.writeHead(302, {
    Location: "/signin",
  })
  res.end()
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.cookies

  if (!token) {
    redirectToSignin(res)
  } else {
    try {
      const { userId } = verify(token, env.APP_SECRET) as any
      const user = await db.user.findOne({ where: { id: Number(userId) } })
      if (!user) {
        redirectToSignin(res)
      } else {
        const { password, ...userWithoutPassword } = user
        res.status(200).json({ user: userWithoutPassword })
      }
    } catch (error) {
      redirectToSignin(res)
    }
  }
}
