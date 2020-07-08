import { NextApiHandler } from "next"

import { db } from "prisma"

const testdbHandler: NextApiHandler = async (req, res) => {
  const todos = await db.todo.findMany({ where: { userId: 1 } })
  res.status(200).json(todos)
}

export default testdbHandler
