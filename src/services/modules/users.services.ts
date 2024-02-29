import { request } from '@umijs/max'
import { AM_USERS, GET, POST } from '../constants'

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

// Services
export async function login(fetchData: ILoginParams) {
  return await request<API.BaseStructure<ILoginRes>>('/cms-login', {
    method: POST,
    data: fetchData,
  })
}

export async function getUserInfo(userId: number) {
  return await request<API.BaseStructure<IGetUserInfoRes>>(`${AM_USERS}/${userId}`, {
    method: GET,
  })
}
