import { NextApiHandler } from "next"

import { db, Todo, TodoCreateWithoutUserInput, TodoUpdateArgs } from "prisma"
import { checkAuthentication, MethodToHandleMap, isMethod } from "utils"

const methodToHandleMap: MethodToHandleMap<Todo[] | Todo> = {
  GET: async (_req, userId: number) => {
    return await db.todo.findMany({
      where: { userId },
      orderBy: { id: "asc" },
    })
  },
  POST: async (req, userId: number) => {
    const args: TodoCreateWithoutUserInput = req.body
    return await db.todo.create({
      data: {
        ...args,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })
  },
  DELETE: async (req, _userId) => {
    const id: number = Number(req.query.id)
    return await db.todo.delete({ where: { id } })
  },
  PUT: async (req, _userId) => {
    const args: TodoUpdateArgs = req.body
    return await db.todo.update(args)
  },
}

const todosHandler: NextApiHandler<Todo[]> = async (req, res) => {
  const [isAuthenticated, user] = await checkAuthentication(req, db)

  if (user && req.method && isMethod(req.method)) {
    const todo = await (methodToHandleMap[req.method] as any)(req, user.id)
    if (todo) {
      res.status(200).json(todo)
      return
    }
  }

  res.status(400).end()
}

export default todosHandler
