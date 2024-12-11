export const isValidCoord = stringArray => n => {
  return n[0] >= 0 && n[0] < stringArray.length && n[1] >= 0 && n[1] < stringArray[0].length
}

export const windowed = (array, size) => {
  return array.map((_, i) => array.slice(i, i + size)).filter(a => a.length === size)
}

export const allPairs = array => {
  return array.flatMap((x, i) => array.slice(i + 1).map(y => [x, y]))
}

export const combineByKey = (objArray, key) => objArray.reduce((grouped, obj) => {
  grouped[obj[key]] = obj
  return grouped
}, {})
