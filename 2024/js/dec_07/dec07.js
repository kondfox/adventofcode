export function part1(input) {
  return solve(input, [(a, b) => a + b, (a, b) => a * b])
}

export function part2(input) {
  return solve(input, [(a, b) => a + b, (a, b) => a * b, (a, b) => Number(a.toString() + b.toString())])
}

function solve(input, operations) {
  return parse(input)
    .filter(([res, ...nums]) => isValid(res, nums, operations))
    .reduce((acc, [res, _]) => acc + res, 0)
}

function isValid(res, nums, operations, i = 1, currentRes = nums[0]) {
  const results = operations.map(op => op(currentRes, nums[i]))
  if (i === nums.length - 1) return results.some(r => r === res)
  return results.some(r => isValid(res, nums, operations, i + 1, r))
}

function parse(input) {
  return input
    .map(row => row.split(': '))
    .map(([res, nums]) => [Number(res), ...(nums.split(' ')).map(Number)])
}
