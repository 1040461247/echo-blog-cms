import { request } from '@umijs/max'
import { AM_ARTICLES, GET } from '../constants'
import { SortOrder } from 'antd/es/table/interface'

// Types
export interface IArticle {
  id: number
  title: string
  description: string
  coverUrl: string
  state: '0' | '1'
  visibility: '0' | '1'
  createTime: string
  updateTime: string
  isSticky: 0 | 1
  author: {
    id: number
    name: string
    avatarUrl: string
  }
  category: {
    id: number
    name: string
  }
  tags: { id: number; name: string }[]
}

export type TArticleState = '0' | '1'
export type TArticleVisibility = '0' | '1'
export type TArticleIsSticky = '0' | '1'
interface IDateRange {
  startTime: string
  endTime: string
}

export interface IArticleListParams {
  current?: number
  pageSize?: number
  title?: string
  category?: string
  tags?: string[]
  state?: TArticleState
  visibility?: TArticleVisibility
  isSticky?: TArticleIsSticky
  createTime?: IDateRange
  endTime?: IDateRange
}

export async function getArticleList(params: IArticleListParams, sort: Record<string, SortOrder>) {
  return await request<API.BaseStructure<IArticle[]>>(`${AM_ARTICLES}/query`, {
    method: GET,
    params: { ...params, sort },
  })
}
