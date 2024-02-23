/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {}
  const menuData = currentUser?.menuData

  if (menuData) {
    return {
      normalRouteFilter: (route: any) => {
        menuData.forEach((item) => {
          if (item.name === route.name) return true

          const parentName = menuData.find((value) => value.id === item.parentId)
          if (parentName === route.name) return true
        })
      },
      subRouteFilter: (route: any) => {},
    }
  }

  return {}
}
