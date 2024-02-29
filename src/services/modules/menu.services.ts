import { request } from '@umijs/max'
import { AM_MENU, GET } from '../constants'

// Types
export type TGetMenusByUserIdRes = {
  id: number
  name: string
  parentId: number | null
}[]

// Services
export async function getMenusByUserId(userId: number) {
  return await request<API.BaseStructure<TGetMenusByUserIdRes>>(`${AM_MENU}/${userId}`, {
    method: GET,
  })
}
