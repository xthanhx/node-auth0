import { getUser } from '@/businesses/user'
import verifyToken from '@/ultils/verifyToken'
import { NextFunction, Request, Response } from 'express'
import { checkSchema } from 'express-validator'

export interface UserLoginParam {
  email: string
  password: string
}

const loginSchema = {
  email: {
    isEmail: true,
    errorMessage: 'Invalid username'
  },
  password: {
    isLength: {
      options: {
        min: 6
      }
    }
  }
}

const userNameSchema = {
  first_name: {
    isString: true,
  },
  last_name: {
    isString: true,
  }
}

const userDetailSchema = {
  roles: {
    isArray: true,
    isIn: {
      options: [['MANAGER', 'ADMIN']],
      errorMessage: 'Invalid roles'
    }
  },
  scopes: {
    isArray: true,
  },
  ...userNameSchema,
}

export const userNameValidator = () => {
  return checkSchema(userNameSchema)
}

export const loginValidator = () => {
  return checkSchema(loginSchema)
}

export const registerValidator = () => {
  return checkSchema({
    ...loginSchema,
    ...userDetailSchema,
  })
}

export const updateUserDetail = () => {
  return checkSchema(userDetailSchema)
}

export const isAdmin = async (req: any, res: Response, next: NextFunction) => {
  try {
    const tokenDecode = verifyToken(req.headers.authorization ?? '') as any
    const [user] = await getUser(tokenDecode.sub as string) as any
    if (user.roles.includes('ADMIN')) next()
  } catch {
    res.send({
      errors: [
        {
          error: 'unauthenticated',
        }
      ]
    })
  }
}

export const isManager = async (req: any, res: Response, next: NextFunction) => {
  try {
    const tokenDecode = verifyToken(req.headers.authorization ?? '') as any
    const [user] = await getUser(tokenDecode.sub as string) as any
    if (user.roles.includes('MANAGER')) next()
  } catch {
    res.send({
      errors: [
        {
          error: 'unauthenticated',
        }
      ]
    })
  }
}

export const isManagerOrAdmin = async (req: any, res: Response, next: NextFunction) => {
  try {
    const tokenDecode = verifyToken(req.headers.authorization ?? '') as any
    const [user] = await getUser(tokenDecode.sub as string) as any
    if (user.roles.some((role: string) => ['MANAGER', 'ADMIN'].includes(role))) next()
  } catch (e){
    console.log(e);

    res.send({
      errors: [
        {
          error: 'unauthenticated',
        }
      ]
    })
  }
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!verifyToken(req.headers.authorization ?? '')) {
    return res.send({
      errors: [
        {
          error: 'not login',
        }
      ]
    })
  }
  next()
}
