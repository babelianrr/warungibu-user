export default function discountCalc(num, disc) {
  return Math.ceil(num - (num * disc) / 100)
}
