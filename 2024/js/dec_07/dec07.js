export function part1(input) {
  return solve(input, false)
}

export function part2(input) {
  return solve(input, true)
}

function solve(input, withConcatenation) {
  return parse(input)
    .filter(([res, ...nums]) => isValid(res, nums, withConcatenation))
    .reduce((acc, calibration) => acc + calibration[0], 0)
}

function isValid(res, nums, withConcatenation = false, i = 1, currentRes = nums[0]) {
  const sum = currentRes + nums[i]
  const mul = currentRes * nums[i]
  const concat = withConcatenation && Number(currentRes.toString() + nums[i].toString())
  if (i === nums.length - 1) return sum === res || mul === res || concat === res
  const sumPath = isValid(res, nums, withConcatenation, i + 1, sum)
  const mulPath = isValid(res, nums, withConcatenation, i + 1, mul)
  const concatPath = withConcatenation && isValid(res, nums, withConcatenation, i + 1, concat)
  return sumPath || mulPath || concatPath
}


function parse(input) {
  return input
    .map(row => row.split(': '))
    .map(([res, nums]) => [Number(res), ...(nums.split(' ')).map(Number)])
}
