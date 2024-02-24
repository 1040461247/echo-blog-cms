import { request } from '@umijs/max'

// Types
export type TGetMenusByUserIdRes = {
  id: number
  name: string
  parentId: number | null
}[]

// Services
export async function getMenusByUserId(userId: number) {
  return await request<API.BaseStructure<TGetMenusByUserIdRes>>(`/menu/${userId}`, {
    method: 'GET',
  })
}
