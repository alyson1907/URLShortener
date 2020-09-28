export {}
import { Request, Response } from 'express'

const handler = async (error: any, req: Request, res: Response, next: any) => {
  const status = error.status || 500
  res.status(status).json({ error: 'An error has occurred' })
}

export default handler
