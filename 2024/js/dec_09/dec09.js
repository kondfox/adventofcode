export function part1(input) {
  return solve(input, defregment1)
}

export function part2(input) {
  return solve(input, defregment2)
}

function solve(input, defregmentator) {
  return defregmentator(fileMap(parse(input)))
    .flatMap(n => [...new Array(n.files).fill(n.id), ...new Array(n.free).fill(0)])
    .reduce((acc, c, i) => acc + c * i)
}

function defregment1(fileMap) {
  let defregmented = [...fileMap.map(n => ({ ...n }))]
  let i = defregmented.length - 1
  let current = fileMap[i]
  while (i > 0) {
    const freeSpaceLoc = defregmented.findIndex(f => f.free > 0)
    const defregmentedNodeIndex = defregmented.findLastIndex(n => n.id === fileMap[i].id)
    current = defregmented[defregmentedNodeIndex]
    if (freeSpaceLoc !== -1 && freeSpaceLoc < defregmentedNodeIndex) {
      const nodeFiles = Math.min(defregmented[freeSpaceLoc].free, current.files)
      const node = { id: fileMap[i].id, files: nodeFiles, free: defregmented[freeSpaceLoc].free - nodeFiles }
      current.files -= nodeFiles
      defregmented[freeSpaceLoc].free = 0
      if (current.files > 0) {
        i++
      }
      defregmented = [...defregmented.slice(0, freeSpaceLoc + 1), node, ...defregmented.slice(freeSpaceLoc + 1).filter(f => f.files > 0)]
    }
    i--
  }
  return defregmented
}

function defregment2(fileMap) {
  let defregmented = [...fileMap]
  let i = defregmented.length - 1
  while (i > 0) {
    const freeSpaceLoc = defregmented.findIndex(f => f.free >= fileMap[i].files)
    const defregmentedNodeIndex = defregmented.findIndex(n => n.id === fileMap[i].id)
    if (freeSpaceLoc !== -1 && freeSpaceLoc < defregmentedNodeIndex) {
      const node = { id: fileMap[i].id, files: fileMap[i].files, free: defregmented[freeSpaceLoc].free - fileMap[i].files }
      defregmented[defregmentedNodeIndex - 1].free += defregmented[defregmentedNodeIndex].files + defregmented[defregmentedNodeIndex].free
      defregmented[freeSpaceLoc].free = 0
      defregmented = [...defregmented.slice(0, freeSpaceLoc + 1), node, ...defregmented.slice(freeSpaceLoc + 1).filter(f => f.id !== node.id)]
    }
    i--
  }
  return defregmented
}

function fileMap(diskMap) {
  let fm = []
  for (let i = 0; i <  diskMap.length; i += 2) {
    fm.push({ id: i / 2, files: diskMap[i], free: diskMap[i + 1] || 0 })
  }
  return fm
}

function parse(input) {
  return input[0].split('').map(Number)
}
