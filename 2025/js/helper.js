import fs from 'fs'

export function example(filePath) {
  try {
  return fs.readFileSync(filePath, 'utf8').split('\n')
  } catch (err) {
    console.error(err)
  }
}
