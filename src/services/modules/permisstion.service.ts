import { request } from '@/.umi/plugin-request/request'
import { AM_PERMISSION, DELETE, GET, POST } from '../constants'
import { SortOrder } from 'antd/es/table/interface'
import { IPermissionForm } from '@/pages/System/SystemPermission/c-cpns/PermissionCreateModal'

// Types
interface IDateRange {
  startTime: string
  endTime: string
}

export type TPermissionAction = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

interface IGetPermisstionListOption {
  current: string
  pageSize: string
  sort: Record<string, SortOrder>
  id: string
  mark: string
  markName: string
  name: string
  url: string
  action: TPermissionAction
  state: '0' | '1'
  authentication: '0' | '1'
  authorization: '0' | '1'
  createTime: IDateRange
  updateTime: IDateRange
}

export interface IPermission {
  id: number
  mark: string
  markName: string
  name: string
  url: string
  action: TPermissionAction
  state: '0' | '1'
  authentication: '0' | '1'
  authorization: '0' | '1'
  description: string
  createTime: string
  updateTime: string
}

// Services
export async function getPermissionList(queryOption: IGetPermisstionListOption) {
  return request<API.BaseStructure<IPermission[]>>(`${AM_PERMISSION}/list`, {
    method: GET,
    params: { ...queryOption },
  })
}

export async function createPermission(insertOption: IPermissionForm) {
  return request<API.BaseStructure>(`${AM_PERMISSION}`, {
    method: POST,
    data: { ...insertOption },
  })
}

export async function updatePermissionById(permissionId: number, updateOption: IPermissionForm) {
  return request<API.BaseStructure>(`${AM_PERMISSION}/${permissionId}`, {
    method: POST,
    data: { ...updateOption },
  })
}

export async function removePermissionById(permissionId: number) {
  return request<API.BaseStructure>(`${AM_PERMISSION}/${permissionId}`, {
    method: DELETE,
  })
}
