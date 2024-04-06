import { request } from '@umijs/max'
import { AM_ARTICLES, DELETE, GET, PATCH, POST } from '../constants'
import { SortOrder } from 'antd/es/table/interface'

// Types
export type TArticleState = '0' | '1'
export type TArticleVisibility = '0' | '1'
export type TArticleIsSticky = '0' | '1'

export interface IArticle {
  id: number
  title: string
  description: string
  coverUrl: string
  state: TArticleState
  visibility: TArticleVisibility
  createTime: string
  updateTime: string
  isSticky: TArticleIsSticky
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

export interface IArticleDetail extends IArticle {
  content: string
}

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

export interface IUpdateArticleParams {
  isSticky?: TArticleIsSticky
  state?: TArticleState
  visibility?: TArticleVisibility
}

export interface ICommitArticleParams {
  id?: string
  title: string
  content?: string
  description?: string
  categoryId: number
  isSticky?: TArticleIsSticky
  mark?: string
  type: 'save' | 'publish'
}

type TSaveArticleRes = { insertId: number } | null

export async function getArticleList(params: IArticleListParams, sort: Record<string, SortOrder>) {
  return request<API.BaseStructure<IArticle[]>>(`${AM_ARTICLES}/query`, {
    method: GET,
    params: { ...params, sort },
  })
}

export async function getArticleById(articleId: number) {
  return request<API.BaseStructure<IArticleDetail>>(`${AM_ARTICLES}/${articleId}`, {
    method: GET,
  })
}

export async function updateArticleById(articleId: number, modifiedData: IUpdateArticleParams) {
  return request<API.BaseStructure>(`${AM_ARTICLES}/${articleId}`, {
    method: PATCH,
    data: modifiedData,
  })
}

export async function commitArticle(params: ICommitArticleParams) {
  return request<API.BaseStructure<TSaveArticleRes>>(`${AM_ARTICLES}/commit`, {
    method: POST,
    data: params,
  })
}

export async function deleteArticleById(articleId: number) {
  return request<API.BaseStructure<TSaveArticleRes>>(`${AM_ARTICLES}/${articleId}`, {
    method: DELETE,
  })
}
