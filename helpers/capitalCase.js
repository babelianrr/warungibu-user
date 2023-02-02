export default function capitalCase(str) {
  return str
    .split(' ')
    .map((word) => `${word[0].toUpperCase()}${word.substring(1).toLowerCase()}`)
    .join(' ')
}
