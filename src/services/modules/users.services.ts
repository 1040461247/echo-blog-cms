import { request } from '@umijs/max'
import { AM_USERS, GET, POST } from '../constants'
import getAuthorization from '@/utils/getAuthorization'

// Types
export interface ILoginParams {
  name: string
  password: string
}
export interface ILoginRes {
  id: number
  name: string
  token: string
}

export interface IGetUserInfoRes {
  id: number
  name: string
  avatarUrl: string
  phoneNum: string
  browserInfo: string
  osInfo: string
  ipAddress: string
  updateTime: string
  createTime: string
}

interface IAuthorizedRes {
  id: number
  iat: number
  exp: number
}

// Services
export async function login(fetchData: ILoginParams) {
  return await request<API.BaseStructure<ILoginRes>>('/cms-login', {
    method: POST,
    data: fetchData,
  })
}

export async function authorized() {
  return await request<API.BaseStructure<IAuthorizedRes>>('/cms-authorized', {
    method: GET,
    headers: {
      Authorization: getAuthorization(),
    },
  })
}

export async function getUserInfo(userId: number) {
  return await request<API.BaseStructure<IGetUserInfoRes>>(`${AM_USERS}/${userId}`, {
    method: GET,
  })
}
