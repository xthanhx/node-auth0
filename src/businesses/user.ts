import { getToken } from '@/businesses/getToken'
import convertMetadata from '@/ultils/convertMetadata'
import convertUserAuthToUser from '@/ultils/convertUserAuthToUser'
import request from '@/ultils/request'
import axios from 'axios'

interface AuthUser {
  email: string
  password: string
}

export interface UserInfluence {
  roles: string[]
  scopes: string[]
}

export interface UserName {
  first_name: string
  last_name: string
}

export interface UserDetail extends UserName, UserInfluence{}

export interface UserRegister extends AuthUser, UserDetail{}

export const login = async ({ email, password }: AuthUser) => {
  return await request({
    method: 'POST',
    url: `/oauth/token`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      username: email,
      password,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.SECRET,
      audience: `${process.env.ISSUER_BASE_URL}/api/v2/`,
      grant_type: 'password',
    }
  })
}

export const register = async ({ email, password, ...rest }: UserRegister) => {
  const token = await getToken()
  const metaData = convertMetadata(rest)
  const [data, err] = await request({
    token,
    method: 'POST',
    url: `/api/v2/users`,
    data: {
      email,
      password,
      connection: process.env.CONNECTION,
      ...metaData
    }
  })

  if (err) return [null, err]
  return [convertUserAuthToUser(data), err]
}

export const getList = async () => {
  const token = await getToken()
  const [data, err] = await request({
    token,
    method: 'GET',
    url: `/api/v2/users`,
  })

  if (err) return [null, err]
  return [(data as any[]).map(convertUserAuthToUser), err]
}

export const getUser = async (userID: string) => {
  const token = await getToken()
  const [data, err] = await request({
    token,
    method: 'GET',
    url: `/api/v2/users/${userID}`,
  })

  if (err) return [null, err]
  return [convertUserAuthToUser(data), err]
}

export const updateUser = async (userID: string, data: Partial<UserDetail>) => {
  const token = await getToken()
  const dataRequest = convertMetadata(data)
  
  return axios.patch(
    `${process.env.ISSUER_BASE_URL}/api/v2/users/${userID}`,
    dataRequest,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  ).then((res) => [
    convertUserAuthToUser(res.data),
    null,
  ]).catch((err) => [
    null,
    err.response.data
  ])
}