import { TGetMenusByUserIdRes } from './services'

/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: { userMenus?: TGetMenusByUserIdRes } | undefined) {
  const userMenus = initialState?.userMenus ?? []

  return {
    normalRouteFilter: (route: any) => userMenus.find((item) => item.name === route.name),
  }
}
