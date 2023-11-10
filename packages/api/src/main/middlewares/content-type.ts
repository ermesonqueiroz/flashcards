import { type NextFunction, type Request, type Response } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {
  res.type('json')
  next()
}
