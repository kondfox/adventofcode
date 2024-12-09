import { allPairs, isValidCoord } from '../tools.js'

export function part1(input) {
  return solve(input, 1, 1)
}

export function part2(input) {
  return solve(input, 0, Math.max(input.length, input[0].length))
}

function solve(input, distanceFrom, distanceTill) {
  return Object.values(parse(input))
    .map(nodes => findAntinodes(nodes, distanceFrom, distanceTill, isValidCoord(input)))
    .reduce((acc, antinodes) => acc.union(antinodes))
    .size
}

function findAntinodes(nodes, from, till, isValid) {
  return allPairs(nodes, 2).reduce((antinodes, [n1, n2]) => {
    return antinodes.union(antiNodePositions(n1, n2, from, till, isValid))
  }, new Set())
}

function antiNodePositions(n1, n2, from, till, isValid) {
  const diff = [n2[0] - n1[0], n2[1] - n1[1]]
  return new Set([
    ...findNodes(n1, diff, -1, from, till, isValid),
    ...findNodes(n2, diff, 1, from, till, isValid),
  ].map(n => n.toString()))
}

function findNodes(source, diff, dir, from, till, isValid, nodes = []) {
  const node = findNode(source, diff, dir, from)
  if (from > till || !isValid(node)) return nodes
  return findNodes(source, diff, dir, from + 1, till, isValid, [...nodes, node])
}

function findNode(source, diff, dir, steps) {
  return [source[0] + diff[0] * dir * steps, source[1] + diff[1] * dir * steps]
}

function parse(input) {
  return input
    .flatMap((row, i) => {
      return row.split('').map((c, j) => ({ freq: c, pos: [i, j] })).filter(c => c.freq !== '.')
    })
    .reduce((acc, curr) => {
      acc[curr.freq] = acc[curr.freq] ? [...acc[curr.freq], curr.pos] : [curr.pos]
      return acc
    }, {})
}
