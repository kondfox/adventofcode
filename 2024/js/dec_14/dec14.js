import fs from 'fs'

export function part1(input) {
  const width = input.length === 12 ? 11 : 101
  const height = input.length === 12 ? 7 : 103
  const hx = Math.floor(width / 2)
  const hy = Math.floor(height / 2)
  return parse(input)
    .map(robot => move(robot, 100, width, height))
    .filter(robot => robot.p[0] !==hx && robot.p[1] !== hy)
    .reduce((quadrants, { p }) => {
      if (p[0] < hx && p[1] < hy) quadrants[0]++
      if (p[0] > hx && p[1] < hy) quadrants[1]++
      if (p[0] < hx && p[1] > hy) quadrants[2]++
      if (p[0] > hx && p[1] > hy) quadrants[3]++
      return quadrants
    }, [0, 0, 0, 0])
    .reduce((safety, n) => safety * n, 1)
}

export function part2(input) {
  const width = input.length === 12 ? 11 : 101
  const height = input.length === 12 ? 7 : 103
  const robots = parse(input)
  var stream = fs.createWriteStream("./dec_14/christmas.txt", {flags:'a'});
  const from = 58
  robots.forEach(robot => move(robot, from, width, height))
  for (let i = 0; i < 72; i++) {
    print(robots, from, i, width, height, stream)
    robots.forEach(robot => move(robot, 103, width, height))
  }
  stream.end();
  return 58 + 71 * 103
}

function move(robot, time, width, height) {
  for (let i = 0; i < time; i++) {
    robot.p[0] = (robot.p[0] + robot.v[0]) % width
    if (robot.p[0] < 0) robot.p[0] += width
    robot.p[1] = (robot.p[1] + robot.v[1]) % height
    if (robot.p[1] < 0) robot.p[1] += height
  }
  return robot
}

function print(robots, from, time, width, height, stream) {
  const grid = Array.from({ length: height }, () => Array.from({ length: width }, () => ' '))
  robots.forEach(({ p }) => grid[p[1]][p[0]] = '#')
  stream.write('\n========================== ' + Number(from + (time * 103)) + ' ==========================\n');
  stream.write(grid.map(row => row.join('') + '\n').join(''))
}

function parse(input) {
  return input.map(row => row.split(' ').map(s => s.substring(2).split(',').map(Number)))
    .map(([p, v]) => ({ p, v }))
}
