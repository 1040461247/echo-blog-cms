import { request } from '@umijs/max'
import { AM_TAGS, DELETE, GET, PATCH, POST } from '../constants'
import { SortOrder } from 'antd/es/table/interface'

// Types
export interface ITag {
  id: number
  name: string
  createTime: string
  updateTime: string
  articleCount: number
}

interface ITagListParams {
  current?: string | number
  pageSize?: string | number
  id?: string | number
  name?: string
  createTime?: API.IDateRange
  updateTime?: API.IDateRange
}

// Services
export async function getTagList(params: ITagListParams, sort?: Record<string, SortOrder>) {
  return request<API.BaseStructure<ITag[]>>(`${AM_TAGS}/query`, {
    metho: GET,
    params: { ...params, sort },
  })
}

export async function createTag(tag: string) {
  return request<API.BaseStructure>(`${AM_TAGS}`, {
    method: POST,
    data: { tag },
  })
}

export async function updateTagById(tagId: number, tag: string) {
  return request<API.BaseStructure>(`${AM_TAGS}/${tagId}`, {
    method: PATCH,
    data: { tag },
  })
}

export async function deleteTagById(tagId: number) {
  return request<API.BaseStructure>(`${AM_TAGS}/${tagId}`, {
    method: DELETE,
  })
}
