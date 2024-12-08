export function part1(input) {
  return solve(input, 1, 1)
}

export function part2(input) {
  return solve(input, 0, Math.max(input.length, input[0].length))
}

function solve(input, distanceFrom, distanceTill) {
  const isValid = n => n[0] >= 0 && n[0] < input.length && n[1] >= 0 && n[1] < input[0].length
  return Object.values(parse(input))
    .map(nodes => findAntinodes(nodes, distanceFrom, distanceTill, isValid))
    .reduce((acc, antinodes) => acc.union(antinodes), new Set())
    .size
}

function findAntinodes(nodes, from, till, isValid) {
  const antinodes = new Set()
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      antiNodePositions(nodes[i], nodes[j], from, till, isValid)
        .forEach(pos => antinodes.add(pos.toString()))
    }
  }
  return antinodes
}

function antiNodePositions(n1, n2, from, till, isValid) {
  const yDiff = n2[0] - n1[0]
  const xDiff = n2[1] - n1[1]
  return [
    ...findNodes(n1, xDiff, yDiff, -1, from, till, isValid),
    ...findNodes(n2, xDiff, yDiff, 1, from, till, isValid),
  ]
}

function findNodes(source, xDiff, yDiff, dir, from, till, isValid, nodes = []) {
  const node = findNode(source, xDiff, yDiff, dir, from)
  if (from > till || !isValid(node)) return nodes
  return findNodes(source, xDiff, yDiff, dir, from + 1, till, isValid, [...nodes, node])
}

function findNode(source, xDiff, yDiff, dir, steps) {
  return [source[0] + yDiff * dir * steps, source[1] + xDiff * dir * steps]
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
