import { Request, RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import { responseConflict, responseUnauthenticated } from '../utils/response'
import dotenv from 'dotenv'
dotenv.config()

export const verifyToken: RequestHandler = (req: any, res, next) => {
  const authHeader = req.header('Authorization')
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    return responseUnauthenticated(res)
  }
  try {
    const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || '')
    req.userId = decoded?.userId
    next()
  } catch (error) {
    console.log(error)
    return responseConflict(res, error)
  }
}