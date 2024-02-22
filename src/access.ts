/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {}
  const resObj = {}

  if (currentUser) {
    currentUser.menuData.forEach((item) => {
      Object.assign(resObj, { [item]: true })
    })
  }

  console.log(resObj)

  return resObj
}
