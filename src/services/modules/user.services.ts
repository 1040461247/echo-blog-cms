import { request } from '@umijs/max'

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
  avatar_url: string
  phone_num: string
  browser_info: string
  os_info: string
  ip_address: string
  update_time: string
  create_time: string
}

// Services
export async function login(fetchData: ILoginParams) {
  return await request<API.BaseStructure<ILoginRes>>('/cms-login', {
    method: 'POST',
    data: fetchData,
  })
}

export async function getUserInfo(userId: number) {
  return await request<API.BaseStructure<IGetUserInfoRes>>(`/users/${userId}`, {
    method: 'GET',
  })
}
