import { request } from '@umijs/max'
import { AM_CATEGORIES, DELETE, GET, PATCH, POST } from '../constants'
import { SortOrder } from 'antd/es/table/interface'

// Types
export interface ICategory {
  id: number
  name: string
  createTime: string
  updateTime: string
  articleCount: number
}

interface ICategoryListParams {
  current?: string | number
  pageSize?: string | number
  id?: string | number
  name?: string
  createTime?: API.IDateRange
  updateTime?: API.IDateRange
}

// Services
export async function getCategoryList(
  params: ICategoryListParams,
  sort?: Record<string, SortOrder>,
) {
  return request<API.BaseStructure<ICategory[]>>(`${AM_CATEGORIES}/query`, {
    metho: GET,
    params: { ...params, sort },
  })
}

export async function createCategory(category: string) {
  return request<API.BaseStructure>(`${AM_CATEGORIES}`, {
    method: POST,
    data: { category },
  })
}

export async function updateCategoryById(categoryId: number, category: string) {
  return request<API.BaseStructure>(`${AM_CATEGORIES}/${categoryId}`, {
    method: PATCH,
    data: { category },
  })
}

export async function deleteCategoryById(categoryId: number) {
  return request<API.BaseStructure>(`${AM_CATEGORIES}/${categoryId}`, {
    method: DELETE,
  })
}
