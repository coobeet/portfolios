import { NextApiRequest } from "next"
import { verify } from "jsonwebtoken"

import { PrismaClient, User } from "prisma"
import { env } from "utils"

export type Method = "GET" | "POST" | "DELETE" | "PUT"

export const isMethod = (arg: string): arg is Method => {
  return ["GET", "POST", "DELETE", "PUT"].includes(arg)
}

export type MethodToHandleMap<T> = {
  GET?: (req: NextApiRequest, arg?: any) => Promise<T | null>
  POST?: (req: NextApiRequest, arg?: any) => Promise<T>
  DELETE?: (req: NextApiRequest, arg?: any) => Promise<T | null>
  PUT?: (req: NextApiRequest, arg?: any) => Promise<T | null>
}

export const checkAuthentication = async (
  req: NextApiRequest,
  db: PrismaClient
): Promise<[true, User] | [false, null]> => {
  const { token } = req.cookies

  if (token) {
    const { userId } = verify(token, env.APP_SECRET) as any
    if (userId) {
      const user = await db.user.findOne({ where: { id: userId } })
      if (user && userId === user.id) {
        return [true, user]
      }
    }
  }

  return [false, null]
}
