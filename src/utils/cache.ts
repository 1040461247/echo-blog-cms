class Cache {
  setCache(
    key: string,
    value: string | number | Record<string, any> | any[],
    store: Storage = localStorage,
  ) {
    if (typeof value !== 'string') {
      const jsonValue = JSON.stringify(value)
      store.setItem(key, jsonValue)
    } else {
      store.setItem(key, value)
    }
  }

  getCache(key: string, store: Storage = localStorage) {
    const jsonItem = store.getItem(key)
    if (jsonItem) {
      return JSON.parse(jsonItem)
    }
  }
}

export default new Cache()
