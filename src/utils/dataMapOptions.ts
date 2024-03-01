export default function dataMapOptions(data: any[], field: string) {
  const optionsArr = []
  for (const item of data) {
    const label = item[field]
    const value = item.id ?? item[field]
    optionsArr.push({ label, value })
  }
  return optionsArr
}
