import { TGetMenusByUserIdRes } from './services'

/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: { userMenus?: TGetMenusByUserIdRes } | undefined) {
  const userMenus = initialState?.userMenus ?? []
  const authObj = {}

  if (userMenus) {
    Object.assign(authObj, {
      normalRouteFilter: (route: any) => {
        for (const menu of userMenus) {
          if (menu.name === route.name) {
            return true
          }
        }
      },
    })
  }

  return authObj
}
