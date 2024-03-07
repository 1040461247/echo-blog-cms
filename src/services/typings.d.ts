// @ts-ignore
/* eslint-disable */

declare namespace API {
  type BaseStructure<T = any> = {
    code: number
    msg: string
    data: T
    success: boolean
    total?: number
  }
}
