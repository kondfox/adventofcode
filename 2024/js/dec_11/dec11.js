import { combineByKey } from '../tools.js'

export function part1(input) {
  return solve(input, 25)
}

export function part2(input) {
  return solve(input, 75)
}

function solve(input, limit) {
  const memo = combineByKey(parse(input).map(n => stone(n, 0)), 'number')
  for (let i = 1; i <= limit; i++) {
    blink(memo, i)
  }
  return Object.values(memo)
    .filter(({ replaced }) => replaced[limit])
    .reduce((acc, stone) => acc + stone.replaced[limit], 0)
}

function blink(memo, i) {
  Object.values(memo)
    .filter(({ replaced }) => replaced[i - 1])
    .forEach(({ next, replaced }) => next.forEach(n => replace(n, i, replaced[i - 1], memo)))
}

function next(n) {
  return [
    n => ({ isApply: n === '0', replacement: ['1'] }),
    n => ({
      isApply: n.length % 2 === 0,
      replacement: [
        n.substring(0, n.length / 2),
        n.substring(n.length / 2),
      ].map(Number).map(n => n.toString()) }),
    n => ({ isApply: true, replacement: [(Number(n) * 2024).toString()] }),
  ].find(rule => rule(n).isApply)(n).replacement
}

function stone(number, i, times = 1) {
  return { number, next: next(number), replaced: { [i]: times } }
}

function replace(number, i, times, memo) {
  if (!memo[number]) {
    memo[number] = stone(number, i, times)
  } else {
    if (memo[number].replaced[i]) {
      memo[number].replaced[i] += times
    } else {
      memo[number].replaced[i] = times
    }
  }
}

function parse(input) {
  return input[0].split(' ')
}
