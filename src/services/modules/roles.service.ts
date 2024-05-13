import { request } from '@umijs/max'
import { AM_ROLE, GET, POST } from '../constants'
import { SortOrder } from 'antd/es/table/interface'

// Types
interface IRoleListParams {
  id?: string
  name?: string
  level?: string
  desc?: string
  createTime?: API.IDateRange
}

export interface IRole {
  id: number
  name: string
  level: number
  desc: string
  createTime: string
  updateTime: string
}

export async function getRoleList(params: IRoleListParams, sort: Record<string, SortOrder>) {
  return request<API.BaseStructure<IRole[]>>(`${AM_ROLE}`, {
    method: GET,
    params: { ...params, sort },
  })
}

export async function getMenuKeysByRoleId(roleId: number) {
  return request<API.BaseStructure<number[]>>(`${AM_ROLE}/${roleId}`, {
    method: GET,
  })
}

export async function updateMenusByRoleId(roleId: number, menuKeys: React.Key[]) {
  return request<API.BaseStructure>(`${AM_ROLE}/${roleId}`, {
    method: POST,
    data: { menuKeys },
  })
}
