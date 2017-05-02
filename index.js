const arguguard = require('arguguard')
const Validator = require('arguguard/lib/Validator')

const integerValidator = new Validator('Integer', () => {

})

function nextByte(integer, encodingArray) {
  encodingArray.unshift(integer % 256)
  if (integer >= 256) {
    nextByte(Math.floor(integer / 256), encodingArray)
  }
  return encodingArray
}

module.exports.encode = function encode(integer) {
  arguguard('intcoder.encode', [integerValidator], arguments)
  return new Uint8Array(nextByte(integer, []))
}

module.exports.decode = function decode(uint8Array) {
  arguguard('intcoder.decode', ['Uint8Array'], arguments)
  const uint8ArrayLength = uint8Array.length
  let integer = 0
  uint8Array.forEach((uint8, index) => {
    if (uint8 === 0) {
      return
    }
    const exp = uint8ArrayLength - index - 1
    const multiplier = Math.pow(256, exp)
    integer += (uint8 * multiplier)
  })
  return integer
}
