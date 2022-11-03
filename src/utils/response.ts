import { Response } from 'express'
import { resolveErrorMessage } from './helper'

export const responseBadRequest = (res: Response, message: string, errors?: any) => {
  res.statusCode = 400
  return res.json({
    error: true,
    code: 400,
    message,
    type: "ValidationError",
    errors,
  })
}

export const responseUnauthenticated = (res: Response, error: any = null) => {
  res.statusCode = 401
  let message = 'Unauthenticated'
  if (error) {
    message = resolveErrorMessage(error)
  }
  return res.json({
    error: true,
    code: 401,
    message: message,
    type: "AuthenticationException"
  })
}

export const responseNotFound = (res: Response, resource: any) => {
  res.statusCode = 404
  return res.json({
    error: true,
    code: 404,
    message: `${resource}: Resource Not Found`,
  })
}

export const responseError = (res: Response, error: any) => {
  res.statusCode = 500
  return res.json({
    error: true,
    code: 500,
    message: resolveErrorMessage(error),
  })
}

export const responseConflict = (res: Response, data: any) => {
  res.statusCode = 409
  return res.json({
    error: true,
    code: 409,
    data,
  })
}
