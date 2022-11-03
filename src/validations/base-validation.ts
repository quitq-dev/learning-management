import { NextFunction, Request, Response } from 'express'

const parseErrorMessage = (message: string) => message.replace('body.', '')

const setByPath = (path: string, value: string, baseObj: any) => {
  var schema = baseObj
  const pathList = path.split('.')
  const len = pathList.length
  let item = {}
  for (let i = 0;i < len - 1;i++) {
    const element = pathList[i]
    if (!schema[element]) {
      schema[element] = {}
      schema = schema[element]
    }
  }
  schema[pathList[len - 1]] = value
}

const parseErrors = (errors: any) => {
  let result = {}
  errors.map((error: any) => {
    // remove body prefix
    const parsedError = error.replace('body.', '')
    const [fields, ...messages] = parsedError.split(' ')
    const field = fields.split('.').slice(-1)[0]
    const message = `${field} ${messages.join(' ')}`
    const [fieldString] = parsedError.split(' ')
    setByPath(fieldString, message, result)
  })

  return result
}

const validate = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    }, {
      abortEarly: false,
    })
    return next()
  } catch (error: any) {
    const errors = parseErrors(error.errors)
    return res.status(400).json({
      type: error.name,
      error: true,
      message: parseErrorMessage(error.message),
      errors,
    })
  }
}

export default validate
