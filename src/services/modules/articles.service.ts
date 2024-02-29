import { pageToOffset } from '@/utils/pageToOffset'
import { request } from '@umijs/max'
import { AM_ARTICLES, GET } from '../constants'

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

export async function getArticleList(page: number = 1, size: number = 10) {
  const { offset, limit } = pageToOffset(page, size)
  return await request<API.BaseStructure<IArticle[]>>(`${AM_ARTICLES}/all-status`, {
    method: GET,
    params: { offset, limit },
  })
}
