import { isValidCoord, getNeighbours, coord, groupBy, stringCoordMove } from '../tools.js'

export function part1(input) {
  return solve(input, 'score')
}

export function part2(input) {
  return solve(input, 'score2')
}

function solve(input, scoring) {
  return splitToRegions(parse(input), isValidCoord(input))
    .reduce((acc, region) => acc + region[scoring], 0)
}

function splitToRegions(garden, isValid, inRegions = new Set(), regions = []) {
  for (let i = 0; i < garden.length; i++) {
    for (let j = 0; j < garden[0].length; j++) {
      const spot = coord([i, j])
      if (inRegions.has(spot.s)) continue
      regions.push(region(getRegionFrom(garden, spot, inRegions, isValid), garden[i][j]))
    }
  }
  return regions
}

function region(regionCoords, label) {
  const inRegion = new Set([...regionCoords].map(c => c.s))
  const area = regionCoords.size
  const perimiter = [...regionCoords]
    .reduce((p, c) => {
      return p + getNeighbours(c.arr, () => true).filter(n => !inRegion.has(n.toString())).length
    }, 0)
  const sides = countSides(regionCoords)
  const score = area * perimiter
  const score2 = area * sides
  return { label, regionCoords, area, perimiter, score, sides, score2 }
}

function countSides(regionCoords) {
  const shapeRows = Object.values(groupBy([...regionCoords].map(c => c.s), n => n.split(',')[0]))
  return [[-1, 0], [1, 0], [0, -1], [0, 1]]
    .reduce((s, d) => s + countSide(shapeRows, d[0], d[1]), 0)
}

function countSide(shapeRows, rowDiff, colDiff) {
  const isVertical = rowDiff !== 0
  const verticalFilter = (r, i, rows) =>
    r.filter(c => !rows[i + rowDiff]?.includes(stringCoordMove(c, [rowDiff, 0])))
  const horizontalFilter = r =>
    r.filter((c, _, coords) => !coords.includes(stringCoordMove(c, [0, colDiff])))
  return shapeRows
    .flatMap(isVertical ? verticalFilter : horizontalFilter)
    .filter((r, _, coords) => !coords.includes(stringCoordMove(r, isVertical ? [0, -1] : [-1, 0])))
    .length
}

function getRegionFrom(garden, spot, inRegions, isValid, regionCoords = new Set()) {
  if (inRegions.has(spot.s)) return regionCoords
  inRegions.add(spot.s)
  regionCoords.add(spot)
  const isValidSpot = s =>
    isValid(s) && garden[s[0]][s[1]] === garden[spot.y][spot.x] && !inRegions.has(s.toString())
  const neighbours = getNeighbours(spot.arr, isValidSpot).map(coord)
  if (neighbours.length === 0) return regionCoords
  return neighbours.reduce(
    (r, n) => r.union(getRegionFrom(garden, n, inRegions, isValid, regionCoords)),
    regionCoords
  )
}

function parse(input) {
  return input.map(row => row.split(''))
}
