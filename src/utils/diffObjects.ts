export default function diffObjects(pmrObj: Record<string, any>, secObj: Record<string, any>) {
  const diffObj: Record<string, any> = {}

  const diffKeys = Object.keys(pmrObj).filter((key) => pmrObj[key] !== secObj[key])
  for (const diffKey of diffKeys) {
    diffObj[diffKey] = pmrObj[diffKey]
  }

  return diffObj
}
