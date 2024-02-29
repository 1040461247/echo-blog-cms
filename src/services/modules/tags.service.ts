import { request } from '@umijs/max'
import { AM_TAGS } from '../constants'

// Types
export interface ICategory {
  id: number
  name: string
  createTime: string
  updateTime: string
  articleCount: number
}

// Services
export async function getTagList() {
  return await request<API.BaseStructure<ICategory[]>>(`${AM_TAGS}`)
}
