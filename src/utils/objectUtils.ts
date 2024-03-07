// 判断对象是否为空
export function isObjectEmpty(obj: Record<string, any> | null | undefined): boolean {
  if (!obj) return true

  const objKeys = Object.keys(obj)
  if (objKeys.length === 0) return true

  return false
}

// 过滤对象属性
export function objectFilter(obj: Record<string, any>, filters: string[]) {
  const filteredObj: Record<string, any> = { ...obj }
  const keys = Object.keys(filteredObj)

  for (const key of keys) {
    if (filters.includes(key)) {
      delete filteredObj[key]
    }
  }

  return filteredObj
}
