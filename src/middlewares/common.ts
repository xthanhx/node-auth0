import { Request, Response, NextFunction } from 'express'

export const commonMiddleware = (_: Request, res: Response, next: NextFunction) => {
  res.setHeader('Content-Type', 'application/json')
  next()
}
