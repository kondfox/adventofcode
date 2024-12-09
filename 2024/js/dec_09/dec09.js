export function part1(input) {
  return solve(input, true)
}

export function part2(input) {
  return solve(input, false)
}

function solve(input, isChunked) {
  return defregment(diskMap(parse(input)), isChunked)
    .flatMap(n => [...new Array(n.files).fill(n.id), ...new Array(n.free).fill(0)])
    .reduce((acc, c, i) => acc + c * i)
}

function defregment(diskMap, isChunked) {
  let defregmented = [...diskMap.map(n => ({ ...n }))]
  for (let id = diskMap.length - 1, current = diskMap[id]; id > 0;) {
    const spaceRequired = isChunked ? 1 : diskMap[id].files
    const freeIndex = defregmented.findIndex(f => f.free >= spaceRequired)
    const selected = defregmented[freeIndex]
    const currentIndex = defregmented.findLastIndex(n => n.id === diskMap[id].id)
    current = defregmented[currentIndex]
    if (freeIndex >= 0 && freeIndex < currentIndex) {
      const files = isChunked ? Math.min(selected.free, current.files) : current.files
      const node = { id: diskMap[id].id, files: files, free: selected.free - files }
      if (!isChunked) {
        defregmented[currentIndex - 1].free += current.files + current.free
      }
      current.files -= files
      selected.free = 0
      defregmented = [
        ...defregmented.slice(0, freeIndex + 1),
        node,
        ...defregmented.slice(freeIndex + 1).filter(f => f.files > 0)
      ]
    }
    if (freeIndex < 0 || freeIndex >= currentIndex || current.files === 0) {
      id--
    }
  }
  return defregmented
}

function diskMap(diskMap) {
  return Array.from({ length: Math.ceil(diskMap.length / 2) }, (_, i) => i)
    .map(i => ({ id: i, files: diskMap[i * 2], free: diskMap[i * 2 + 1] || 0 }))
}

function parse(input) {
  return input[0].split('').map(Number)
}
