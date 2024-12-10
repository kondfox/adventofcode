import { isValidCoord } from '../tools.js'

export function part1(input) {
  return solve(
    input,
    paths => new Set(paths.map(p => p[p.length - 1]).map(({ y, x }) => [y, x].toString())).size
  )
}

export function part2(input) {
  return solve(input, paths => paths.length)
}

function solve(input, pathsMapping) {
  const topography = parse(input)
  return topography
    .flatMap((row, y) => row.map((h, x) => ({ y, x, h })))
    .filter(({ h }) => h === 0)
    .map(th => findPaths(topography, [[th]], isValidCoord(input)))
    .map(pathsMapping)
    .reduce((acc, rating) => acc + rating, 0)
}

function findPaths(topography, paths, isValid) {
  return paths
    .flatMap(path => {
      const steps = nexts(topography, path[path.length - 1], isValid).map(next => [...path, next])
      return steps.length !== 0 ? findPaths(topography, steps, isValid) : [path]
    })
    .filter(path => path[path.length - 1].h === 9)
}

function nexts(topography, { y, x, h }, isValid) {
  return [[y, x - 1], [y, x + 1], [y - 1, x], [y + 1, x]]
    .filter(([y, x]) => isValid([y, x]) && topography[y][x] === h + 1)
    .map(([y, x]) => ({ y, x, h: topography[y][x] }))
}

function parse(input) {
  return input
    .map(row => row.split('').map(Number))
}
