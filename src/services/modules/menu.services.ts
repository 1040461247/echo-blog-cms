import { request } from '@umijs/max'
import { AM_MENU, DELETE, GET, PATCH } from '../constants'

// Types
export type TMenuType = 'dir' | 'menu' | 'btn'

export type TGetMenusByUserIdRes = {
  id: number
  name: string
  parentId: number | null
}[]

interface IMenuListParams {
  topMenu?: boolean
  id?: string | number
  pid?: string | number
  createTime?: API.IDateRange
  updateTime?: API.IDateRange
}

export interface IMenu {
  id: number
  pid: number
  name: string
  icon: string | null
  path: string
  type: TMenuType
  permission: string
  sort: number
  hidden: 0 | 1
  hasChildren: 0 | 1
  createTime: string
  updateTime: string
  children?: IMenu[]
}

export interface IUpdateMenuByIdOpt {
  name?: string
  path?: string
  type?: TMenuType
  permission?: string
  sort?: number
  hidden?: 0 | 1
}

// Services
export async function getMenusByUserId(userId: number) {
  console.log(userId)
  // return request<API.BaseStructure<TGetMenusByUserIdRes>>(`${AM_MENU}/${userId}`, {
  //   method: GET,
  // })
  return Promise.resolve({ data: [] })
}

export async function getMenuList(params: IMenuListParams) {
  return request<API.BaseStructure<IMenu[]>>(`${AM_MENU}`, {
    method: GET,
    params: { ...params },
  })
}

export async function updateMenuByID(menuId: number, opt: IUpdateMenuByIdOpt) {
  return request<API.BaseStructure>(`${AM_MENU}/${menuId}`, {
    method: PATCH,
    data: opt,
  })
}

export async function deleteMenuById(menuId: number) {
  return request<API.BaseStructure>(`${AM_MENU}/${menuId}`, {
    method: DELETE,
  })
}
