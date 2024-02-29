import { request } from '@umijs/max'
import { AM_CATEGORIES } from '../constants'

// Types
export interface ICategory {
  id: number
  name: string
  createTime: string
  updateTime: string
  articleCount: number
}

// Services
export async function getCategoryList() {
  return await request<API.BaseStructure<ICategory[]>>(`${AM_CATEGORIES}`)
}
