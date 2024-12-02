export function part1(input) {
  return parse(input)
    .filter(isValid)
    .length
}

export function part2(input) {
  return parse(input)
    .map(report => ({ report, firstBad: firstBadIndex(report) }))
    .filter(r => (r.firstBad === -1 || isTolerable(r.report, r.firstBad)))
    .length
}

function isValid(report) {
  return firstBadIndex(report) === -1
}

function firstBadIndex(report) {
  return report.findIndex((n, i) => !isSafePair(report[i - 1], n, report[0] < report[1]))
}

function isTolerable(report, i) {
  return [0, 1, 2].some(j => isValid(report.slice(0, i - j).concat(report.slice(i - j + 1))))
}

function isSafePair(n, m, isAsc) {
  return !n || !m || (n !== m && Math.abs(n - m) <= 3 && (isAsc ? n < m : n > m))
}

function parse(input) {
  return input.map(line => line.split(' ').map(n => parseInt(n)))
}
