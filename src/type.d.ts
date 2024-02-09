import 'express'

declare module 'express' {
  interface Locals {
    user?: any
    [key: string]: any
  }
  export interface Request {
    locals?: any
  }
}
