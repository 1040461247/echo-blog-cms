export default function dataMapOptions(data: any[], field: string) {
  const optionsArr = []
  for (const item of data) {
    const val = item[field]
    optionsArr.push({ label: val, value: val })
  }
  return optionsArr
}
