export const mergeMeta = (to: any[], from: any[]) => {
  if (typeof to === 'function') {
    // eslint-disable-next-line no-console
    console.warn('Cannot merge meta. Avoid using head as a function!')
    return
  }

  for (const key in from) {
    const value = from[key]
    if (Array.isArray(value)) {
      to[key] = to[key] || []
      for (const item of value) {
        // Avoid duplicates
        if (item.name && hasMeta(to[key], 'name', item.name)) {
          continue
        }
        // Add meta
        to[key].push(item)
      }
    } else if (typeof value === 'object') {
      to[key] = to[key] || {}
      for (const attr in value) {
        to[key][attr] = value[attr]
      }
    } else if (to[key] === undefined) {
      to[key] = value
    }
  }
}

const hasMeta = (arr: any[], key: string, val: any) => {
  return arr.find(obj => val ? obj[key] === val : obj[key])
}
