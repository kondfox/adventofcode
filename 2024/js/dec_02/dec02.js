export function part1(input) {
  return parse(input)
    .filter(report => isSafe(report))
    .length
}

export function part2(input) {
  return parse(input)
    .filter(report => isSafe2(report))
    .length
}

function isSafe(report) {
  if (report.length < 2) return true
  const isAscending = report[1] > report[0]
  for (let i = 1; i < report.length; i++) {
    if (
      report[i] === report[i - 1] ||
      Math.abs(report[i] - report[i - 1]) > 3 ||
      (report[i] < report[i - 1] && isAscending) ||
      (report[i] > report[i - 1] && !isAscending)
    ) return false
  }
  return true
}

function isSafe2(report, hadBadLevel = false) {
  if (report.length < 2) return true
  for (let i = 1; i < report.length - 1; i++) {
    const [prevI, actI, nextI] = [i - 1, i, i + 1]
    if (!isSafe([report[prevI], report[actI], report[nextI]])) {
      if (hadBadLevel) return false
      const prevDropped = isSafe2(report.slice(0, prevI).concat(report.slice(actI)), true)
      const actDropped = isSafe2(report.slice(0, actI).concat(report.slice(nextI)), true)
      const nextDropped = isSafe2(report.slice(0, nextI).concat(report.slice(nextI + 1)), true)
      return prevDropped || actDropped || nextDropped
    }
  }
  return true
}

function parse(input) {
  return input
    .map(line => line.split(' ').map(n => parseInt(n)))
}
