import { UserLoginParam } from '@/middlewares/auth'
import { Response, Request } from 'express'
import * as users from '@/businesses/user'
import { matchedData, validationResult } from 'express-validator'
import verifyToken from '@/ultils/verifyToken'

export const login = async (req: Request, res: Response) => {
  const validator = validationResult(req)
  if (!validator.isEmpty()) return res.send({ errors: validator.array() })

  const requestData = matchedData(req) as UserLoginParam
  const [data, error] = await users.login(requestData)

  if (error) {
    res.send({ errors: [ error ] })
  }
  res.send({ data })
}

export const register = async (req: any, res: Response) => {
  const validator = validationResult(req)
  if (!validator.isEmpty()) return res.send({ errors: validator.array() })

  const requestData = matchedData(req) as users.UserRegister
  const [data, error] = await users.register(requestData)

  if (error) {
    return res.send({ errors: [ error ] })
  }
  return res.send({ data })
}

export const getUserItSelf = async (req: any, res: Response) => {
  const tokenDecode = verifyToken(req.headers.authorization ?? '') as any

  const [data, error] = await users.getUser(tokenDecode.sub as string)

  if (error) {
    return res.send({ errors: [ error ] })
  }

  return res.send({ data })
}

export const updateUserItSelf = async (req: any, res: Response) => {
  const tokenDecode = verifyToken(req.headers.authorization ?? '') as any
  const validator = validationResult(req)

  if (!validator.isEmpty()) return res.send({ errors: validator.array() })

  const requestData = matchedData(req) as users.UserRegister

  const [data, error] = await users.updateUser(tokenDecode.sub, requestData)

  if (error) {
    return res.send({ errors: [ error ] })
  }

  return res.send({ data })
}

export const getUserByID = async (req: Request, res: Response) => {
  const userID = req.params.userID as string

  const [data, error] = await users.getUser(userID)

  if (error) {
    return res.send({ errors: [ error ] })
  }

  return res.send({ data })
}

export const getUsers = async (_: Request, res: Response) => {
  const [data, error] = await users.getList()
  if (error) {
    return res.send({ errors: [ error ] })
  }

  return res.send({ data })
}

export const updateUserByID = async (req: Request, res: Response) => {
  const userID = req.params.userID as string
  const validator = validationResult(req)
  if (!validator.isEmpty()) return res.send({ errors: validator.array() })

  const requestData = matchedData(req) as users.UserDetail

  const [data, error] = await users.updateUser(userID, requestData)
  if (error) {
    return res.send({ errors: [ error ] })
  }

  return res.send({ data })
}
