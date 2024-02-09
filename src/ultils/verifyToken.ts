import jwt from 'jsonwebtoken'
import fs from 'fs'
let cert: Buffer
const verifyToken = (token: string) => {
  try {
    if (!cert) cert = fs.readFileSync(`${__dirname}/dev-1iimmxvnk62w2igw.pem`)

    return jwt.verify(token.replace('Bearer ', ''), cert)
  } catch (e) {
    return null
  }
}

export default verifyToken;